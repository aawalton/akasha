import { type Dirent, readdirSync, readFileSync } from "node:fs"
import type { Command, CommandModule } from "@akasha/command-system/command-declaring"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"

const COMMANDS_DIR = "tools/commands"
const EXT = ".ts"
const DECLARED = /^export const summary =\s+(".*")$/m

export function summaryIn(source: string): string | null {
  const found = source.match(DECLARED)
  if (found === null) return null
  let value: unknown
  try {
    value = JSON.parse(found[1] as string)
  } catch {
    return null
  }
  return typeof value === "string" && value.trim() !== "" ? value : null
}

export function filesUnder(dir: string, ext: string = EXT): readonly string[] {
  let entries: readonly Dirent[]
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }
  const found: string[] = []
  for (const entry of entries) {
    const at = `${dir}/${entry.name}`
    if (entry.isDirectory()) found.push(...filesUnder(at, ext))
    else if (entry.name.endsWith(ext) && entry.name.length > ext.length) found.push(at)
  }
  return found
}

/**
 * The commands `ops` reads off the `tools/commands` tree, one per file.
 *
 * This is a second folder scan, and not the one taken away on 2026-09-03. That one read the loose
 * `tools/*.ts` files through `tools/lib/tool-declaration.ts` for the forwarded commands, and the
 * `ops-command` pages replaced it. This scan was left alone, so a file put under `tools/commands`
 * becomes a command with no list anywhere naming it.
 *
 * Two things follow, and each has misled a reader.
 *
 * `load` is `import(path)` over a variable, so no import graph reaches any of these files and each
 * counts zero inbound while it runs. A reverse-import census over this tree answers zero for every
 * file, whether the file is live or dead.
 *
 * `set.ts` folds these in ahead of the forwarders and keeps the first of any two entries sharing
 * command words. So where a page names one of these files, the code comes from here and the page
 * gives only the help; taking such a file away hands its words to the page forwarder, which then
 * refuses by naming the file. Taking away a file no page names drops the command instead, with
 * nothing to say so.
 */
export function declaredCommands(repoRoot: string = akashaRoot()): readonly Command[] {
  const root = `${repoRoot}/${COMMANDS_DIR}`
  const commands: Command[] = []
  for (const path of [...filesUnder(root)].sort()) {
    let source = ""
    try {
      source = readFileSync(path, "utf8")
    } catch {
      source = ""
    }
    commands.push({
      path: path.slice(root.length + 1, -EXT.length).split("/"),
      summary: summaryIn(source) ?? "",
      load: () => import(path) as Promise<CommandModule>,
      source: path,
    })
  }
  return commands
}
