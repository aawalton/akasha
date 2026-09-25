import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { inLowerKebabCaseAcronymsWhole } from "akasha/page/name-format/pages/lower-kebab-case/lower-kebab-case.name-format.code.ts"
import {
  CATALOG_DOMAIN_KEYS,
  type DomainKey,
} from "akasha/temper/catalog/core/modules/domain-keys/domain-keys.module.code.ts"
import {
  type AccountSummary,
  readAccountSummaries,
} from "akasha/temper/watcher/modules/saved-variables-reader/saved-variables-reader.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"

export const CATALOG_DOMAIN_PAGE_TYPE_SLUG = "temper-catalog-domain"

export const NO_ACCOUNT_WIDE_TABLE =
  "no account in the catalog saved variables carries a readable account-wide table"

export const NO_CAPTURE_VERSION =
  "apiVersion or manifestApiVersion is absent from the account-wide table, so no page changes"

export const NO_DOMAIN_PRESENT =
  "no catalog domain is present in the saved variables, so no page changes"

const DOMAIN_KEY_SUFFIX = "Catalog"

export function catalogDomainSlug(key: DomainKey): string {
  const stem = key.endsWith(DOMAIN_KEY_SUFFIX) ? key.slice(0, -DOMAIN_KEY_SUFFIX.length) : key
  return inLowerKebabCaseAcronymsWhole(stem)
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

interface CatalogCapture {
  readonly account: string
  readonly apiVersion: string
  readonly manifestApiVersion: number
  readonly domainKeys: readonly DomainKey[]
}

function versionedCapture(summary: AccountSummary): CatalogCapture | undefined {
  const { account, apiVersion, manifestApiVersion } = summary
  if (apiVersion === undefined || manifestApiVersion === undefined) return undefined
  return {
    account,
    apiVersion,
    manifestApiVersion,
    domainKeys: presentCatalogDomainKeys(summary.presentDomainKeys),
  }
}

const BUILD_ORDER = new Intl.Collator("en", { numeric: true })

export function isNewerCapture(
  candidate: Pick<CatalogCapture, "apiVersion" | "manifestApiVersion">,
  held: Pick<CatalogCapture, "apiVersion" | "manifestApiVersion">
): boolean {
  if (candidate.manifestApiVersion !== held.manifestApiVersion) {
    return candidate.manifestApiVersion > held.manifestApiVersion
  }
  return BUILD_ORDER.compare(candidate.apiVersion, held.apiVersion) > 0
}

interface DomainStamp {
  readonly key: DomainKey
  readonly capture: CatalogCapture
}

export function newestCaptureByDomain(captures: readonly CatalogCapture[]): readonly DomainStamp[] {
  const stamps: DomainStamp[] = []
  for (const key of CATALOG_DOMAIN_KEYS) {
    let newest: CatalogCapture | undefined
    for (const capture of captures) {
      if (!capture.domainKeys.includes(key)) continue
      if (newest === undefined || isNewerCapture(capture, newest)) newest = capture
    }
    if (newest !== undefined) stamps.push({ key, capture: newest })
  }
  return stamps
}

export async function runImportCatalog(
  content: string,
  deps: ImportCatalogDeps = {}
): Promise<ImportCatalogOutcome> {
  const patch = deps.patch ?? overPages
  const now = deps.now ?? (() => new Date().toISOString())
  const report = deps.report ?? log

  const summaries = readAccountSummaries(content)
  if (summaries.length === 0) {
    throw new Error(NO_ACCOUNT_WIDE_TABLE)
  }

  const captures = summaries.flatMap((summary) => versionedCapture(summary) ?? [])
  if (captures.length === 0) {
    report(NO_CAPTURE_VERSION)
    return { changedSlugs: [], absentSlugs: [], skipped: NO_CAPTURE_VERSION }
  }

  const stamps = newestCaptureByDomain(captures)
  if (stamps.length === 0) {
    report(NO_DOMAIN_PRESENT)
    return { changedSlugs: [], absentSlugs: [], skipped: NO_DOMAIN_PRESENT }
  }

  const capturedAt = now()
  for (const capture of captures) {
    report(
      `${capture.account}: apiVersion=${capture.apiVersion}, manifestApiVersion=${capture.manifestApiVersion}, ${capture.domainKeys.length} catalog domain(s) present`
    )
  }

  const changedSlugs: string[] = []
  const absentSlugs: string[] = []
  for (const { key, capture } of stamps) {
    const slug = catalogDomainSlug(key)
    const { apiVersion, manifestApiVersion } = capture
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
    report(`${slug}: changed to apiVersion=${apiVersion} from ${capture.account}`)
  }

  return { changedSlugs, absentSlugs, skipped: undefined }
}
