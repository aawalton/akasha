
import { shape } from "./shape.ts"
import { type Infer, type Shape } from "./shape-core"
import { readFilePages } from "./file-pages.ts"
import { commsRuleSchema, constrainsOnSomething } from "./wake-armed-specs.ts"
import type { CommsRule } from "./decide-wake-match.ts"
import { toPersonaSlug } from "./persona-match.ts"

const PERSONA_PAGE_TYPE_SLUG = "persona"

const nullishString: Shape<string | undefined> = shape
  .string()
  .nullable()
  .optional()
  .transform((v) => v ?? undefined)

const PersonaWakeRowSchema = shape
  .looseObject({
    id: shape.string().min(1),
    title: shape.string().min(1),
    slug: nullishString,
  })
  .passthrough()

export interface PersonaTarget {
  readonly id: string
  readonly slug: string
  readonly wakeSources: readonly CommsRule[]
}

const rowWakeSourceSchema = shape
  .unknown()
  .transform((val: unknown) => {
    if (val === null || typeof val !== "object") return val
    if (!("contentRegex" in val)) return { ...val, contentRegex: undefined }
    const withKey: { contentRegex?: unknown } = val
    return withKey.contentRegex === null ? { ...val, contentRegex: undefined } : val
  })
  .pipe(commsRuleSchema)
  .refine((rule) => constrainsOnSomething(rule as CommsRule), {
    message:
      "a row-authored wakeSource must constrain on a non-empty senderMatch or a non-empty contentRegex; a rule constraining on neither matches every inbound message",
  })

type PersonaWakeRow = Infer<typeof PersonaWakeRowSchema>

function parseDeclaredWakeSources(slug: string, raw: unknown): readonly CommsRule[] {
  if (raw === undefined || raw === null) return []
  const parsed = shape.array(rowWakeSourceSchema).safeParse(raw)
  if (!parsed.success) {
    console.warn(
      `[persona-wake] ignoring malformed wakeSources on persona '${slug}': ${parsed.error.message}`
    )
    return []
  }
  return parsed.data as readonly CommsRule[]
}

export function personaTargetsFromRows(rows: readonly unknown[]): readonly PersonaTarget[] {
  const targets: PersonaTarget[] = []
  for (const row of rows) {
    const parsed = PersonaWakeRowSchema.safeParse(row)
    if (!parsed.success) {
      const id = typeof row === "object" && row !== null && "id" in row ? String(row.id) : "unknown"
      console.warn(
        `[persona-wake] skipping malformed persona page (id=${id}): ${parsed.error.message}`
      )
      continue
    }
    const data = parsed.data as PersonaWakeRow & { readonly wakeSources?: unknown }
    const handle = data.slug !== undefined && data.slug !== "" ? data.slug : toPersonaSlug(data.title)
    targets.push({
      id: data.id,
      slug: handle,
      wakeSources: parseDeclaredWakeSources(handle, data.wakeSources),
    })
  }
  return targets
}

export async function listPersonaTargets(): Promise<readonly PersonaTarget[]> {
  const rows = readFilePages(PERSONA_PAGE_TYPE_SLUG, ["id", "title", "wake-sources"])
  return personaTargetsFromRows(
    rows.map((row) => ({ ...row.values, wakeSources: row.values["wake-sources"] }))
  )
}

export async function listPersonaWakeSources(): Promise<ReadonlyMap<string, readonly CommsRule[]>> {
  const entries = (await listPersonaTargets())
    .filter((t) => t.wakeSources.length > 0)
    .map((t): readonly [string, readonly CommsRule[]] => [t.slug, t.wakeSources])
  return new Map(entries)
}

export async function listPersonaSlugs(): Promise<readonly string[]> {
  return (await listPersonaTargets()).map((t) => t.slug)
}
