import { describe, expect, test } from "bun:test"
import { poiCatalogSchema } from "./poi-catalog-schema"

describe("poiCatalogSchema", () => {
  test("parses a zone with its POIs (numeric-string-keyed Lua tables)", () => {
    const raw = {
      3: {
        name: "Glenumbra",
        pois: {
          1: { name: "Red Rook Camp", poiType: 0 },
          2: { name: "Hag Fen", poiType: 0 },
        },
      },
    }
    const parsed = poiCatalogSchema.parse(raw)
    expect(parsed[3]?.name).toBe("Glenumbra")
    expect(parsed[3]?.pois[1]?.name).toBe("Red Rook Camp")
    expect(parsed[3]?.pois[2]?.poiType).toBe(0)
  })

  test("rejects an unknown key on a POI entry (.strict())", () => {
    const raw = {
      3: { name: "Glenumbra", pois: { 1: { name: "x", poiType: 0, extra: "nope" } } },
    }
    expect(() => poiCatalogSchema.parse(raw)).toThrow()
  })

  test("rejects an unknown key on a zone (.strict())", () => {
    const raw = {
      3: { name: "Glenumbra", pois: {}, extra: "nope" },
    }
    expect(() => poiCatalogSchema.parse(raw)).toThrow()
  })
})
