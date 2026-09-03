import { readFileSync } from "node:fs"
import { attachmentFileOf } from "@akasha/markdown-pages/attachment-file"
import { parseFrontmatter, textField } from "@akasha/markdown-pages/frontmatter"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { filesUnder, summaryIn } from "./declared.ts"
import type { Command, CommandModule } from "./surface.ts"

const PAGE_SUFFIX = ".command.md"

const PATH_KEY = "path"

const CODE_KEY = "code"

const CODE_EXTENSION = "ts"

function textAt(at: string): string {
  try {
    return readFileSync(at, "utf8")
  } catch {
    return ""
  }
}

export function akashaCommandPages(
  repoRoot: string = rootFor(resolveRoots(), AKASHA)
): readonly string[] {
  return [...filesUnder(repoRoot, PAGE_SUFFIX)].sort()
}

export function akashaEntryFor(page: string): string {
  return attachmentFileOf(page, CODE_KEY, CODE_EXTENSION)
}

export function akashaPathFor(page: string): readonly string[] | null {
  const stated = textField(parseFrontmatter(textAt(page)), PATH_KEY)
  if (stated === null || stated.trim() === "") return null
  return stated.trim().split(/\s+/)
}

export function akashaCommands(
  repoRoot: string = rootFor(resolveRoots(), AKASHA)
): readonly Command[] {
  const commands: Command[] = []
  for (const page of akashaCommandPages(repoRoot)) {
    const path = akashaPathFor(page)
    if (path === null) continue
    const entry = akashaEntryFor(page)
    commands.push({
      path,
      summary: summaryIn(textAt(entry)) ?? "",
      load: () => import(entry) as Promise<CommandModule>,
      source: entry,
    })
  }
  return commands
}
