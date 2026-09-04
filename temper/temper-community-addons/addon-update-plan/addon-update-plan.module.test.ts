import { expect, test } from "bun:test"
import {
  buildDirIndex,
  type CatalogEntry,
  distinctUids,
  findCatalogEntryByName,
  planUpdates,
  selectTargets,
  unknownOnlyDirs,
  versionsMatch,
} from "./addon-update-plan.module.code.ts"

const CATALOG: readonly CatalogEntry[] = [
  { uid: "1", name: "LibGPS", version: "7.0", dirs: ["LibGPS"] },
  { uid: "2", name: "Master Merchant", version: "4.1", dirs: ["MasterMerchant", "LibGuildStore"] },
]

test("a version is compared with the space around it collapsed", () => {
  expect(versionsMatch(" 7.0 ", "7.0")).toBe(true)
  expect(versionsMatch("7.0  beta", "7.0 beta")).toBe(true)
  expect(versionsMatch(undefined, "7.0")).toBe(false)
})

test("the first entry claiming a folder keeps that folder", () => {
  const index = buildDirIndex([
    ...CATALOG,
    { uid: "3", name: "Other", version: "1", dirs: ["LibGPS"] },
  ])
  expect(index.get("LibGPS")?.uid).toBe("1")
})

test("an entry is found by its name or by a folder it installs", () => {
  expect(findCatalogEntryByName(CATALOG, "LibGPS")?.uid).toBe("1")
  expect(findCatalogEntryByName(CATALOG, "LibGuildStore")?.uid).toBe("2")
  expect(findCatalogEntryByName(CATALOG, "nothing")).toBeUndefined()
})

test("a folder the deploy owns is marked as such and weighed no further", () => {
  const plan = planUpdates([{ dir: "LibGPS", version: "1.0" }], CATALOG, new Set(["LibGPS"]))
  expect(plan.addons[0]?.status).toBe("deploy-owned")
  expect(plan.addons[0]?.uid).toBeUndefined()
})

test("a folder ESOUI knows nothing about is marked as unmatched", () => {
  const plan = planUpdates([{ dir: "Mine", version: "1.0" }], CATALOG, new Set())
  expect(plan.addons[0]?.status).toBe("unmatched")
})

test("an installed addon stating no version counts as out of date", () => {
  const plan = planUpdates([{ dir: "LibGPS", version: undefined }], CATALOG, new Set())
  expect(plan.addons[0]?.status).toBe("outdated")
})

test("only an out-of-date folder is picked up unless the caller forces the rest", () => {
  const plan = planUpdates(
    [
      { dir: "LibGPS", version: "7.0" },
      { dir: "MasterMerchant", version: "4.0" },
    ],
    CATALOG,
    new Set()
  )
  expect(selectTargets(plan, { force: false, only: [] }).map((one) => one.dir)).toEqual([
    "MasterMerchant",
  ])
  expect(selectTargets(plan, { force: true, only: [] }).map((one) => one.dir)).toEqual([
    "LibGPS",
    "MasterMerchant",
  ])
  expect(selectTargets(plan, { force: true, only: ["LibGPS"] }).map((one) => one.dir)).toEqual([
    "LibGPS",
  ])
})

test("a folder named that cannot be installed is reported back", () => {
  const plan = planUpdates([{ dir: "Mine", version: "1" }], CATALOG, new Set())
  expect(unknownOnlyDirs(plan, ["Mine", "LibGPS"])).toEqual(["Mine", "LibGPS"])
})

test("a download is fetched once however many folders that download carries", () => {
  const plan = planUpdates(
    [
      { dir: "MasterMerchant", version: "1" },
      { dir: "LibGuildStore", version: "1" },
    ],
    CATALOG,
    new Set()
  )
  expect(distinctUids(selectTargets(plan, { force: true, only: [] }))).toEqual(["2"])
})
