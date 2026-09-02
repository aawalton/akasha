
export const summary = "List equipment items (--all includes proposed/unavailable)"

import { displayTitle, fieldBool, fieldStr } from "@collections/exercises/cli/fields"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { askExercisePages } from "./ask-pages.ts"

export const help: CommandHelp = {
  flags: [
    { name: "--all", description: "Include unavailable (proposed/future) implements" },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "equipment listed" },
    { code: 1, meaning: "query failure" },
  ],
  examples: ["ops exercise equipment-list", "ops exercise equipment-list --all --json"],
}

export default async function exerciseEquipmentList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const all = parsed.boolean("--all")
  const json = parsed.boolean("--json")

  const rows = await askExercisePages({
    pageTypeSlug: "equipment-item",
    order: [{ by: "sortOrder", dir: "asc" }],
    limit: 200,
  })
  const items = rows.rows
    .map((row) => ({
      id: row.id,
      title: displayTitle(row),
      category: fieldStr(row, "category") ?? null,
      configuration: fieldStr(row, "configuration") ?? null,
      loads: fieldStr(row, "loads") ?? null,
      available: fieldBool(row, "available") ?? true,
      notes: fieldStr(row, "notes") ?? null,
    }))
    .filter((item) => all || item.available)

  if (json) {
    process.stdout.write(`${JSON.stringify({ items })}\n`)
    return
  }
  let out = ""
  for (const item of items) {
    out += `${item.title}\t${item.category ?? "-"}\t${item.configuration ?? "-"}\t${item.loads ?? "-"}\t${item.available ? "owned" : "proposed"}\n`
  }
  process.stdout.write(out === "" ? "(no equipment items)\n" : out)
}
