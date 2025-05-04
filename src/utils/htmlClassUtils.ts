function joinHTMLClass(...classNames: (string | null | undefined)[]): string | undefined {
  return classNames.filter(n => n).join(" ");
}

export { joinHTMLClass }