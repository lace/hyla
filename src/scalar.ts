export function clamp(
  value: number,
  { min, max }: { min: number; max: number }
): number {
  return Math.min(Math.max(value, min), max)
}
