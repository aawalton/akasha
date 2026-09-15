export function stripXmlComments(source: string): string {
  return source.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
}
