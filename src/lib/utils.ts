
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds === 0) {
    return "0:00";
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) {
    return str;
  }
  
  return str.slice(0, length) + "...";
}
