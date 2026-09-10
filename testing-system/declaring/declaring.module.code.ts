import { domain } from "akasha/domains/domain.page-type.ts"
import { generatorKind } from "akasha/pages/generator-kinds/generator-kind.page-type.ts"
import { uuidV7 } from "akasha/pages/generator-kinds/pages/uuid-v7.generator-kind.ts"
import { page } from "akasha/pages/page.page-type.ts"
import { id as idPage } from "akasha/pages/properties/id.text-property.ts"
import { slug as slugPage } from "akasha/pages/properties/slug.text-property.ts"
import { textProperty } from "akasha/pages/text-properties/text-property.page-type.ts"
import { pageProperty } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import { pageType } from "akasha/pages/types/page-type.page-type.ts"

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
