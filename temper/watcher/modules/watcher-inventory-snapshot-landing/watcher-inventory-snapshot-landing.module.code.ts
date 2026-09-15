import type { InventoryDatabase } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import type {
  Landed,
  LandingDeps,
  PageKey,
  Tried,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"
import {
  contentIn,
  landOverAttempts,
  PAGE_LANDING_WRITER,
  pageBodyFor,
  pagePathIn,
  readingFor,
  triedFrom,
  writingFor,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const FOLDER = "temper/holdings/temper-inventory-snapshot/pages"

const DATA_PROPERTY = "data"

const MS_PER_SECOND = 1000

const INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG = "temper-inventory-snapshot"

export interface SnapshotValues {
  readonly slug: string
  readonly accountPage: string
  readonly capturedAt: string
  readonly totalValue: number
  readonly chunkCount: number
  readonly inventory: InventoryDatabase
}

export function snapshotPagePath(slug: string): string {
  return pagePathIn(FOLDER, slug, INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG)
}

export function snapshotDataPath(slug: string): string {
  return `${FOLDER}/${slug}/${slug}.${INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG}.${DATA_PROPERTY}.json`
}

export function snapshotPageKeys(values: SnapshotValues): readonly PageKey[] {
  const { meta, transmuteCrystalAmount, transmuteCrystalCap } = values.inventory
  const keys: PageKey[] = [
    ["title", values.capturedAt],
    ["accountPage", values.accountPage],
    ["capturedAt", values.capturedAt],
    ["totalValue", values.totalValue],
    ["chunkCount", values.chunkCount],
  ]
  if (meta.lastFullScan > 0) {
    keys.push(["lastFullScanAt", new Date(meta.lastFullScan * MS_PER_SECOND).toISOString()])
  }
  if (meta.priceSource !== undefined) keys.push(["priceSource", meta.priceSource])
  if (transmuteCrystalAmount !== undefined) {
    keys.push(["transmuteCrystalAmount", transmuteCrystalAmount])
  }
  if (transmuteCrystalCap !== undefined) keys.push(["transmuteCrystalCap", transmuteCrystalCap])
  keys.push([DATA_PROPERTY, "json"])
  return keys
}

export function snapshotPageBody(values: SnapshotValues, id: string): string {
  return pageBodyFor(
    FOLDER,
    INVENTORY_SNAPSHOT_PAGE_TYPE_SLUG,
    values.slug,
    id,
    snapshotPageKeys(values)
  )
}

function snapshotCommitMessage(values: SnapshotValues): string {
  return `temper: the inventory scan taken at ${values.capturedAt}`
}

export async function landInventorySnapshot(
  values: SnapshotValues,
  minted: () => string,
  deps: LandingDeps = {}
): Promise<Landed> {
  const read = readingFor(deps)
  const write = writingFor(deps)
  const pagePath = snapshotPagePath(values.slug)
  const dataPath = snapshotDataPath(values.slug)
  const tryOnce = async (): Promise<Tried> => {
    const found = await read([pagePath])
    if (!found.ok) return { outcome: "again", why: found.why }
    if (contentIn(found.bodies, pagePath) !== null) return { outcome: "already", at: found.at }
    const puts = [
      { path: pagePath, content: snapshotPageBody(values, minted()) },
      { path: dataPath, content: JSON.stringify(values.inventory) },
    ]
    return triedFrom(
      await write(
        puts,
        PAGE_LANDING_WRITER,
        snapshotCommitMessage(values),
        undefined,
        undefined,
        found.at
      )
    )
  }
  return landOverAttempts(`no attempt to land a scan on ${pagePath} was made`, tryOnce, deps)
}
