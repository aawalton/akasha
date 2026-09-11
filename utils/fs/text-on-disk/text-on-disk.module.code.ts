import { readFileSync } from "node:fs"
import { isMissing } from "akasha/utils/fs/missing/missing.module.code.ts"

export function textOnDisk(path: string): string | null {
  try {
    return readFileSync(path, "utf8")
  } catch (thrown) {
    if (!isMissing(thrown)) throw thrown
    return null
  }
}
