import { readFileSync } from "node:fs"
import type { EsoOptIn } from "../eso-token-scope/eso-token-scope.module.code.ts"

const MANIFEST_PATH = new URL(
  "../declared-tokens/declared-tokens.eso-opt-in-list.tokens.json",
  import.meta.url
).pathname

function readOptIn(): EsoOptIn {
  const read: EsoOptIn = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"))
  if (read.functions.length === 0) {
    throw new Error(
      `${MANIFEST_PATH} names no function, so generating from it would declare an empty API ` +
        "rather than say the manifest went unread"
    )
  }
  return read
}

export const ESO_OPT_IN: EsoOptIn = readOptIn()
