/**
 * Where a converted day belongs, and what its file imports, asked of akasha rather than written down.
 *
 * `composedFor` in `akasha/pages-system/pages-system-service/page-composing/` is what the pages
 * system service composes every akasha page from, and it answers both questions already: `pathFor`
 * says which folder a page of a type goes in, and `importedFrom` says what specifier reaches the type
 * from there. This file is those two called with the day page type, so the migration renders the same
 * bytes the live service would render for the same day.
 *
 * A specifier written down as a constant instead would be a second answer to a question that already
 * has one. It is right only at the depth whoever wrote it had in mind, and a type-only import is
 * erased before the file runs, so a wrong one loads fine and fails a typecheck nobody ran. That is
 * the whole reason nothing here is a literal.
 *
 * Nothing here reads a file. `pathFor` and `importedFrom` are functions from text to text.
 */

import { importedFrom } from "../../akasha/pages-system/page/page-body/page-body.module.code.ts"
import { pathFor } from "../../akasha/pages-system/pages-system-service/page-composing/page-composing.module.code.ts"
import { DAY_PAGE_TYPE } from "./shape.ts"

export type Placing = {
  /** Where the day page type is declared, against the repository root. */
  readonly typeAt: string
  /** The folder a day page belongs in, against the repository root. */
  readonly folder: string
}

/**
 * The folder akasha would put a new day page in, and the type file that folder is measured from.
 *
 * `pathFor` takes a slug and answers a whole path, so a slug is handed in and the file name taken
 * off again. Any slug answers the same folder — the folder is the type's, not the day's.
 */
export function placingFor(typeAt: string, pluralSlug: string): Placing {
  const said = pathFor(typeAt, pluralSlug, DAY_PAGE_TYPE, "a-day")
  return { typeAt, folder: said.split("/").slice(0, -1).join("/") }
}

/** Where one day's file belongs, against the repository root. */
export function pageAtIn(placing: Placing, pageName: string): string {
  return `${placing.folder}/${pageName}`
}

/** The specifier that day file states, which is akasha's own answer for that pair of paths. */
export function importFor(placing: Placing, pageName: string): string {
  return importedFrom(pageAtIn(placing, pageName), placing.typeAt)
}
