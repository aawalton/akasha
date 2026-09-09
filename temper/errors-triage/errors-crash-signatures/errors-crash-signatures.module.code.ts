export interface CrashSignature {
  readonly id: string
  readonly culpritAddon: string
  readonly test: (haystack: string) => boolean
}

const NIL_FUNCTION_RE = /function expected instead of nil/i
const CRAFTSTORE_HANDLER_RE = /\b(?:TemperCrafting_\w+|CraftStoreFixed_\w+|Cook\w+)/

export const CRASH_SIGNATURES: readonly CrashSignature[] = [
  {
    id: "craftstorefixed-cook-nil-function",
    culpritAddon: "TemperCrafting",
    test: (haystack) => NIL_FUNCTION_RE.test(haystack) && CRAFTSTORE_HANDLER_RE.test(haystack),
  },
]

export function inferCulpritAddon(
  message: string,
  traceback: string | null | undefined
): string | undefined {
  const haystack = `${message}\n${traceback ?? ""}`
  for (const signature of CRASH_SIGNATURES) {
    if (signature.test(haystack)) {
      return signature.culpritAddon
    }
  }
  return undefined
}

function normalizeForSignature(s: string): string {
  return s
    .replace(/0x[0-9a-f]+/gi, "#")
    .replace(/[0-9]+/g, "#")
    .replace(/\s+/g, " ")
    .trim()
}

function firstAttributionFrame(traceback: string | null | undefined): string {
  if (traceback === null || traceback === undefined) {
    return ""
  }
  for (const line of traceback.split("\n")) {
    if (line.includes("user:/AddOns/")) {
      return line
    }
  }
  return ""
}

export function crashSignatureKey(message: string, traceback: string | null | undefined): string {
  return `${normalizeForSignature(message)}\n${normalizeForSignature(firstAttributionFrame(traceback))}`
}
