import { describe, expect, test } from "bun:test"
import { cadwellCatalogSchema } from "./cadwell-catalog-schema"

describe("cadwellCatalogSchema", () => {
  test("parses progression levels (including key 0) → zones → pois", () => {
    const raw = {
      0: {
        zones: {
          1: {
            name: "Glenumbra",
            order: 1,
            pois: {
              1: { name: "Cath Bedraud", order: 1 },
              2: { name: "Aldcroft", order: 2 },
            },
          },
        },
      },
    }
    const parsed = cadwellCatalogSchema.parse(raw)
    expect(parsed[0]?.zones[1]?.name).toBe("Glenumbra")
    expect(parsed[0]?.zones[1]?.pois[2]?.order).toBe(2)
  })

  test("rejects an unknown key on a POI entry (.strict())", () => {
    const raw = {
      0: {
        zones: {
          1: {
            name: "Glenumbra",
            order: 1,
            pois: { 1: { name: "Cath Bedraud", order: 1, extra: "nope" } },
          },
        },
      },
    }
    expect(() => cadwellCatalogSchema.parse(raw)).toThrow()
  })
})
