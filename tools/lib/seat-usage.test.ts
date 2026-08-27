import { describe, expect, test } from "bun:test"
import { usageIn } from "./seat-usage.ts"

const WHOLE = {
  session_id: "aa41edcc-6865-4ac5-b930-f5d604f2ef56",
  model: { id: "claude-opus-5[1m]", display_name: "Opus 5 (1M context)" },
  context_window: { total_input_tokens: 165900, context_window_size: 1000000 },
  cost: { total_cost_usd: 160.5, total_duration_ms: 25486933 },
}

describe("what a client's reading becomes", () => {
  test("the three figures a seat keeps are taken from where the client nests them", () => {
    expect(usageIn(WHOLE)).toEqual({
      model: "claude-opus-5[1m]",
      contextTokens: "165900",
      costUsd: "160.5",
    })
  })

  test("a number becomes its own spelling, because a seat record holds text", () => {
    expect(usageIn({ context_window: { total_input_tokens: 0 } }).contextTokens).toBe("0")
  })

  test("a figure the client left out lands nothing rather than an empty one", () => {
    expect(usageIn({ model: { id: "claude-opus-5" } })).toEqual({
      model: "claude-opus-5",
      contextTokens: null,
      costUsd: null,
    })
  })

  test("a figure the client spelled as something other than a number is left alone", () => {
    expect(usageIn({ cost: { total_cost_usd: null }, model: { id: 4 } })).toEqual({
      model: "4",
      contextTokens: null,
      costUsd: null,
    })
  })

  test("an infinite figure is no figure, a window it could not measure reading as absent", () => {
    expect(usageIn({ cost: { total_cost_usd: Number.POSITIVE_INFINITY } }).costUsd).toBeNull()
  })

  test("a payload of the wrong shape reads as nothing rather than throwing", () => {
    expect(usageIn("not an object")).toEqual({ model: null, contextTokens: null, costUsd: null })
    expect(usageIn(null)).toEqual({ model: null, contextTokens: null, costUsd: null })
    expect(usageIn([1, 2])).toEqual({ model: null, contextTokens: null, costUsd: null })
  })

  test("a nested value of the wrong shape reads as nothing", () => {
    expect(usageIn({ model: "claude-opus-5" }).model).toBeNull()
    expect(usageIn({ context_window: [165900] }).contextTokens).toBeNull()
  })
})
