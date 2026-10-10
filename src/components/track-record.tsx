"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { achievements, type Achievement } from "@/lib/site-content";

function AchievementCard({ achievement, active = false }: { achievement: Achievement; active?: boolean }) {
  return <article className="achievement-card flex min-w-0 flex-col" data-active={active} aria-hidden={!active || undefined}>
    <div className="achievement-photo relative">
      <Image src={achievement.image} alt={achievement.alt} fill sizes="(min-width: 1024px) 50vw, (min-width: 640px) 70vw, 100vw" className="object-cover" loading="eager" />
      <div className="photo-shade" aria-hidden="true" />
      <p className="achievement-caption caption">{achievement.caption}</p>
      <p className="peek-caption caption">NEXT / {achievement.year}</p>
    </div>
    <div className="achievement-info flex flex-col gap-3">
      <p className="eyebrow">{achievement.year} / {achievement.category}</p>
      <h3>{achievement.placement}</h3>
      <p className="achievement-competition">{achievement.competition}</p>
      <p className="small text-secondary">{achievement.detail}</p>
    </div>
  </article>;
}

type Action = { step: number } | { index: number };
const count = achievements.length;
const slides = [achievements[count - 1], ...achievements, achievements[0], achievements[1]];
const canonical = (position: number) => ((position - 1 + count) % count) + 1;

export function TrackRecord() {
  const [position, setPosition] = useState(1);
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const positionRef = useRef(1);
  const running = useRef(false);
  const queued = useRef<Action | null>(null);
  const reduced = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frames = useRef<number[]>([]);
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const active = canonical(position) - 1;
  const current = achievements[active];

  function finish() {
    if (!running.current) return;
    if (timer.current) clearTimeout(timer.current);
    running.current = true;
    const settled = canonical(positionRef.current);
    setAnimate(false);
    positionRef.current = settled;
    setPosition(settled);
    // Paint the identical boundary clone reset before beginning any queued movement.
    frames.current.push(requestAnimationFrame(() => {
      frames.current.push(requestAnimationFrame(() => {
        frames.current = [];
        running.current = false;
        const next = queued.current;
        queued.current = null;
        if (next) move(next);
      }));
    }));
  }

  function move(action: Action) {
    if (running.current) { queued.current = action; return; }
    let destination: number;
    if ("step" in action) destination = positionRef.current + action.step;
    else {
      destination = action.index + 1;
      if (positionRef.current === count && action.index === 0) destination = count + 1;
      else if (positionRef.current === 1 && action.index === count - 1) destination = 0;
    }
    if (destination === positionRef.current) return;
    if (reduced.current) {
      positionRef.current = canonical(destination);
      setAnimate(false);
      setPosition(positionRef.current);
      return;
    }
    running.current = true;
    setAnimate(true);
    positionRef.current = destination;
    setPosition(destination);
    // Fallback for interrupted transitions/background tabs; never leaves a locked state.
    timer.current = setTimeout(finish, 650);
  }

  useLayoutEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = media.matches;
    const cancelMovement = () => {
      if (timer.current) clearTimeout(timer.current);
      frames.current.forEach(cancelAnimationFrame);
      frames.current = [];
      running.current = false;
      queued.current = null;
      positionRef.current = canonical(positionRef.current);
      setAnimate(false);
      setPosition(positionRef.current);
    };
    const measure = () => {
      cancelMovement();
      const card = track.current?.children[1] as HTMLElement | undefined;
      if (card && track.current) setStep(card.getBoundingClientRect().width + parseFloat(getComputedStyle(track.current).columnGap));
    };
    const motionChange = () => { reduced.current = media.matches; cancelMovement(); };
    const observer = new ResizeObserver(measure);
    if (viewport.current) observer.observe(viewport.current);
    measure();
    media.addEventListener("change", motionChange);
    return () => { observer.disconnect(); media.removeEventListener("change", motionChange); if (timer.current) clearTimeout(timer.current); frames.current.forEach(cancelAnimationFrame); };
  }, []);

  function handleKey(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowRight") { event.preventDefault(); move({ step: 1 }); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); move({ step: -1 }); }
    else if (event.key === "Home") { event.preventDefault(); move({ index: 0 }); }
    else if (event.key === "End") { event.preventDefault(); move({ index: count - 1 }); }
  }
  function startGesture(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
    gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    if (event.isTrusted) event.currentTarget.setPointerCapture(event.pointerId);
  }
  function endGesture(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.5) move({ step: dx < 0 ? 1 : -1 });
  }

  return <section id="track-record" className="track-record section" role="region" aria-label="Track Record achievements" aria-roledescription="carousel" tabIndex={0} onKeyDown={handleKey}>
    <div className="site-container flex flex-col gap-8">
      <div className="carousel-header">
        <div className="carousel-intro flex flex-col gap-4">
          <p className="eyebrow">TRACK RECORD</p>
          <h2>Driven by achievements.</h2>
          <p className="text-secondary">Selected results reported on Anargya’s official timeline, with competition categories and years.</p>
        </div>
        <div className="carousel-arrows flex gap-4">
          <button className="icon-button" type="button" aria-label="Previous achievement" onClick={() => move({ step: -1 })}>
            <Image src="/icons/arrow-left.svg" width={24} height={24} alt="" unoptimized />
          </button>
          <button className="icon-button" type="button" aria-label="Next achievement" onClick={() => move({ step: 1 })}>
            <Image src="/icons/arrow-right.svg" width={24} height={24} alt="" unoptimized />
          </button>
        </div>
      </div>
      <div ref={viewport} className="carousel-cards carousel-viewport" onPointerDown={startGesture} onPointerUp={endGesture} onPointerCancel={() => { gesture.current = null; }}>
        <div ref={track} className="carousel-track" data-animating={animate} style={{ "--slide-position": position, ...(step ? { transform: `translate3d(${-position * step}px, 0, 0)` } : {}) } as CSSProperties} onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === "transform") finish(); }}>
          {slides.map((achievement, index) => <AchievementCard key={index} achievement={achievement} active={index === position} />)}
        </div>
      </div>
      <div className="carousel-progress">
        <div className="carousel-indicators flex gap-4" role="group" aria-label="Choose an achievement">
          {achievements.map((achievement, index) => <button type="button" key={achievement.year} className="slide-indicator" aria-label={`Show achievement ${index + 1}: ${achievement.year}, ${achievement.competition}`} aria-current={active === index ? "true" : undefined} onClick={() => move({ index })}><span /></button>)}
        </div>
        <div className="carousel-attribution flex items-center">
          <p className="caption text-secondary">TEAM-REPORTED RESULTS</p>
          <p className="eyebrow carousel-counter">{String(active + 1).padStart(2, "0")} / 03</p>
        </div>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{current.year}: {current.competition}, {current.placement}, {current.detail}. Achievement {active + 1} of {achievements.length}.</p>
    </div>
  </section>;
}
