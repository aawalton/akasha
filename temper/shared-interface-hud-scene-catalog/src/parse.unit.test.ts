import { describe, expect, test } from "bun:test"
import { buildCatalog } from "./parse"
import { type HudComponentRecord, HudSceneCatalogSchema } from "./schema"

const FIXTURE = `
function ZO_HUDFragment:UpdateVisibility()
    if self:GetState() == SCENE_FRAGMENT_HIDDEN then
        return
    end

    local fragmentHidden = not self:IsShowing()
    local playerDead = IsUnitDead("player")
    local hiddenOrDead = fragmentHidden or playerDead

    COMPASS_FRAME:SetCompassHidden(playerDead)
    INSTANCE_KICK_WARNING_DEAD:SetHiddenForReason("hudScene", fragmentHidden)
    if GAMEPAD_CHAT_SYSTEM:ShouldOnlyShowOnHUD() then
        GAMEPAD_CHAT_SYSTEM:RefreshVisibility()
    end
    SetFloatingMarkerGlobalAlpha(hiddenOrDead and 0 or 1)
    RETICLE:RequestHidden(hiddenOrDead)
    NEW_MYSTERY_METER:SetHiddenForReason("hudScene", hiddenOrDead)
end

function ZO_HUDFragment:Show()
    self:UpdateVisibility()
end

local HUD_FRAGMENT_GROUP =
{
    DEATH_RECAP_FRAGMENT,
    ACTION_BAR_FRAGMENT,
    ZONE_STORY_TRACKER_FRAGMENT,
}

function ZO_HUDScene:New()
    local scene = ZO_Scene.New(self, "hud", SCENE_MANAGER)
    scene:AddFragment(RETICLE_MODE_FRAGMENT)
    if ZO_IsForceConsoleFlow() and not IsGameCoreUI() then
        scene:AddFragment(FORCE_CONSOLE_WARNING_FRAGMENT)
    end
    scene:AddFragmentGroup(HUD_FRAGMENT_GROUP)
    return scene
end
HUD_SCENE = ZO_HUDScene:New()

function ZO_HUDUIScene:New()
    local scene = ZO_Scene.New(self, "hudui", SCENE_MANAGER)
    scene:AddFragment(MOUSE_UI_MODE_FRAGMENT)
    if ZO_IsForceConsoleFlow() and not IsGameCoreUI() then
        scene:AddFragment(FORCE_CONSOLE_WARNING_FRAGMENT)
    end
    scene:AddFragmentGroup(HUD_FRAGMENT_GROUP)
    return scene
end
HUD_UI_SCENE = ZO_HUDUIScene:New()

LOOT_SCENE:AddFragmentGroup(FRAGMENT_GROUP.MOUSE_DRIVEN_UI_WINDOW_NO_COMBAT_OVERLAY)
LOOT_SCENE:AddFragment(LOOT_WINDOW_FRAGMENT)
LOOT_SCENE:AddFragmentGroup(HUD_FRAGMENT_GROUP)
LOOT_SCENE:AddFragment(ZONE_STORY_TRACKER_FRAGMENT)
`

const FILE = "esoui/ingame/scenes/hudscene.lua"

function catalog(): readonly HudComponentRecord[] {
  return buildCatalog(FIXTURE, FILE)
}

function byGlobal(esoGlobal: string): HudComponentRecord {
  const rec = catalog().find((r) => r.esoGlobal === esoGlobal)
  if (rec === undefined) throw new Error(`expected a record for ${esoGlobal}`)
  return rec
}

describe("buildCatalog", () => {
  test("every record validates against the catalog schema", () => {
    expect(() => HudSceneCatalogSchema.parse(catalog())).not.toThrow()
  })

  test("counts fragments and controls from the fixture", () => {
    const recs = catalog()
    const fragments = recs.filter((r) => r.kind === "fragment")
    const controls = recs.filter((r) => r.kind === "non-fragment-control")
    expect(fragments).toHaveLength(7)
    expect(controls).toHaveLength(6)
  })

  test("group fragments belong to all three HUD scenes via fragment-group", () => {
    const action = byGlobal("ACTION_BAR_FRAGMENT")
    expect(action.kind).toBe("fragment")
    expect(action.hideMechanism).toBe("fragment-group")
    expect(action.scenes).toEqual(["hud", "hudui", "loot"])
    expect(action.name).toBe("Action bar")
    expect(action.id).toBe("action-bar-fragment")
  })

  test("a group member re-added in the loot section is deduped, not doubled", () => {
    const matches = catalog().filter((r) => r.esoGlobal === "ZONE_STORY_TRACKER_FRAGMENT")
    expect(matches).toHaveLength(1)
    expect(matches[0]?.hideMechanism).toBe("fragment-group")
    expect(matches[0]?.scenes).toEqual(["hud", "hudui", "loot"])
  })

  test("per-scene extras carry their own scene and mechanism", () => {
    expect(byGlobal("RETICLE_MODE_FRAGMENT").scenes).toEqual(["hud"])
    expect(byGlobal("RETICLE_MODE_FRAGMENT").hideMechanism).toBe("scene-fragment")
    expect(byGlobal("MOUSE_UI_MODE_FRAGMENT").scenes).toEqual(["hudui"])
    expect(byGlobal("LOOT_WINDOW_FRAGMENT").scenes).toEqual(["loot"])
  })

  test("a conditional extra added in two scenes merges scenes and flags conditional", () => {
    const force = byGlobal("FORCE_CONSOLE_WARNING_FRAGMENT")
    expect(force.scenes).toEqual(["hud", "hudui"])
    expect(force.conditional).toBe(true)
  })

  test("non-fragment controls record their exact ESO hide mechanism", () => {
    expect(byGlobal("COMPASS_FRAME").hideMechanism).toBe("SetCompassHidden")
    expect(byGlobal("INSTANCE_KICK_WARNING_DEAD").hideMechanism).toBe("SetHiddenForReason")
    expect(byGlobal("RETICLE").hideMechanism).toBe("RequestHidden")
    expect(byGlobal("RETICLE").kind).toBe("non-fragment-control")
  })

  test("a conditional control refresh is flagged conditional", () => {
    expect(byGlobal("GAMEPAD_CHAT_SYSTEM").hideMechanism).toBe("RefreshVisibility")
    expect(byGlobal("GAMEPAD_CHAT_SYSTEM").conditional).toBe(true)
  })

  test("floating markers surface as a synthetic global-effect control", () => {
    const markers = byGlobal("FLOATING_MARKERS")
    expect(markers.hideMechanism).toBe("SetFloatingMarkerGlobalAlpha")
    expect(markers.kind).toBe("non-fragment-control")
  })

  test("an unknown global is kept, humanized, and tagged uncategorized (never dropped)", () => {
    const mystery = byGlobal("NEW_MYSTERY_METER")
    expect(mystery.name).toBe("New mystery meter")
    expect(mystery.category).toBe("uncategorized")
  })

  test("source provenance points at a positive 1-indexed line", () => {
    expect(byGlobal("ACTION_BAR_FRAGMENT").source.file).toBe(FILE)
    expect(byGlobal("ACTION_BAR_FRAGMENT").source.line).toBeGreaterThan(0)
  })

  test("output is deterministic and orders fragments before controls", () => {
    expect(catalog()).toEqual(buildCatalog(FIXTURE, FILE))
    const recs = catalog()
    const firstControl = recs.findIndex((r) => r.kind === "non-fragment-control")
    const lastFragment = recs.map((r) => r.kind).lastIndexOf("fragment")
    expect(lastFragment).toBeLessThan(firstControl)
  })
})
