import { readdirSync, readFileSync } from "node:fs"
import { placeDirOf } from "@akasha/markdown-pages/page-types"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { sectionNamed, trimEdges } from "../lib/section.ts"
import type { CommandDocument } from "./surface.ts"

const EXT = ".md"
const FENCE = "---"

function frontmatter(body: string): Record<string, string> {
  if (!body.startsWith(`${FENCE}\n`)) return {}
  const closes = body.indexOf(`\n${FENCE}`, FENCE.length)
  if (closes === -1) return {}
  const found: Record<string, string> = {}
  for (const line of body.slice(FENCE.length + 1, closes).split("\n")) {
    if (line.startsWith(" ") || line.startsWith("-")) continue
    const at = line.indexOf(": ")
    if (at <= 0) continue
    found[line.slice(0, at)] = line.slice(at + 2).trim()
  }
  return found
}

export function commandDocuments(repoRoot: string = akashaRoot()): readonly CommandDocument[] {
  const dir = placeDirOf("old-ops-command")
  let names: readonly string[]
  try {
    names = readdirSync(`${repoRoot}/${dir}`)
      .filter((one) => one.endsWith(EXT) && one.length > EXT.length)
      .sort()
  } catch {
    return []
  }
  const found: CommandDocument[] = []
  for (const name of names) {
    let body = ""
    try {
      body = readFileSync(`${repoRoot}/${dir}/${name}`, "utf8")
    } catch {
      continue
    }
    const front = frontmatter(body)
    const invocation = front.path
    if (invocation === undefined || invocation === "") continue
    const section = sectionNamed(body, "Help")
    const help = section === null ? "" : trimEdges(section.body)
    found.push({
      slug: name.slice(0, -EXT.length),
      path: invocation.split(" ").filter((one) => one !== ""),
      entryFile: front["command-path"] ?? "",
      ...(help === "" ? {} : { help }),
    })
  }
  return found
}
