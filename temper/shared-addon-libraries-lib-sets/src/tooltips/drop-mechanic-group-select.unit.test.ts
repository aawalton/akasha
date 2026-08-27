import { describe, expect, test } from "bun:test"
import { selectZoneGroupEntries, type ZoneGroupMember } from "./drop-mechanic-group-select"

function member(
  index: number,
  name: string | undefined,
  locationName?: string | undefined,
  nameClean?: string | undefined
): ZoneGroupMember {
  return {
    index,
    name,
    nameClean: nameClean ?? name,
    locationName,
  }
}

describe("selectZoneGroupEntries", () => {
  test("collapses a mechanic repeated within one zone group", () => {
    const entries = selectZoneGroupEntries([
      member(1, "Overland delve bosses"),
      member(2, "Overland group bosses"),
      member(4, "Overland/Delve chests"),
      member(5, "Loot from overland items"),
      member(6, "Overland group bosses"),
    ])

    expect(entries.map((e) => e.name)).toEqual([
      "Overland delve bosses",
      "Overland group bosses",
      "Overland/Delve chests",
      "Loot from overland items",
    ])
  })

  test("keeps same-named members that differ by drop location", () => {
    const entries = selectZoneGroupEntries([member(1, "Boss", "Ozara"), member(2, "Boss", "Foo")])

    expect(entries).toHaveLength(2)
    expect(entries.map((e) => e.locationName)).toEqual(["Ozara", "Foo"])
  })

  test("collapses members identical in both name and location", () => {
    const entries = selectZoneGroupEntries([member(1, "Boss", "Ozara"), member(2, "Boss", "Ozara")])

    expect(entries).toHaveLength(1)
  })

  test("keeps members whose textured names differ under one clean name", () => {
    const entries = selectZoneGroupEntries([
      member(1, "|t24:24:icon_a.dds|tBoss", undefined, "Boss"),
      member(2, "|t24:24:icon_b.dds|tBoss", undefined, "Boss"),
    ])

    expect(entries).toHaveLength(2)
  })

  test("does not drop the group when the FIRST member has no name", () => {
    const entries = selectZoneGroupEntries([
      member(1, undefined),
      member(2, "Overland group bosses"),
    ])

    expect(entries.map((e) => e.name)).toEqual(["Overland group bosses"])
  })

  test("emits a member that has a location but no resolved name", () => {
    const entries = selectZoneGroupEntries([member(1, undefined, "Ozara")])

    expect(entries).toHaveLength(1)
    expect(entries[0]?.name).toBeUndefined()
    expect(entries[0]?.locationName).toBe("Ozara")
  })

  test("drops a member carrying neither a name nor a location", () => {
    const entries = selectZoneGroupEntries([
      member(1, undefined),
      member(2, "Overland group bosses"),
      member(3, undefined),
    ])

    expect(entries).toHaveLength(1)
  })

  test("orders by member index regardless of input order", () => {
    const entries = selectZoneGroupEntries([
      member(6, "Loot from overland items"),
      member(2, "Overland group bosses"),
      member(4, "Overland/Delve chests"),
    ])

    expect(entries.map((e) => e.name)).toEqual([
      "Overland group bosses",
      "Overland/Delve chests",
      "Loot from overland items",
    ])
  })

  test("returns nothing for an empty group", () => {
    expect(selectZoneGroupEntries([])).toEqual([])
  })
})
