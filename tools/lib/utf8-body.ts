import { leadingBytes } from "../../utf8-body/utf8-body.ts"
import { refusalText } from "../../refusal/refusal.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"

export function notUtf8(source: string, bytes: Uint8Array): string {
  return refusalText(
    "body-not-utf8",
    { source, bytes: String(bytes.length), leading: leadingBytes(bytes) },
    rootFor(resolveRoots(), AKASHA)
  )
}
