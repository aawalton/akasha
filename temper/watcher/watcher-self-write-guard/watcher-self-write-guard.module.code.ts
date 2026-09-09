import { createHash } from "node:crypto"

export function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex")
}

export function shouldSkipSelfWrite(
  currentHash: string,
  lastWriteBackHash: string | null
): boolean {
  return lastWriteBackHash !== null && currentHash === lastWriteBackHash
}
