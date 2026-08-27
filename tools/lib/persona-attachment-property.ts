import { readFileSync } from "node:fs"
import { join } from "node:path"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { placeDirOf } from "../../page/page-types.ts"
import { akashaRoot } from "../../repo/roots/roots.ts"

function personaDir(): string {
  return join(akashaRoot(), placeDirOf("persona"))
}

export function personaAttachment(slug: string, key: string): string | undefined {
  const dir = personaDir()
  let text = ""
  try {
    text = readFileSync(join(dir, `${slug}.${key}.attachment.txt`), "utf8").trim()
  } catch {
    return undefined
  }
  return text === "" ? undefined : text
}

export function personaFrontmatter(slug: string): Record<string, string> {
  let text = ""
  try {
    text = readFileSync(join(personaDir(), `${slug}.md`), "utf8")
  } catch {
    return {}
  }
  const out: Record<string, string> = {}
  for (const [key, value] of parseFrontmatter(text).fields) {
    if (typeof value === "string") out[key] = value
  }
  return out
}
