import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { CALLSTACK_MAX_LEN } from "../errors-addon-limits/errors-addon-limits.module.code.ts"

export function matchedText(matched: unknown): string | null {
  return typeof matched === "string" ? matched : null
}

export function sanitizeTraceback(traceback: string): string {
  const [stripped] = string.gsub(traceback, "%s*<Locals>.-</Locals>", "")
  if (stripped.length <= CALLSTACK_MAX_LEN) {
    return stripped
  }
  return `${stripped.slice(0, CALLSTACK_MAX_LEN)}…`
}

export function splitTraceback(errorString: string): { message: string; traceback: string } {
  const [messagePart, tracebackBody] = string.match(errorString, "(.+)\nstack traceback:(.+)")
  const message = matchedText(messagePart)
  const traceback = matchedText(tracebackBody)
  if (message !== null && traceback !== null) {
    return { message, traceback: sanitizeTraceback(`stack traceback:${traceback}`) }
  }
  return { message: errorString, traceback: sanitizeTraceback(errorString) }
}

function hasVisibleContent(text: string): boolean {
  const [visible] = string.match(text, "%S")
  return matchedText(visible) !== null
}

function handlerSideStack(): string {
  if (typeof debug === "object" && typeof debug.traceback === "function") {
    return `\nhandler-side stack (not the error origin):\n${debug.traceback()}`
  }
  return ""
}

export function classifyError(
  errorString: unknown,
  eventCode: number,
  errorCode: number | undefined
): { message: string; traceback: string } {
  if (typeof errorString === "string" && hasVisibleContent(errorString)) {
    return splitTraceback(errorString)
  }
  const ctx = `eventCode=${eventCode} errorCode=${errorCode ?? "nil"}`
  const sentinel =
    typeof errorString === "string"
      ? `<empty or whitespace lua error> ${ctx}`
      : `<non-string lua error type=${typeof errorString} value=${tostring(errorString)}> ${ctx}`
  return {
    message: sanitizeTraceback(`${sentinel}${handlerSideStack()}`),
    traceback: sanitizeTraceback(`<no-lua-traceback> ${ctx}`),
  }
}
