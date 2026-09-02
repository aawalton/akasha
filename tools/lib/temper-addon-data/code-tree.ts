
import { resolve } from "node:path"
import { codeRoot } from "../code-root.ts"

export function temperFile(rel: string): string {
  return resolve(codeRoot(), "temper", rel)
}

export function akashaTemperFile(rel: string): string {
  return resolve(codeRoot(), "akasha/temper", rel)
}
