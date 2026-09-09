import { expect, test } from "bun:test"
import {
  allSynced,
  describeOperations,
  isoFromMtimeMs,
  mergeOperations,
  type SyncOperation,
} from "./watcher-run-outcome.module.code.ts"

function operation(name: string, state: SyncOperation["state"], detail?: string): SyncOperation {
  return {
    kind: "import",
    name,
    path: `/game/SavedVariables/${name}.lua`,
    state,
    ranAt: "2026-09-02T00:00:00.000Z",
    ...(detail === undefined ? {} : { detail }),
  }
}

test("an operation of a name already held replaces the one held", () => {
  const merged = mergeOperations([{ name: "sales" }], [operation("sales", "synced")])
  expect(merged).toHaveLength(1)
  expect(merged[0]?.name).toBe("sales")
})

test("an operation of an unheld name joins what is held", () => {
  const merged = mergeOperations([{ name: "sales" }], [operation("catalog", "synced")])
  expect(merged.map((o) => o.name)).toEqual(["catalog", "sales"])
})

test("merged operations come back ordered by name", () => {
  const merged = mergeOperations(
    [{ name: "zeta" }, { name: "alpha" }],
    [operation("mid", "synced")]
  )
  expect(merged.map((o) => o.name)).toEqual(["alpha", "mid", "zeta"])
})

test("a modification time at or below zero is no time", () => {
  expect(isoFromMtimeMs(0)).toBeNull()
  expect(isoFromMtimeMs(-1)).toBeNull()
  expect(isoFromMtimeMs(Number.NaN)).toBeNull()
  expect(isoFromMtimeMs(Number.POSITIVE_INFINITY)).toBeNull()
})

test("a modification time above zero comes back as an iso string", () => {
  expect(isoFromMtimeMs(1_000)).toBe("1970-01-01T00:00:01.000Z")
})

test("a run counts as carried across only when every operation is synced", () => {
  expect(allSynced([operation("a", "synced"), operation("b", "synced")])).toBe(true)
  expect(allSynced([operation("a", "synced"), operation("b", "upload_failed")])).toBe(false)
})

test("no operation at all counts as carried across", () => {
  expect(allSynced([])).toBe(true)
})

test("operations with nothing to say are described as none having run", () => {
  expect(describeOperations([])).toBe("no operations ran")
})

test("an operation replacing one held brings its own state and moment", () => {
  const held = {
    kind: "import" as const,
    name: "sales",
    path: "/game/SavedVariables/sales.lua",
    state: "synced" as const,
    ranAt: "2026-08-01T00:00:00.000Z",
    fileModifiedAt: "2026-07-31T00:00:00.000Z",
  }
  const merged = mergeOperations([held], [operation("sales", "file_not_found")])
  expect(merged[0]).toMatchObject({ state: "file_not_found", ranAt: "2026-09-02T00:00:00.000Z" })
  expect(merged[0]).not.toHaveProperty("fileModifiedAt")
})

test("an operation nothing incoming names is left untouched", () => {
  const held = { name: "characters", state: "file_not_found", ranAt: "2026-08-01T00:00:00.000Z" }
  const merged = mergeOperations([held], [operation("inventory", "synced")])
  expect(merged.find((o) => o.name === "characters")).toEqual(held)
})

test("a run holding no operation leaves every operation held untouched", () => {
  const held = [{ name: "characters" }, { name: "sales" }]
  expect(mergeOperations(held, [])).toEqual(held)
})

test("an operation held that this build cannot read is kept whole", () => {
  const held = { name: "somethingFromALaterBuild", unknownField: 42 }
  const merged = mergeOperations([held], [operation("sales", "synced")])
  expect(merged).toHaveLength(2)
  expect(merged.find((o) => o.name === "somethingFromALaterBuild")).toEqual(held)
})

test("an operation skipped or refused at the file is no success", () => {
  expect(allSynced([operation("a", "skipped")])).toBe(false)
  expect(allSynced([operation("a", "file_not_found")])).toBe(false)
  expect(allSynced([operation("a", "parse_failed")])).toBe(false)
})

test("a described operation carries its detail where it has one", () => {
  expect(
    describeOperations([operation("a", "synced"), operation("b", "parse_failed", "bad")])
  ).toBe("a synced, b parse_failed (bad)")
})
