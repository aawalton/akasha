import { patchPage } from "@akasha/pages-access/patch"
import { CATALOG_DOMAIN_KEYS, type DomainKey } from "@akasha/temper-catalog-core/domain-keys"
import { readAccountSummaries } from "@akasha/temper-catalog-host/saved-variables-reader"
import { log } from "../watcher-logging/watcher-logging.module.code.ts"

export const CATALOG_DOMAIN_PAGE_TYPE_SLUG = "temper-catalog-domain"

export const NO_ACCOUNT_WIDE_TABLE =
  "no account in the catalog saved variables carries a readable account-wide table"

export const NO_CAPTURE_VERSION =
  "apiVersion or manifestApiVersion is absent from the account-wide table, so no page changes"

export const NO_DOMAIN_PRESENT =
  "no catalog domain is present in the saved variables, so no page changes"

const DOMAIN_KEY_SUFFIX = "Catalog"

const CAMEL_BOUNDARY = /([a-z0-9])([A-Z])/g

export function catalogDomainSlug(key: DomainKey): string {
  const stem = key.endsWith(DOMAIN_KEY_SUFFIX) ? key.slice(0, -DOMAIN_KEY_SUFFIX.length) : key
  return stem.replace(CAMEL_BOUNDARY, "$1-$2").toLowerCase()
}

export function presentCatalogDomainKeys(present: readonly string[]): readonly DomainKey[] {
  const held = new Set(present)
  return CATALOG_DOMAIN_KEYS.filter((key) => held.has(key))
}

export type CatalogDomainPatch = (args: {
  pageTypeSlug: string
  where: readonly { key: string; eq: string }[]
  set: Record<string, string | number>
}) => Promise<unknown>

const overPages: CatalogDomainPatch = (args) => patchPage(args)

export interface ImportCatalogDeps {
  readonly patch?: CatalogDomainPatch
  readonly now?: () => string
  readonly report?: (message: string) => void
}

export interface ImportCatalogOutcome {
  readonly changedSlugs: readonly string[]
  readonly absentSlugs: readonly string[]
  readonly skipped: string | undefined
}

export async function runImportCatalog(
  content: string,
  deps: ImportCatalogDeps = {}
): Promise<ImportCatalogOutcome> {
  const patch = deps.patch ?? overPages
  const now = deps.now ?? (() => new Date().toISOString())
  const report = deps.report ?? log

  const summary = readAccountSummaries(content)[0]
  if (summary === undefined) {
    throw new Error(NO_ACCOUNT_WIDE_TABLE)
  }

  const { apiVersion, manifestApiVersion } = summary
  if (apiVersion === undefined || manifestApiVersion === undefined) {
    report(NO_CAPTURE_VERSION)
    return { changedSlugs: [], absentSlugs: [], skipped: NO_CAPTURE_VERSION }
  }

  const keys = presentCatalogDomainKeys(summary.presentDomainKeys)
  if (keys.length === 0) {
    report(NO_DOMAIN_PRESENT)
    return { changedSlugs: [], absentSlugs: [], skipped: NO_DOMAIN_PRESENT }
  }

  const capturedAt = now()
  report(
    `apiVersion=${apiVersion}, manifestApiVersion=${manifestApiVersion}, ${keys.length} catalog domain(s) present`
  )

  const changedSlugs: string[] = []
  const absentSlugs: string[] = []
  for (const key of keys) {
    const slug = catalogDomainSlug(key)
    const row = await patch({
      pageTypeSlug: CATALOG_DOMAIN_PAGE_TYPE_SLUG,
      where: [{ key: "slug", eq: slug }],
      set: { apiVersion, manifestApiVersion, capturedAt },
    })
    if (row === null || row === undefined) {
      absentSlugs.push(slug)
      report(`${slug}: no ${CATALOG_DOMAIN_PAGE_TYPE_SLUG} page carries that slug`)
      continue
    }
    changedSlugs.push(slug)
    report(`${slug}: changed to apiVersion=${apiVersion}`)
  }

  return { changedSlugs, absentSlugs, skipped: undefined }
}
