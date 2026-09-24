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

const ITEMS_REF =
  "temper.addon.pages.items.modules.inventory-saved-variables-ref.inventory-saved-variables-ref.module.code"

const ITEMS_BROWSER =
  "temper.addon.pages.items.modules.inventory-browser.inventory-browser.module.code"

const CHARACTERS_SAVED =
  "temper.player.completion.temper-player-completion.state.modules.completion-saved-variables.completion-saved-variables.module.code"

const CHARACTERS_WINDOW =
  "temper.addon.pages.characters.modules.characters-window.characters-window.module.code"

const WINDOWS: readonly UiWindow[] = [
  {
    slug: "characters-window",
    addon: "TemperCharacters",
    savedVariables: ["TemperCharacters"],
    shows: [],
    control: "TemperWindow",
    opens: `
      local saved = __bundle_require("${CHARACTERS_SAVED}")
      saved.initializeSavedVariables()
      local window = __bundle_require("${CHARACTERS_WINDOW}")
      window.toggleWindow()
    `,
  },
  {
    slug: "inventory-browser",
    addon: "TemperItems",
    savedVariables: ["TemperItems"],
    shows: ["ZO_SharedRightPanelBackground", "ZO_PlayerInventory"],
    control: "TemperItemsBrowser",
    opens: `
      local ref = __bundle_require("${ITEMS_REF}")
      ref.setSavedVarsInstance(__ui_account_wide(TemperInventory_SavedVariables))
      local browser = __bundle_require("${ITEMS_BROWSER}")
      browser.initializeInventoryBrowser()
      SCENE_MANAGER:Show("inventory")
    `,
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
