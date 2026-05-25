import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function applyDynamicStyles(
  el: HTMLElement | null | undefined,
  styles: Record<string, any> | undefined
) {
  if (!el || !styles) return;
  Object.entries(styles).forEach(([key, val]) => {
    if (val === undefined || val === null) {
      if (key.startsWith('--')) {
        el.style.removeProperty(key);
      } else {
        (el.style as any)[key] = '';
      }
    } else {
      if (key.startsWith('--')) {
        el.style.setProperty(key, String(val));
      } else {
        const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        el.style.setProperty(kebabKey, String(val));
      }
    }
  });
}
