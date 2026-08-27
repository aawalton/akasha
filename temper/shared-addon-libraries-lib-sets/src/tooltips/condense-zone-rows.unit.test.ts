import { describe, expect, test } from "bun:test"
import { condenseZoneRows, type ZoneRow } from "./condense-zone-rows"

function row(
  zoneName: string | undefined,
  mechanicName?: string | undefined,
  locationName?: string | undefined,
  parentZoneName?: string | undefined
): ZoneRow {
  return {
    zoneName,
    parentZoneName,
    mechanicName,
    mechanicNameClean: mechanicName,
    locationName,
  }
}

describe("condenseZoneRows", () => {
  test("keeps both zones when only the mechanic column is uniform", () => {
    const rows = condenseZoneRows([row("Fungal Grotto I", "M1"), row("Fungal Grotto II", "M1")])

    expect(rows.map((r) => r.zoneName)).toEqual(["Fungal Grotto I", "Fungal Grotto II"])
  })

  test("collapses rows identical in every column", () => {
    const rows = condenseZoneRows([
      row("Fungal Grotto I", "M1", "Ozara"),
      row("Fungal Grotto I", "M1", "Ozara"),
      row("Fungal Grotto I", "M1", "Ozara"),
    ])

    expect(rows).toHaveLength(1)
  })

  test("keeps a repeated zone that carries a different mechanic", () => {
    const rows = condenseZoneRows([row("Fungal Grotto I", "M1"), row("Fungal Grotto I", "M2")])

    expect(rows.map((r) => r.mechanicName)).toEqual(["M1", "M2"])
  })

  test("keeps a repeated zone and mechanic that carry different bosses", () => {
    const rows = condenseZoneRows([
      row("Fungal Grotto I", "M1", "Ozara"),
      row("Fungal Grotto I", "M1", "Foo"),
    ])

    expect(rows.map((r) => r.locationName)).toEqual(["Ozara", "Foo"])
  })

  test("keeps every column of a surviving row together", () => {
    const rows = condenseZoneRows([
      { ...row("Fungal Grotto I", "M1", "Ozara", "Stonefalls"), mechanicNameClean: "M1clean" },
      { ...row("Fungal Grotto I", "M1", "Ozara", "Stonefalls"), mechanicNameClean: "M1clean" },
    ])

    expect(rows).toHaveLength(1)
    expect(rows[0]?.parentZoneName).toBe("Stonefalls")
    expect(rows[0]?.mechanicNameClean).toBe("M1clean")
  })

  test("preserves first-occurrence order", () => {
    const rows = condenseZoneRows([
      row("Zone C", "M1"),
      row("Zone A", "M1"),
      row("Zone C", "M1"),
      row("Zone B", "M1"),
    ])

    expect(rows.map((r) => r.zoneName)).toEqual(["Zone C", "Zone A", "Zone B"])
  })

  test("keeps a zone whose mechanic and boss are both absent", () => {
    const rows = condenseZoneRows([row("Fungal Grotto I"), row("Fungal Grotto II")])

    expect(rows).toHaveLength(2)
  })

  test("returns nothing for no rows", () => {
    expect(condenseZoneRows([])).toEqual([])
  })
})
