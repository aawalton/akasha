import { describe, expect, test } from "bun:test"
import {
  parityAddonTrace,
  parityRouting,
} from "akasha/temper/command/modules/inventory-parity-capabilities/inventory-parity-capabilities.module.code.ts"

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
