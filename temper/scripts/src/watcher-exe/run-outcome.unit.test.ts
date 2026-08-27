import { describe, expect, test } from "bun:test"
import {
  allSynced,
  describeOperations,
  isoFromMtimeMs,
  mergeOperations,
  type StoredOperation,
  type SyncOperation,
} from "./run-outcome"

const RAN_EARLY = "2026-07-25T07:00:00.000Z"
const RAN_LATE = "2026-07-25T07:05:00.000Z"
const MTIME_ISO = "2026-07-24T14:32:13.000Z"

const FUTURE_BUILD_ENTRY = { name: "somethingFromAFutureBuild", unknownField: 42 }

function op(overrides: Partial<SyncOperation> & Pick<SyncOperation, "name">): SyncOperation {
  return {
    kind: "import",
    path: `/eso/live/SavedVariables/${overrides.name}.lua`,
    state: "synced",
    ranAt: RAN_EARLY,
    ...overrides,
  }
}

describe("mergeOperations", () => {
  test("a healthy target's report does not erase a failing sibling's", () => {
    const existing: StoredOperation[] = [
      op({ name: "characters", state: "file_not_found", ranAt: RAN_EARLY }),
    ]
    const incoming = [op({ name: "inventory", state: "synced", ranAt: RAN_LATE })]

    const merged = mergeOperations(existing, incoming)

    expect(merged.map((o) => o.name)).toEqual(["characters", "inventory"])
    expect(merged.find((o) => o.name === "characters")).toMatchObject({
      state: "file_not_found",
      ranAt: RAN_EARLY,
    })
  })

  test("replaces a same-named entry, and is NOT monotonic", () => {
    const existing: StoredOperation[] = [
      op({ name: "characters", state: "synced", ranAt: RAN_EARLY, fileModifiedAt: MTIME_ISO }),
    ]
    const incoming = [op({ name: "characters", state: "file_not_found", ranAt: RAN_LATE })]

    const merged = mergeOperations(existing, incoming)

    expect(merged).toHaveLength(1)
    expect(merged[0]).toMatchObject({ state: "file_not_found", ranAt: RAN_LATE })
    expect(merged[0]).not.toHaveProperty("fileModifiedAt")
  })

  test("preserves entries this build cannot interpret", () => {
    const existing: StoredOperation[] = [FUTURE_BUILD_ENTRY]
    const incoming = [op({ name: "inventory" })]

    const merged = mergeOperations(existing, incoming)

    expect(merged).toHaveLength(2)
    expect(merged.find((o) => o.name === "somethingFromAFutureBuild")).toEqual(FUTURE_BUILD_ENTRY)
  })

  test("orders by name so the stored value does not depend on dispatch history", () => {
    const merged = mergeOperations(
      [op({ name: "tasks" }), op({ name: "characters" })],
      [op({ name: "inventory" }), op({ name: "charactersConfig" })]
    )

    expect(merged.map((o) => o.name)).toEqual([
      "characters",
      "charactersConfig",
      "inventory",
      "tasks",
    ])
  })

  test("an empty incoming set leaves the existing report untouched", () => {
    const existing: StoredOperation[] = [op({ name: "characters", state: "upload_failed" })]

    expect(mergeOperations(existing, [])).toEqual(existing)
  })
})

describe("isoFromMtimeMs", () => {
  test("converts a real mtime to ISO", () => {
    expect(isoFromMtimeMs(Date.parse(MTIME_ISO))).toBe(MTIME_ISO)
  })

  test("reports an unusable stat as unknown rather than as 1970", () => {
    expect(isoFromMtimeMs(0)).toBeNull()
    expect(isoFromMtimeMs(-1)).toBeNull()
    expect(isoFromMtimeMs(Number.NaN)).toBeNull()
    expect(isoFromMtimeMs(Number.POSITIVE_INFINITY)).toBeNull()
  })
})

describe("allSynced", () => {
  test("true only when every operation synced", () => {
    expect(allSynced([op({ name: "characters" }), op({ name: "tasks" })])).toBe(true)
  })

  test("a skipped side-file write is not a success", () => {
    expect(
      allSynced([op({ name: "characters" }), op({ name: "charactersConfig", state: "skipped" })])
    ).toBe(false)
  })

  test("any failure state is not a success", () => {
    expect(allSynced([op({ name: "characters", state: "upload_failed" })])).toBe(false)
    expect(allSynced([op({ name: "characters", state: "file_not_found" })])).toBe(false)
    expect(allSynced([op({ name: "characters", state: "parse_failed" })])).toBe(false)
  })

  test("an empty operation set is not a failure", () => {
    expect(allSynced([])).toBe(true)
  })
})

describe("describeOperations", () => {
  test("names every operation and its state instead of one collapsed verdict", () => {
    const line = describeOperations([
      op({ name: "characters" }),
      op({ name: "completion" }),
      op({ name: "tasks" }),
      op({
        name: "charactersConfig",
        kind: "export",
        state: "skipped",
        detail: "addon directory absent",
      }),
    ])

    expect(line).toBe(
      "characters synced, completion synced, tasks synced, charactersConfig skipped (addon directory absent)"
    )
  })

  test("says so plainly when nothing ran", () => {
    expect(describeOperations([])).toBe("no operations ran")
  })
})
