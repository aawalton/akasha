import { describe, expect, test } from "bun:test"
import type { HudComponentRecord } from "@temper/shared-interface-hud-scene-catalog/schema"
import { computeHidePlan, indexInventoryById } from "./hide-plan"
import type { HideRegistration } from "./hide-types"

const record = (
  id: string,
  kind: HudComponentRecord["kind"],
  hideMechanism: HudComponentRecord["hideMechanism"]
): HudComponentRecord => ({
  id,
  name: id,
  esoGlobal: id.toUpperCase(),
  kind,
  hideMechanism,
  scenes: ["hud"],
  category: "test",
  source: { file: "esoui/ingame/scenes/hudscene.lua", line: 1 },
  conditional: false,
  wrapsMultiple: false,
})

const registration = (id: string): HideRegistration => ({
  id,
  resolve: () => undefined,
  reason: "TemperHud",
})

describe("indexInventoryById", () => {
  test("keys each record by its id", () => {
    const a = record("a", "fragment", "fragment-group")
    const b = record("b", "non-fragment-control", "RequestHidden")
    const index = indexInventoryById([a, b])
    expect(index.a).toBe(a)
    expect(index.b).toBe(b)
    expect(Object.keys(index)).toHaveLength(2)
  })
})

describe("computeHidePlan", () => {
  const index = indexInventoryById([
    record("perf", "fragment", "fragment-group"),
    record("reticle", "non-fragment-control", "RequestHidden"),
  ])

  test("emits one entry per known registration, carrying reason + raw mechanism", () => {
    const plan = computeHidePlan(index, [registration("perf")], { perf: true })
    expect(plan).toHaveLength(1)
    expect(plan[0]).toEqual({
      id: "perf",
      reason: "TemperHud",
      hidden: true,
      mechanism: "fragment-group",
    })
  })

  test("the raw inventory mechanism flows through verbatim for the shell to dispatch", () => {
    const plan = computeHidePlan(index, [registration("reticle")], { reticle: true })
    expect(plan[0]?.mechanism).toBe("RequestHidden")
  })

  test("hidden reflects the hidden-set; absent id defaults to not hidden", () => {
    const plan = computeHidePlan(index, [registration("perf"), registration("reticle")], {
      perf: true,
    })
    const byId = Object.fromEntries(plan.map((e) => [e.id, e.hidden]))
    expect(byId.perf).toBe(true)
    expect(byId.reticle).toBe(false)
  })

  test("a registration with an id absent from the inventory is skipped", () => {
    const plan = computeHidePlan(index, [registration("not-a-real-component")], {})
    expect(plan).toHaveLength(0)
  })
})
