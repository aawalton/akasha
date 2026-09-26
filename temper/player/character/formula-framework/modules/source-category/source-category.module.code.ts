import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { SourceCategoryId as SourceCategoryPageSlug } from "akasha/temper/catalog/world/temper-source-category/modules/source-category-ids/source-category-ids.data-table.code.ts"

export type SourceCategoryId = SourceCategoryPageSlug

interface SourceCategoryTemplate {
  readonly id: SourceCategoryId
  readonly name: string
  readonly displayOrder: number
  readonly subject: string | null
}

type SourceCategoryCatalog = {
  readonly ids: readonly SourceCategoryId[]
  readonly data: Readonly<Record<SourceCategoryId, SourceCategoryTemplate>>
}

const UNREAD =
  "the source categories are read from pages, and nothing has read them yet — gate the screen on `MetricCatalogGate`, or hold them before the work starts"

class SourceCategoriesUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "SourceCategoriesUnread"
  }
}

function templateOf(value: Value): SourceCategoryTemplate {
  const id = String(value.slug) as SourceCategoryId
  return {
    id,
    name: typeof value.title === "string" ? value.title : id,
    displayOrder: typeof value.displayOrder === "number" ? value.displayOrder : 0,
    subject: typeof value.subject === "string" ? value.subject : null,
  }
}

export function sourceCategoriesOf(pages: Iterable<Value>): SourceCategoryCatalog {
  const ordered = [...pages]
    .map(templateOf)
    .sort((one, two) => one.displayOrder - two.displayOrder || one.id.localeCompare(two.id))
  const data: Partial<Record<SourceCategoryId, SourceCategoryTemplate>> = {}
  for (const one of ordered) data[one.id] = one
  return {
    ids: ordered.map((one) => one.id),
    data: data as Record<SourceCategoryId, SourceCategoryTemplate>,
  }
}

let held: SourceCategoryCatalog | null = null

export function holdSourceCategories(read: SourceCategoryCatalog): SourceCategoryCatalog {
  held = read
  return read
}

export function sourceCategories(): SourceCategoryCatalog {
  if (held === null) throw new SourceCategoriesUnread()
  return held
}

export function sourceCategoriesOfSubject(subject: string): readonly SourceCategoryId[] {
  const { ids, data } = sourceCategories()
  return ids.filter((id) => data[id].subject === subject)
}
