import { statSync } from "node:fs"

export function sizeOnDisk(path: string): number {
  try {
    const found = statSync(path)
    return found.isFile() ? found.size : 0
  } catch {
    return 0
  }
}
