import { decodeUtf8, leadingBytes } from "../../utf8-body/utf8-body.ts"
import { fromDisk, refusalText } from "./refusal.ts"
import { resolveRoots } from "../../repo/roots/roots"

export { decodeUtf8 }

export function notUtf8(source: string, bytes: Uint8Array): string {
  return refusalText(
    "body-not-utf8",
    { source, bytes: String(bytes.length), leading: leadingBytes(bytes) },
    resolveRoots().akasha,
    fromDisk
  )
}
