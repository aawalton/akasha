
import { shape } from "./shape.ts"
import { readFilePages } from "./file-pages.ts"

const PERSON_PAGE_TYPE_SLUG = "person"

const PersonHandlerRowSchema = shape
  .looseObject({
    slug: shape.string().min(1),
    "identity-slug": shape.string().min(1),
  })
  .passthrough()

export interface PersonHandlerTarget {
  readonly persona: string
  readonly slug: string
}

export function personHandlersFromRows(rows: readonly unknown[]): readonly PersonHandlerTarget[] {
  const targets: PersonHandlerTarget[] = []
  for (const row of rows) {
    const parsed = PersonHandlerRowSchema.safeParse(row)
    if (!parsed.success) {
      const slug =
        typeof row === "object" && row !== null && "slug" in row ? String(row.slug) : "unknown"
      console.warn(
        `[person-handler] skipping malformed person page (slug=${slug}): ${parsed.error.message}`
      )
      continue
    }
    targets.push({ persona: parsed.data["identity-slug"], slug: parsed.data.slug })
  }
  return targets
}

export async function listPersonHandlers(): Promise<readonly PersonHandlerTarget[]> {
  const rows = readFilePages(PERSON_PAGE_TYPE_SLUG, ["identity-slug"])
  return personHandlersFromRows(rows.map((row) => ({ ...row.values })))
}
