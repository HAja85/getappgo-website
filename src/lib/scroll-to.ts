type LenisLike = {
  destroy: () => void;
  scrollTo: (
    target: HTMLElement | number | string,
    options?: { offset?: number; duration?: number },
  ) => void;
};

let lenis: LenisLike | undefined;

const HEADER_OFFSET = -112;

export function setLenisInstance(instance: LenisLike | undefined): void {
  lenis = instance;
}

export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenis) {
    lenis.scrollTo(el, { offset: HEADER_OFFSET, duration: 1.05 });
    return;
  }

  const top = window.scrollY + el.getBoundingClientRect().top + HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}

export function handleHashHref(href: string): boolean {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;

  const path = href.slice(0, hashIndex) || "/";
  const id = href.slice(hashIndex + 1);
  if (!id) return false;

  const onTargetPage = window.location.pathname === path || (path === "/" && window.location.pathname === "/");
  if (!onTargetPage) return false;

  scrollToId(id);
  window.history.replaceState(null, "", `${path}#${id}`);
  return true;
}
