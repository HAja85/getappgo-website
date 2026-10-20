const HEADER_OFFSET = -112;

export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const top = window.scrollY + el.getBoundingClientRect().top + HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function handleHashHref(href: string): boolean {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;

  const path = href.slice(0, hashIndex) || "/";
  const id = href.slice(hashIndex + 1);
  if (!id) return false;

  if (window.location.pathname !== path) return false;

  scrollToId(id);
  window.history.replaceState(null, "", `${path}#${id}`);
  return true;
}
