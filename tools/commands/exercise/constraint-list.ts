
export const summary = "List active coaching-constraints (--focus filters by tag or 'all')"

import { displayTitle, fieldBool, fieldStr, fieldStrList } from "@collections/exercises/cli/fields"
import { normalizeSelectValue } from "@collections/exercises/cli/select-values"
import { getPages } from "@collections/exercises/pages/access"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { CONSTRAINT_FOCUS_OPTIONS } from "../../lib/exercise-vocabularies.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--focus",
      argLabel: `<${CONSTRAINT_FOCUS_OPTIONS.join("|")}>`,
      valueShape: "token",
      description: "Keep only constraints tagged for this focus (or 'all')",
    },
    { name: "--all", description: "Include retired (inactive) constraints" },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "constraints listed" },
    { code: 1, meaning: "bad input or query failure" },
  ],
  examples: ["ops exercise constraint-list", "ops exercise constraint-list --focus push --json"],
}

export default async function exerciseConstraintList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const focusRaw = parsed.string("--focus")

  const focus =
    focusRaw !== undefined
      ? normalizeSelectValue(focusRaw, CONSTRAINT_FOCUS_OPTIONS, "--focus")
      : undefined
  const all = parsed.boolean("--all")
  const json = parsed.boolean("--json")

  const rows = await getPages({
    pageTypeSlug: "coaching-constraint",
    order: [{ by: "sortOrder", dir: "asc" }],
    limit: 200,
  })
  const items = rows.rows
    .map((row) => ({
      id: row.id,
      title: displayTitle(row),
      kind: fieldStr(row, "kind") ?? null,
      body: fieldStr(row, "body") ?? null,
      focusTags: fieldStrList(row, "focusTags"),
      active: fieldBool(row, "active") ?? true,
    }))
    .filter((item) => all || item.active)
    .filter(
      (item) =>
        focus === undefined || item.focusTags.includes("all") || item.focusTags.includes(focus)
    )

  if (json) {
    process.stdout.write(`${JSON.stringify({ items })}\n`)
    return
  }
  let out = ""
  for (const item of items) {
    const tags = item.focusTags.length > 0 ? item.focusTags.join(",") : "-"
    out += `${item.kind ?? "-"}\t${tags}\t${item.title}\n`
  }
  process.stdout.write(out === "" ? "(no coaching constraints)\n" : out)
}
