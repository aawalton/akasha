import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { everyOfType } from "@akasha/indexes"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { textAt, valueAt } from "@akasha/pages-system/page-value"
import type { CommandDocument } from "./surface.ts"

/**
 * The ops commands, read off the akasha pages that hold them.
 *
 * These documents were markdown under `pages/old-ops-command/` until the old markdown page store
 * began to go. They are `ops-command` pages now, one folder each, with the help prose in a file
 * beside the page rather than in a `# Help` section of it. Nothing here parses front matter or
 * sections any more: the page states its own values and the prose is a whole file.
 *
 * A page here is the one place a forwarded command is named: `forwarders.ts` reads this list and
 * nothing scans a folder for the files. A page naming a file that is not there is still answered,
 * so the command it names stays listed and its run says which file is missing.
 *
 * A command whose page states no `opsPath` reaches no command and is left out, which is the same
 * test the markdown reader made on its `path:` line.
 */
const PAGE_TYPE = "ops-command"

const HELP = "ops-help"

const OPS_PATH = "opsPath"

const OPS_ENTRY_FILE = "opsEntryFile"

const OPS_HELP = "opsHelp"

const SLUG = "slug"

const DEFINITION = "definition"

function proseFor(repoRoot: string, path: string, held: string | null): string {
  if (held === null || held === "") return ""
  const beside = besideAt(path, HELP, held)
  if (beside === null) return ""
  const at = join(repoRoot, beside)
  if (!existsSync(at)) return ""
  return readFileSync(at, "utf8").trim()
}

export function commandDocuments(repoRoot: string = akashaRoot()): readonly CommandDocument[] {
  const found: CommandDocument[] = []
  for (const one of everyOfType(repoRoot, PAGE_TYPE)) {
    const value = valueAt(one.path, repoRoot)
    if (value === null) continue
    const invocation = textAt(value, OPS_PATH)
    if (invocation === null || invocation === "") continue
    const help = proseFor(repoRoot, one.path, textAt(value, OPS_HELP))
    found.push({
      slug: textAt(value, SLUG) ?? "",
      path: invocation.split(" ").filter((word) => word !== ""),
      entryFile: textAt(value, OPS_ENTRY_FILE) ?? "",
      summary: textAt(value, DEFINITION) ?? "",
      ...(help === "" ? {} : { help }),
    })
  }
  return [...found].sort((one, other) =>
    one.slug < other.slug ? -1 : one.slug > other.slug ? 1 : 0
  )
}
