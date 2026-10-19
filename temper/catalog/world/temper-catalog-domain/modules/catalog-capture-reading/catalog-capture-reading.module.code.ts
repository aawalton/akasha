import { readFileSync } from "node:fs"
import { join } from "node:path"
import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { uncommittedBesideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { DomainKey } from "akasha/temper/catalog/core/modules/domain-keys/domain-keys.module.code.ts"
import {
  CATALOG_DOMAIN_PAGE_TYPE_SLUG,
  catalogDomainSlug,
} from "akasha/temper/watcher/modules/watcher-import-catalog/watcher-import-catalog.module.code.ts"

const CAPTURE = "catalog-capture"

const ENDING = "json"

type Listed = (
  root: string,
  pageTypeSlug: string,
  slug: string
) => readonly { readonly path: string }[]

export function capturedCatalog(
  root: string,
  key: DomainKey,
  listed: Listed = listedAt
): Record<string, unknown> | undefined {
  const found = listed(root, CATALOG_DOMAIN_PAGE_TYPE_SLUG, catalogDomainSlug(key))
  const page = found.length === 1 ? found[0]?.path : undefined
  const at = page === undefined ? null : uncommittedBesideAt(page, CAPTURE, ENDING)
  if (at === null) return undefined
  let text: string
  try {
    text = readFileSync(join(root, at), "utf8")
  } catch {
    return undefined
  }
  return asRecord(JSON.parse(text))
}
