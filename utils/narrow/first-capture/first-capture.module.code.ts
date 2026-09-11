export function firstCapture(found: RegExpExecArray | null): string | null {
  const said = found?.[1]
  return typeof said === "string" ? said : null
}
