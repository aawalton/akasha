import { createHash } from "node:crypto"

export function sha256Hex(body: string | Uint8Array): string {
  return createHash("sha256").update(body).digest("hex")
}
