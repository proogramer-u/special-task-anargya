# Commerce and PWA Implementation Plan

Goal: Extend the existing LOW site with a functional demo shop, persistent server orders, protected admin and a public-content PWA.
Architecture: Node route handlers and an atomic, serialized private JSON file store for this single-process localhost submission. No external service is necessary. Passwords use scrypt; opaque sessions are stored hashed server-side. Native service worker isolates public caches from commerce and admin.

- Add typed commerce model, validation and durable transactional store; test invalid quantities, prices, stock and order persistence before UI.
- Add server-only auth, password setup tool, expiring sessions, same-origin write checks, request limits and protected API/admin pages.
- Add catalog/detail, persistent cart, validated checkout, private-token confirmation, and admin product/order management. Demo illustrative product SVGs are explicitly not official merchandise.
- Add Shop navigation and scoped responsive styling without changing LOW compositions.
- Add manifest, official-brand padded icons, offline page, explicit public caching allowlist, install/update experience.
- Run lint/type/build, API integration tests, inspect native browser layouts, and production service-worker/offline checks. Document exact limits and deployment setup.

Acceptance: server recomputes all order prices; stock/order writes are atomic; unauthorized writes fail; no sensitive responses enter public caches; offline checkout never reports success. Store directory and environment secrets remain ignored. No Figma changes, deployment or GitHub push.
