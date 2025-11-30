export function qs(selector: string): HTMLElement | null {
  return document.querySelector(selector) as HTMLElement | null;
}

export function qsa(selector: string): HTMLElement[] {
  return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
}
