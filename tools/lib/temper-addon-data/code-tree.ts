
import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"

export function temperFile(rel: string): string {
  return resolve(codeRoot(), "temper", rel)
}

export function akashaTemperFile(rel: string): string {
  return resolve(codeRoot(), "akasha/temper", rel)
}
