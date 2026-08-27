
export const summary = "Upsert a coaching-constraint by title (standing cue/constraint, focus-tagged)"

import {
  normalizeMultiSelect,
  normalizeSelectValue,
} from "@collections/exercises/cli/select-values"
import { createPage, getPages, patchPage } from "@collections/exercises/pages/access"
import type { Json } from "@collections/exercises/pages/page"
import { slugStem } from "@collections/exercises/tracking/derive"
import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import {
  CONSTRAINT_FOCUS_OPTIONS,
  CONSTRAINT_KIND_OPTIONS,
} from "../../lib/exercise-vocabularies.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--title",
      argLabel: "<headline>",
      valueShape: "prose",
      required: true,
      description: "Constraint headline (natural key)",
    },
    {
      name: "--body",
      argLabel: "<markdown>",
      valueShape: "prose",
      description: "Full constraint text",
    },
    {
      name: "--kind",
      argLabel: `<${CONSTRAINT_KIND_OPTIONS.join("|")}>`,
      valueShape: "token",
      description: "Constraint kind",
    },
    {
      name: "--focus",
      argLabel: "<csv>",
      valueShape: "token",
      description: `Focus tags, comma-separated (one or more of: ${CONSTRAINT_FOCUS_OPTIONS.join(", ")})`,
    },
    { name: "--inactive", description: "Mark as retired (active=false)" },
    {
      name: "--sort-order",
      argLabel: "<n>",
      valueShape: "token",
      description: "Display sort order",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "constraint upserted" },
    { code: 1, meaning: "bad input or write failure" },
  ],
  examples: [
    "ops exercise constraint-set --title-file ./title.txt --kind equipment-ceiling --focus push,pull --body-file ./body.md",
    "ops exercise constraint-set --title-file ./title.txt --kind medical-gate --focus all",
  ],
}

export default async function exerciseConstraintSet(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const title = parsed.requireString("--title")
  const body = parsed.string("--body")
  const kindRaw = parsed.string("--kind")
  const focusRaw = parsed.string("--focus")
  const inactive = parsed.boolean("--inactive")
  const sortOrder = parsed.nonNegativeInt("--sort-order")
  const json = parsed.boolean("--json")

  const kind =
    kindRaw !== undefined
      ? normalizeSelectValue(kindRaw, CONSTRAINT_KIND_OPTIONS, "--kind")
      : undefined
  const focusTags =
    focusRaw !== undefined
      ? normalizeMultiSelect(focusRaw, CONSTRAINT_FOCUS_OPTIONS, "--focus")
      : undefined

  const found = await getPages({
    pageTypeSlug: "coaching-constraint",
    where: [{ key: "title", eq: title }],
    select: ["id", "seq", "slug"],
    limit: 1,
  })
  const existing = found.rows[0]

  const fields: Record<string, Json> = {
    ...(body !== undefined ? { body } : {}),
    ...(kind !== undefined ? { kind } : {}),
    ...(focusTags !== undefined ? { focusTags: [...focusTags] } : {}),
    ...(inactive ? { active: false } : {}),
    ...(sortOrder !== undefined ? { sortOrder } : {}),
  }

  let id: string
  if (existing !== undefined) {
    if (existing.slug === null) {
      throw new Error(`coaching-constraint "${title}" carries no slug`)
    }
    await patchPage("coaching-constraint", existing.slug, fields)
    id = existing.id
  } else {
    const slug = slugStem(title)
    const row = await createPage("coaching-constraint", slug, {
      title,
      slug,
      active: !inactive,
      ...fields,
    })
    id = row.id
  }

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ id, title, kind: kind ?? null, focusTags: focusTags ?? [] })}\n`
    )
    return
  }
  process.stdout.write(
    `id\t${id}\ntitle\t${title}\nkind\t${kind ?? "-"}\nfocus\t${focusTags?.join(",") ?? "-"}\n`
  )
}
