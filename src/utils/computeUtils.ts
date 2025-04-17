export function compute<T>(computer: () => T): T {
  return computer();
}