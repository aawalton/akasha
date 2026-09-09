import { describe, expect, test } from "bun:test"
import { buildCatalog } from "./hud-scene-parse.module.code.ts"

const SOURCE = `function ZO_HUDFragment:UpdateVisibility()
    COMPASS_FRAME:SetCompassHidden(true)
    local dead = IsUnitDead("player")
    if dead then
        RETICLE:RequestHidden(true)
    end
    SetFloatingMarkerGlobalAlpha(0)
end

function ZO_HUDFragment:Something()
end

HUD_FRAGMENT_GROUP = {
    DEATH_RECAP_FRAGMENT,
    ACTION_BAR_FRAGMENT,
}

function ZO_HUDScene:New()
    self:AddFragment(RETICLE_MODE_FRAGMENT)
end
HUD_SCENE = ZO_HUDScene:New()
`

const WALKED = buildCatalog(SOURCE, "hudscene.lua")

function found(esoGlobal: string) {
  return WALKED.find((one) => one.esoGlobal === esoGlobal)
}

describe("hud-scene-parse", () => {
  test("a name in the fragment group is a fragment of every scene", () => {
    expect(found("DEATH_RECAP_FRAGMENT")).toMatchObject({
      kind: "fragment",
      hideMechanism: "fragment-group",
      scenes: ["hud", "hudui", "loot"],
    })
  })

  test("a fragment the hud scene adds by itself is of that scene alone", () => {
    expect(found("RETICLE_MODE_FRAGMENT")).toMatchObject({
      kind: "fragment",
      hideMechanism: "scene-fragment",
      scenes: ["hud"],
    })
  })

  test("a control hidden by a method carries the method", () => {
    expect(found("COMPASS_FRAME")).toMatchObject({
      kind: "non-fragment-control",
      hideMechanism: "SetCompassHidden",
      conditional: false,
    })
  })

  test("a control hidden under a condition is marked conditional", () => {
    expect(found("RETICLE")?.conditional).toBe(true)
  })

  test("the floating marker alpha call is catalogued as its own control", () => {
    expect(found("FLOATING_MARKERS")).toMatchObject({
      kind: "non-fragment-control",
      hideMechanism: "SetFloatingMarkerGlobalAlpha",
    })
  })

  test("a name with no label is given a humanized name and no category", () => {
    expect(found("ACTION_BAR_FRAGMENT")?.name).toBe("Action bar")
    expect(found("RETICLE_MODE_FRAGMENT")?.category).toBe("mode")
  })

  test("the reading gives the fragments before the controls", () => {
    const kinds = WALKED.map((one) => one.kind)
    expect(kinds.lastIndexOf("fragment")).toBeLessThan(kinds.indexOf("non-fragment-control"))
  })

  test("a source naming nothing is walked to nothing", () => {
    expect(buildCatalog("-- nothing here\n", "hudscene.lua")).toEqual([])
  })
})
