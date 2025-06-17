import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Create a custom instance of twMerge that knows about our prefix
const twMerge = extendTailwindMerge({
  prefix: "f4f-",
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
