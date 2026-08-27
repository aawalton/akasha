import { describe, expect, test } from "bun:test"
import { renderBaselineModule } from "./check-tstl-colon-dot-self-shift"
import type { SelfShiftIssue } from "./tstl-colon-dot-self-shift"
import {
  dedupeSortBaseline,
  findUnreachableBaselineRows,
  partitionBaselined,
  type SelfShiftBaselineEntry,
} from "./tstl-colon-dot-self-shift.baseline"

const issue = (
  file: string,
  method: string,
  receiver: string,
  loadScope = false
): SelfShiftIssue => ({
  file,
  line: 1,
  col: 1,
  method,
  receiver,
  hint: `${receiver}:${method}`,
  loadScope,
})

const entry = (bundleSuffix: string, method: string, receiver: string): SelfShiftBaselineEntry => ({
  bundleSuffix,
  method,
  receiver,
})

describe("partitionBaselined", () => {
  test("grandfathers an issue whose (suffix, method, receiver) is in the baseline", () => {
    const issues = [issue("/abs/dist/TemperUnboxer/TemperUnboxer.lua", "SetHidden", "ZO_Loot")]
    const baseline = [entry("TemperUnboxer/TemperUnboxer.lua", "SetHidden", "ZO_Loot")]
    const { fresh, grandfathered } = partitionBaselined(issues, baseline)
    expect(fresh).toHaveLength(0)
    expect(grandfathered).toHaveLength(1)
  })

  test("matches on dist-relative suffix regardless of absolute root prefix", () => {
    const baseline = [entry("Foo/Foo.lua", "SetText", "label")]
    const a = partitionBaselined([issue("/a/b/dist/Foo/Foo.lua", "SetText", "label")], baseline)
    const b = partitionBaselined(
      [issue("/totally/other/Foo/Foo.lua", "SetText", "label")],
      baseline
    )
    expect(a.grandfathered).toHaveLength(1)
    expect(b.grandfathered).toHaveLength(1)
  })

  test("a NEW method on a grandfathered bundle is fresh (fails the gate)", () => {
    const baseline = [entry("Foo/Foo.lua", "SetText", "label")]
    const { fresh, grandfathered } = partitionBaselined(
      [issue("/x/dist/Foo/Foo.lua", "SetHidden", "label")],
      baseline
    )
    expect(fresh).toHaveLength(1)
    expect(grandfathered).toHaveLength(0)
  })

  test("a NEW receiver for a grandfathered method is fresh", () => {
    const baseline = [entry("Foo/Foo.lua", "SetText", "label")]
    const { fresh } = partitionBaselined(
      [issue("/x/dist/Foo/Foo.lua", "SetText", "otherLabel")],
      baseline
    )
    expect(fresh).toHaveLength(1)
  })

  test("the same triple in a DIFFERENT bundle is fresh (suffix must match)", () => {
    const baseline = [entry("Foo/Foo.lua", "SetText", "label")]
    const { fresh } = partitionBaselined(
      [issue("/x/dist/Bar/Bar.lua", "SetText", "label")],
      baseline
    )
    expect(fresh).toHaveLength(1)
  })

  test("a member's BUNDLE emission is grandfathered by its self-named standalone entry", () => {
    const baseline = [entry("ExampleMember/ExampleMember.lua", "SetText", "messageParams")]
    const { fresh, grandfathered } = partitionBaselined(
      [issue("/x/dist/ExampleBundle/ExampleMember.lua", "SetText", "messageParams")],
      baseline
    )
    expect(fresh).toHaveLength(0)
    expect(grandfathered).toHaveLength(1)
  })

  test("a LOAD-SCOPE site in a member's bundle emission still fails (never grandfathered)", () => {
    const baseline = [entry("ExampleMember/ExampleMember.lua", "SetText", "messageParams")]
    const { fresh, grandfathered } = partitionBaselined(
      [issue("/x/dist/ExampleBundle/ExampleMember.lua", "SetText", "messageParams", true)],
      baseline
    )
    expect(fresh).toHaveLength(1)
    expect(grandfathered).toHaveLength(0)
  })

  test("a NON-self-named bundle entry does not tail-match a different file", () => {
    const baseline = [entry("Temper/Helper.lua", "SetText", "label")]
    const { fresh } = partitionBaselined(
      [issue("/x/dist/Other/Helper.lua", "SetText", "label")],
      baseline
    )
    expect(fresh).toHaveLength(1)
  })

  test("empty baseline makes every issue fresh", () => {
    const { fresh, grandfathered } = partitionBaselined(
      [issue("/x/dist/Foo/Foo.lua", "SetText", "label")],
      []
    )
    expect(fresh).toHaveLength(1)
    expect(grandfathered).toHaveLength(0)
  })

  test("a LOAD-SCOPE issue is fresh even when its triple is in the baseline", () => {
    const baseline = [entry("Foo/Foo.lua", "GetRight", "ZO_ActionBar1")]
    const { fresh, grandfathered } = partitionBaselined(
      [issue("/x/dist/Foo/Foo.lua", "GetRight", "ZO_ActionBar1", true)],
      baseline
    )
    expect(fresh).toHaveLength(1)
    expect(grandfathered).toHaveLength(0)
  })

  test("a DEFERRED issue with the same triple stays grandfathered (load-scope is the only escape)", () => {
    const baseline = [entry("Foo/Foo.lua", "GetRight", "ZO_ActionBar1")]
    const { fresh, grandfathered } = partitionBaselined(
      [issue("/x/dist/Foo/Foo.lua", "GetRight", "ZO_ActionBar1", false)],
      baseline
    )
    expect(fresh).toHaveLength(0)
    expect(grandfathered).toHaveLength(1)
  })
})

describe("findUnreachableBaselineRows", () => {
  const emittable = new Set(["Alpha.lua", "Beta.lua", "AlphaConfig.lua", "build-id.lua"])
  const roster = new Set(["Alpha", "Beta"])
  const find = (rows: readonly SelfShiftBaselineEntry[]) =>
    findUnreachableBaselineRows(rows, emittable, roster)

  test("a row on a live addon's own bundle reaches something", () => {
    expect(find([entry("Alpha/Alpha.lua", "SetText", "label")])).toEqual([])
  })

  test("a row on a side file a live addon emits reaches something", () => {
    expect(find([entry("Alpha/AlphaConfig.lua", "SetText", "label")])).toEqual([])
  })

  test("a row whose bundle no addon emits reaches nothing", () => {
    const rows = [entry("Folded/Folded.lua", "RegisterCallback", "WORLD_MAP_SCENE")]
    expect(find(rows)).toEqual(rows)
  })

  test("a self-named row is reachable on its basename alone, matching the tail rule", () => {
    const rows = [entry("Beta/Beta.lua", "SetText", "label")]
    expect(find(rows)).toEqual([])
    expect(
      partitionBaselined([issue("/x/dist/Alpha/Beta.lua", "SetText", "label")], rows).grandfathered
    ).toHaveLength(1)
  })

  test("a side-file row under a directory that left the roster reaches nothing", () => {
    const rows = [entry("Departed/AlphaConfig.lua", "SetText", "label")]
    expect(find(rows)).toEqual(rows)
  })

  test("an empty baseline has nothing unreachable", () => {
    expect(find([])).toEqual([])
  })
})

describe("renderBaselineModule", () => {
  test("the generated header states the size and shape of the rows beneath it", () => {
    const text = renderBaselineModule([
      entry("Alpha/Alpha.lua", "SetText", "label"),
      entry("Alpha/Alpha.lua", "SetHidden", "label"),
      entry("Beta/Beta.lua", "SetText", "label"),
    ])
    expect(text).toContain("3 ROW(S) OVER 2 BUNDLE DIRECTORY(IES)")
  })

  test("the figure moves with the rows rather than staying where it was written", () => {
    const one = renderBaselineModule([entry("Alpha/Alpha.lua", "SetText", "label")])
    expect(one).toContain("1 ROW(S) OVER 1 BUNDLE DIRECTORY(IES)")
  })

  test("an emptied baseline says so rather than reporting a size of zero", () => {
    expect(renderBaselineModule([])).toContain("THIS BASELINE IS EMPTY")
  })
})

describe("dedupeSortBaseline", () => {
  test("dedupes identical triples", () => {
    const rows = dedupeSortBaseline([
      entry("Foo/Foo.lua", "SetText", "label"),
      entry("Foo/Foo.lua", "SetText", "label"),
    ])
    expect(rows).toHaveLength(1)
  })

  test("sorts by bundleSuffix, then method, then receiver", () => {
    const rows = dedupeSortBaseline([
      entry("Zed/Zed.lua", "SetText", "a"),
      entry("Foo/Foo.lua", "SetText", "b"),
      entry("Foo/Foo.lua", "SetText", "a"),
      entry("Foo/Foo.lua", "SetHidden", "z"),
    ])
    expect(rows.map((r) => `${r.bundleSuffix}|${r.method}|${r.receiver}`)).toEqual([
      "Foo/Foo.lua|SetHidden|z",
      "Foo/Foo.lua|SetText|a",
      "Foo/Foo.lua|SetText|b",
      "Zed/Zed.lua|SetText|a",
    ])
  })

  test("keeps distinct triples that differ only by receiver", () => {
    const rows = dedupeSortBaseline([
      entry("Foo/Foo.lua", "SetText", "a"),
      entry("Foo/Foo.lua", "SetText", "b"),
    ])
    expect(rows).toHaveLength(2)
  })
})
