const htmlUtils = {
  joinHTMLClass(...classNames: (string | null | undefined | false)[]): string | undefined {
    return classNames.filter((n) => n).join(" ");
  },
  compute<T>(computer: () => T): T {
    return computer();
  },
  formatPhoneNumber(rawPhoneNumber: string): string {
    const hasPlus = rawPhoneNumber.startsWith("+");

    return rawPhoneNumber
      .replace(/[^\d]/g, "")
      .replace(/^(\d{4})(\d{3})(\d{3,4})$/, (_, cc, p1, p2, p3) => {
        return `${hasPlus ? "+" : ""}${[cc, p1, p2, p3].filter(Boolean).join(" ")}`;
      });
  },
};

export function useHTMLUtils() {
  return htmlUtils;
}
