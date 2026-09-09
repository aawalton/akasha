import { generatorKind } from "@akasha/pages/generator-kind"
import { uuidV7 } from "@akasha/pages/generator-kind/uuid-v7"
import { page } from "@akasha/pages/page"
import { id as idPage } from "@akasha/pages/page/id"
import { slug as slugPage } from "@akasha/pages/page/slug"
import { pageProperty } from "@akasha/pages/page-property"
import { pageType } from "@akasha/pages/page-type"
import { textProperty } from "@akasha/pages/text-property"
import { domain } from "akasha/domains/domain.page-type.ts"

type Named = {
  readonly slug: string
  readonly pageTypeSlug: string
}

function pagesUnder(folder: string, values: readonly Named[]): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const value of values) {
    found[`${folder}/${value.slug}.${value.pageTypeSlug}.ts`] =
      `export const it = ${JSON.stringify(value)} as const\n`
  }
  return found
}

export function declaringUnder(folder: string): Readonly<Record<string, string>> {
  return pagesUnder(folder, [textProperty, idPage, slugPage, generatorKind, uuidV7])
}

export function typingUnder(folder: string): Readonly<Record<string, string>> {
  return pagesUnder(folder, [page, domain, pageProperty, pageType])
}
