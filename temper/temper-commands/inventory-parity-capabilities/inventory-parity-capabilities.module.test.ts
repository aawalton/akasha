import { describe, expect, test } from "bun:test"
import {
  parityAddonTrace,
  parityNarrow,
  parityRouting,
} from "./inventory-parity-capabilities.module.code.ts"

describe("parityAddonTrace", () => {
  test("hands over reading a trace off addon content", async () => {
    const held = await parityAddonTrace()
    expect(typeof held.loadParityAddonTraceFromContent).toBe("function")
  })
})

describe("parityRouting", () => {
  test("hands over matching, comparing and rendering a route", async () => {
    const held = await parityRouting()
    expect(typeof held.matchedRouteFrom).toBe("function")
    expect(typeof held.computeRoutingDiff).toBe("function")
    expect(typeof held.renderRoutingSection).toBe("function")
  })
})

describe("parityNarrow", () => {
  test("hands over narrowing a value nothing is left of", async () => {
    const held = await parityNarrow()
    expect(typeof held.assertNever).toBe("function")
  })
})
