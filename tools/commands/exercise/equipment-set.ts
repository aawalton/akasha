
export const summary = "Upsert an equipment item by title (implements + load increments)"

import { existsSync } from "node:fs"
import { normalizeSelectValue } from "@collections/exercises/cli/select-values"
import type { CommandHelp } from "../../ops/surface.ts"
import { patchPage, writePage } from "../../lib/page-write.ts"
import { whereFor } from "../../lib/page-write-where.ts"
import { resolveRoots } from "../../../repo/roots/roots"
import { pageStem } from "../../lib/exercise-page-stem.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  EQUIPMENT_CATEGORY_OPTIONS,
  EQUIPMENT_CONFIG_OPTIONS,
} from "../../lib/exercise-vocabularies.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "title",
      required: false,
      aliasOfFlag: "--title",
      description: "Implement name (natural key)",
    },
  ],
  flags: [
    {
      name: "--title",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: "Implement name (natural key)",
    },
    {
      name: "--category",
      argLabel: `<${EQUIPMENT_CATEGORY_OPTIONS.join("|")}>`,
      valueShape: "token",
      description: "Equipment category",
    },
    {
      name: "--configuration",
      argLabel: `<${EQUIPMENT_CONFIG_OPTIONS.join("|")}>`,
      valueShape: "token",
      description: "Configuration (pair / single / adjustable / n-a)",
    },
    {
      name: "--loads",
      argLabel: "<csv>",
      valueShape: "token",
      description: 'Available load increments in lb, comma-separated (e.g. "3,5,8,10,15,20,25,30")',
    },
    { name: "--unavailable", description: "Mark as not owned yet (available=false)" },
    { name: "--notes", argLabel: "<text>", valueShape: "prose", description: "Free-text notes" },
    {
      name: "--sort-order",
      argLabel: "<n>",
      valueShape: "token",
      description: "Display sort order",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "equipment item upserted" },
    { code: 1, meaning: "bad input or write failure" },
  ],
  examples: [
    'ops exercise equipment-set --title Dumbbells --category dumbbells --configuration pair --loads "3,5,8,10,15,20,25,30"',
    "ops exercise equipment-set --title 'Weighted Vest' --category vest --unavailable",
  ],
}

export default async function exerciseEquipmentSet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const title = parsed.requireString("--title")
  const categoryRaw = parsed.string("--category")
  const configRaw = parsed.string("--configuration")
  const loads = parsed.string("--loads")
  const unavailable = parsed.boolean("--unavailable")
  const notes = parsed.string("--notes")
  const sortOrder = parsed.nonNegativeInt("--sort-order")
  const json = parsed.boolean("--json")

  const category =
    categoryRaw !== undefined
      ? normalizeSelectValue(categoryRaw, EQUIPMENT_CATEGORY_OPTIONS, "--category")
      : undefined
  const configuration =
    configRaw !== undefined
      ? normalizeSelectValue(configRaw, EQUIPMENT_CONFIG_OPTIONS, "--configuration")
      : undefined

  const fields: Record<string, string | number | boolean> = {
    ...(category !== undefined ? { category } : {}),
    ...(configuration !== undefined ? { configuration } : {}),
    ...(loads !== undefined ? { loads } : {}),
    ...(unavailable ? { available: false } : {}),
    ...(notes !== undefined ? { notes } : {}),
    ...(sortOrder !== undefined ? { "sort-order": sortOrder } : {}),
  }

  const roots = resolveRoots()
  const name = pageStem(title)
  const at = whereFor(roots, "equipment-item", name)
  if (at === null) throw new Error("`equipment-item` names no page type whose pages are files")
  const by = "ops exercise equipment-set"
  const written = existsSync(at.path)
    ? patchPage(roots, "equipment-item", name, fields, by)
    : writePage(roots, "equipment-item", name, { title, available: !unavailable, ...fields }, by)
  if (written === null) throw new Error("`equipment-item` names no page type whose pages are files")
  if (written.commitError !== null) throw new Error(written.commitError)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ path: written.relPath, title, category: category ?? null })}\n`
    )
    return
  }
  process.stdout.write(
    `path\t${written.relPath}\ntitle\t${title}\ncategory\t${category ?? "-"}\n`
  )
}
