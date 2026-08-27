import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperTargetScope } from "./temper-target-scope.ts"

const SCOPE_SINGLE = "00000000-0000-0000-0000-00000000f001"
const SCOPE_CONE = "00000000-0000-0000-0000-00000000f002"
const SCOPE_AREA = "00000000-0000-0000-0000-00000000f003"
const SCOPE_LINE = "00000000-0000-0000-0000-00000000f004"

const single = Page({
  id: SCOPE_SINGLE,
  title: "Single",
  key: "single",
})

const cone = Page({
  id: SCOPE_CONE,
  title: "Cone",
  key: "cone",
})

const area = Page({
  id: SCOPE_AREA,
  title: "Area",
  key: "area",
})

const line = Page({
  id: SCOPE_LINE,
  title: "Line",
  key: "line",
})

describe("generateTemperTargetScope", () => {
  test("emits scopes in legacy authoring precedence regardless of input order", () => {
    const out = generateTemperTargetScope([line, area, cone, single])
    const idxSingle = out.indexOf('"single"')
    const idxCone = out.indexOf('"cone"')
    const idxArea = out.indexOf('"area"')
    const idxLine = out.indexOf('"line"')
    expect(idxSingle).toBeGreaterThan(-1)
    expect(idxCone).toBeGreaterThan(idxSingle)
    expect(idxArea).toBeGreaterThan(idxCone)
    expect(idxLine).toBeGreaterThan(idxArea)
  })

  test("emits each entry as a record value matching the consumer shape", () => {
    const out = generateTemperTargetScope([single])
    expect(out).toContain('"single": { id: "single", name: "Single" },')
  })

  test("emits a satisfies clause against TargetScopeTemplate", () => {
    const out = generateTemperTargetScope([single])
    expect(out).toContain("} as const satisfies Record<string, TargetScopeTemplate>")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000f0ff",
      title: null,
      key: "single",
    })
    expect(() => generateTemperTargetScope([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000f0fe",
      title: "Single",
    })
    expect(() => generateTemperTargetScope([broken])).toThrow()
  })
})
