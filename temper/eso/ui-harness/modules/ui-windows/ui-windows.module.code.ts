import { readFileSync } from "node:fs"
import { join } from "node:path"
import {
  filesUnder,
  MARKUP_TAIL,
  MARKUP_UNDER,
} from "akasha/temper/eso/ui-harness/modules/ui-staging/ui-staging.module.code.ts"

export type UiWindow = {
  readonly slug: string
  readonly addon: string
  readonly savedVariables: readonly string[]
  readonly shows: readonly string[]
  readonly control: string
  readonly opens: string
}

const CHARACTERS_WINDOW =
  "temper.addon.pages.characters.modules.characters-window.characters-window.module.code"

const SKILL_POINTS = "temper.player.character.skill.skill-point-finder.modules"

const CRAFTING = "temper.addon.pages.items.crafting-station.modules"

const LOREBOOKS = "temper.catalog.world.lorebook.modules"

const CRAFTING_OPENS = `
  local api = __bundle_require("${CRAFTING}.crafting-public-api.crafting-public-api.module.code")
    .TEMPER_ITEMS_CRAFTING_API
`

function ownWindow(slug: string, addon: string, control: string, opens: string): UiWindow {
  return { slug, addon, savedVariables: [addon], shows: [], control, opens }
}

const OWN_WINDOWS: readonly UiWindow[] = [
  ownWindow("combat-report", "TemperCombat", "TemperCombat_Report", "TemperCombat_Report:Toggle()"),
  ownWindow(
    "combat-live-report",
    "TemperCombat",
    "TemperCombat_LiveReport",
    'SCENE_MANAGER:Show("hud")'
  ),
  ownWindow(
    "skill-point-finder",
    "TemperCharacters",
    "TemperCharactersSkillPointFinder_GUI",
    `
      __bundle_require("${SKILL_POINTS}.skill-point-finder-window.skill-point-finder-window.module.code")
        .toggleWindow()
    `
  ),
  ownWindow(
    "potion-maker",
    "TemperItems",
    "TemperPotionsTopLevel",
    `
      local potions = __bundle_require("${CRAFTING}.potion-state.potion-state.module.code").PotMaker
      SCENE_MANAGER:Show(potions.name)
    `
  ),
  ownWindow("crafting-button", "TemperItems", "TemperItemsCrafting_ButtonFrame", ""),
  ownWindow(
    "crafting-styles",
    "TemperItems",
    "TemperItemsCrafting_Style_Window",
    `${CRAFTING_OPENS} api.SetAllStyles()`
  ),
  ownWindow(
    "crafting-runes",
    "TemperItems",
    "TemperItemsCrafting_Rune",
    `${CRAFTING_OPENS} api.RuneView(1)`
  ),
  ownWindow(
    "crafting-recipes",
    "TemperItems",
    "TemperItemsCrafting_Recipe_Window",
    `${CRAFTING_OPENS}
      api.ControlShow(TemperItemsCrafting_Recipe_Window)
      api.RecipeShowCategory(api.Character.recipe)
    `
  ),
  ownWindow(
    "crafting-blueprints",
    "TemperItems",
    "TemperItemsCrafting_Blueprint_Window",
    `${CRAFTING_OPENS}
      api.ControlShow(TemperItemsCrafting_Blueprint_Window)
      api.BlueprintShowCategory(api.Character.furniture)
    `
  ),
  ownWindow(
    "crafting-cook",
    "TemperItems",
    "TemperItemsCrafting_Cook",
    `${CRAFTING_OPENS}
      SCENE_MANAGER:Show("provisioner")
      __ui_raise(EVENT_CRAFTING_STATION_INTERACT, CRAFTING_TYPE_PROVISIONING)
    `
  ),
  ownWindow(
    "set-search",
    "TemperItems",
    "TemperItemsCraftingSets_SearchUI_TLC_Keyboard",
    'SLASH_COMMANDS["/lss"]("")'
  ),
  ownWindow(
    "antiquity-leads",
    "TemperWorld",
    "TemperLeadsMainWindow",
    'SLASH_COMMANDS["/temperleads"]()'
  ),
  ownWindow(
    "world-journal",
    "TemperWorld",
    "TemperWorldJournalFrame",
    'SLASH_COMMANDS["/itembrowser"]()'
  ),
  ownWindow(
    "lore-books-report",
    "TemperWorld",
    "TemperWorldLoreBooksReport",
    `
      SCENE_MANAGER:Show("loreLibrary")
      local keys = __bundle_require("${LOREBOOKS}.lorebooks-report-state.lorebooks-report-state.module.code")
        .REPORT_STATE.loreLibraryReportKeybind
      keys[1].callback()
      keys[2].callback()
    `
  ),
]

const WINDOWS: readonly UiWindow[] = [
  ...OWN_WINDOWS,
  {
    slug: "characters-window",
    addon: "TemperCharacters",
    savedVariables: ["TemperCharacters"],
    shows: [],
    control: "TemperWindow",
    opens: `__bundle_require("${CHARACTERS_WINDOW}").toggleWindow()`,
  },
  {
    slug: "inventory-browser",
    addon: "TemperItems",
    savedVariables: ["TemperItems"],
    shows: ["ZO_SharedRightPanelBackground", "ZO_PlayerInventory"],
    control: "TemperItemsBrowser",
    opens: 'SCENE_MANAGER:Show("inventory")',
  },
]

export function uiWindowSlugs(): readonly string[] {
  return WINDOWS.map((one) => one.slug)
}

export function uiWindowNamed(slug: string): UiWindow | undefined {
  return WINDOWS.find((one) => one.slug === slug)
}

const TOP_LEVEL = /<TopLevelControl\b[^>]*>/g

const NAMED = /\bname="([^"]+)"/

const VIRTUAL = /\bvirtual="true"/

export function windowsDeclaredOutright(markup: readonly string[]): readonly string[] {
  const found: string[] = []
  for (const document of markup) {
    for (const [element] of document.matchAll(TOP_LEVEL)) {
      if (VIRTUAL.test(element)) continue
      const name = NAMED.exec(element)?.[1]
      if (name !== undefined) found.push(name)
    }
  }
  return found
}

export function windowsDeclaredIn(root: string): readonly string[] {
  const at = filesUnder(join(root, MARKUP_UNDER), MARKUP_TAIL)
  return windowsDeclaredOutright(at.map((one) => readFileSync(one, "utf8")))
}
