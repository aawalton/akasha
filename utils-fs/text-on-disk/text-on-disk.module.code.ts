import { readFileSync } from "node:fs"
import { isMissing } from "../missing/missing.module.code.ts"

export function textOnDisk(at: string): string | null {
  try {
    return readFileSync(at, "utf8")
  } catch (thrown) {
    if (!isMissing(thrown)) throw thrown
    return null
  }
}
