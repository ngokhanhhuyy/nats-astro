const htmlUtils = {
  joinHTMLClass(...classNames: (string | null | undefined)[]): string | undefined {
    return classNames.filter(n => n).join(" ");
  },
  compute<T>(computer: () => T): T {
    return computer();
  }
}

export function useHTMLUtils() {
  return htmlUtils;
}