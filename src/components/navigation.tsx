"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, siteImages } from "@/lib/site-content";
import { ActionLink } from "./ui";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const destination = useRef<string | null>(null);
  const active = usePathname();
  const router = useRouter();
  const previousPath = useRef(active);
  useEffect(() => {
    if (previousPath.current === active) return;
    previousPath.current = active;
    const frame = requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>("main h1");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
        heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);

  useEffect(() => {
    if (!open || !menu.current) return;
    const dialog = menu.current;
    const trigger = toggle.current;
    const body = document.body;
    const root = document.documentElement;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const previous = {
      position: body.style.position, top: body.style.top, left: body.style.left,
      width: body.style.width, paddingRight: body.style.paddingRight,
      overflow: body.style.overflow, scrollBehavior: root.style.scrollBehavior,
    };
    const scrollbar = window.innerWidth - root.clientWidth;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
    if (scrollbar) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbar}px`;
    dialog.showModal();
    closeButton.current?.focus();
    const desktop = matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      dialog.close();
      Object.assign(body.style, {
        position: previous.position, top: previous.top, left: previous.left,
        width: previous.width, paddingRight: previous.paddingRight, overflow: previous.overflow,
      });
      root.style.scrollBehavior = "auto";
      window.scrollTo(scrollX, scrollY);
      root.style.scrollBehavior = previous.scrollBehavior;
      const href = destination.current;
      destination.current = null;
      if (href && !href.startsWith("#")) {
        if (href === window.location.pathname) {
          const heading = document.querySelector<HTMLElement>("main h1");
          heading?.setAttribute("tabindex", "-1");
          heading?.focus({ preventScroll: true });
          window.scrollTo({ top: 0, behavior: "instant" });
        } else router.push(href);
      } else if (href) {
        // Unlock before navigating so restoring the old position cannot undo the anchor.
        history.pushState(null, "", href);
        window.dispatchEvent(new Event("hashchange"));
        const target = document.querySelector<HTMLElement>(href);
        target?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        if (target) {
          const previousTabIndex = target.getAttribute("tabindex");
          target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          target.addEventListener("blur", () => {
            if (previousTabIndex === null) target.removeAttribute("tabindex");
            else target.setAttribute("tabindex", previousTabIndex);
          }, { once: true });
        }
      } else if (!desktop.matches) trigger?.focus({ preventScroll: true });
    };
  }, [open, router]);

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    destination.current = href;
    setOpen(false);
  };

  return <header className="site-header" data-interior={active !== "/" || undefined}>
    <div className="site-container nav-row flex items-center justify-between">
      <Link href="/" className="brand relative block" aria-label="Anargya ITS — home">
        <Image src={siteImages.logo} alt="Anargya ITS" fill sizes="160px" className="object-contain" />
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav items-center">
        {navigation.map(link => <Link key={link.href} href={link.href} className="nav-link" aria-current={(active === link.href || active.startsWith(link.href + "/")) ? "page" : undefined}>{link.label}</Link>)}
        <ActionLink href="/sponsors#contact">Contact us</ActionLink>
      </nav>
      <button ref={toggle} type="button" className="icon-button menu-toggle" aria-label="Open navigation menu" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
        <Image src="/icons/menu.svg" alt="" width={24} height={24} unoptimized />
      </button>
    </div>
    <dialog ref={menu} id="mobile-navigation" className="mobile-menu" aria-label="Navigation menu" onCancel={event => { event.preventDefault(); setOpen(false); }} onKeyDown={event => {
      if (event.key !== "Tab") return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href],button:not(:disabled)"));
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <div className="mobile-menu-layout">
        <div className="mobile-menu-header flex items-center justify-between">
          <Link href="/" className="brand relative block" aria-label="Anargya ITS — home" onClick={event => navigate(event, "/")}>
            <Image src={siteImages.logo} alt="Anargya ITS" fill sizes="160px" className="object-contain" />
          </Link>
          <button ref={closeButton} type="button" className="icon-button" aria-label="Close navigation menu" onClick={() => setOpen(false)}>
            <Image src="/icons/close.svg" alt="" width={24} height={24} unoptimized />
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="mobile-nav">
          {navigation.map(link => <a key={link.href} href={link.href} className="nav-link" aria-current={(active === link.href || active.startsWith(link.href + "/")) ? "page" : undefined} onClick={event => navigate(event, link.href)}>{link.label}</a>)}
        </nav>
      </div>
    </dialog>
  </header>;
}
