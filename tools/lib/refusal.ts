
import { existsSync, readFileSync } from "node:fs"
import { fill } from "../page/document/render.ts"
import { pageRelIn, placeDirOf } from "../../page/page-types.ts"

const REFUSAL_TYPE = "refusal"

export const fromDisk = (absolutePath: string): string | null =>
  existsSync(absolutePath) ? readFileSync(absolutePath, "utf8") : null

export const REFUSAL_DIR = placeDirOf(REFUSAL_TYPE)

const HEADING = /^#[^\n]*\n/

export function refusalText(
  slug: string,
  values: Readonly<Record<string, string>>,
  instructionsRoot: string,
  read: (absolutePath: string) => string | null
): string {
  const at = pageRelIn(instructionsRoot, REFUSAL_TYPE, slug)
  const raw = read(`${instructionsRoot}/${at}`)
  if (raw === null) throw new Error(`${at} is not there, so there is no refusal to print`)
  const text = raw.replace(/\r\n/g, "\n")
  const closed = text.startsWith("---\n") ? text.indexOf("\n---\n", 3) : -1
  const below = closed === -1 ? text : text.slice(closed + "\n---\n".length)
  return fill(below.trimStart().replace(HEADING, "").trim(), values)
}
