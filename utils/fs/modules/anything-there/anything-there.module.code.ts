import { lstatSync } from "node:fs"

export function anythingThere(at: string): boolean {
  try {
    lstatSync(at)
    return true
  } catch {
    return false
  }
}
