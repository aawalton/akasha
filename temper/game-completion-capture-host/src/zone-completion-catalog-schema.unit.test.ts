import { describe, expect, test } from "bun:test"
import { zoneCompletionCatalogSchema } from "./zone-completion-catalog-schema"

describe("zoneCompletionCatalogSchema", () => {
  test("parses zones → completion types → activities", () => {
    const raw = {
      3: {
        name: "Glenumbra",
        completionTypes: {
          5: {
            activities: {
              1: { name: "Bad Man's Hollow", activityId: 1234 },
              2: { name: "Hag Fen", activityId: 5678 },
            },
          },
        },
      },
    }
    const parsed = zoneCompletionCatalogSchema.parse(raw)
    expect(parsed[3]?.name).toBe("Glenumbra")
    expect(parsed[3]?.completionTypes[5]?.activities[2]?.activityId).toBe(5678)
  })

  test("rejects an unknown key on an activity entry (.strict())", () => {
    const raw = {
      3: {
        name: "Glenumbra",
        completionTypes: {
          5: { activities: { 1: { name: "Bad Man's Hollow", activityId: 1234, extra: "nope" } } },
        },
      },
    }
    expect(() => zoneCompletionCatalogSchema.parse(raw)).toThrow()
  })
})
