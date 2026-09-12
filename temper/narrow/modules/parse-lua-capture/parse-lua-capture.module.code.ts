export function parseLuaCapture(this: void, captured: unknown): string | undefined {
  return typeof captured === "string" ? captured : undefined
}
