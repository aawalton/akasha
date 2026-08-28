import { readFileSync } from "node:fs"
import { join } from "node:path"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { isMissing } from "../../missing/missing.ts"
import { placeDirOf } from "../../page/page-types.ts"
import { akashaRoot } from "../../repo/roots/roots.ts"

function personaDir(): string {
  return join(akashaRoot(), placeDirOf("persona"))
}

/**
 * AN EMPTY MAP MEANS THE PERSONA HAS NO PAGE, and the one caller reads it that way: `seat send`
 * asks for the voice key and treats a blank as "this sender is not a voiced persona", which routes
 * the message differently. A persona page that could not be opened would otherwise answer the same
 * blank, and a voiced persona would be sent as an unvoiced one with nothing saying why.
 */
export function personaFrontmatter(slug: string): Record<string, string> {
  let text = ""
  try {
    text = readFileSync(join(personaDir(), `${slug}.md`), "utf8")
  } catch (thrown) {
    if (!isMissing(thrown)) throw thrown
    return {}
  }
  const out: Record<string, string> = {}
  for (const [key, value] of parseFrontmatter(text).fields) {
    if (typeof value === "string") out[key] = value
  }
  return out
}
