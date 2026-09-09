import "../../addon-library-types/lib-addon-menu/lib-addon-menu.type-declaration.d.ts"

import type { HudComponentRecord } from "akasha/temper/hud-components/hud-component-record/hud-component-record.module.code.ts"
import { HUD_SCENE_CATALOG } from "akasha/temper/hud-components/hud-scene-catalog/hud-scene-catalog.module.code.ts"
import { header } from "akasha/temper/settings-panel/header/header.module.code.ts"
import { registerPanel } from "akasha/temper/settings-panel/register-panel/register-panel.module.code.ts"
import {
  defaultComponentVisible,
  isComponentVisible,
  setComponentVisiblePersistent,
} from "../hud-addon-hide-init/hud-addon-hide-init.module.code.ts"

const PANEL_ID = "TemperHudOptions"

function groupByCategory(this: void): {
  order: readonly string[]
  groups: Record<string, readonly HudComponentRecord[]>
} {
  const order: string[] = []
  const groups: Record<string, HudComponentRecord[]> = {}
  for (const record of HUD_SCENE_CATALOG) {
    const existing = groups[record.category]
    if (existing === undefined) {
      groups[record.category] = [record]
      order.push(record.category)
    } else {
      existing.push(record)
    }
  }
  return { order, groups }
}

function buildControls(this: void): readonly LamControlData[] {
  const controls: LamControlData[] = [
    {
      type: "description",
      text: "Show or hide any main-scene HUD component. On = shown, Off = hidden. Components turned off stay hidden across scene changes, combat, and /reloadui.",
    },
  ]
  const { order, groups } = groupByCategory()
  for (const category of order) {
    const records = groups[category]
    if (records === undefined) continue
    controls.push(header(category))
    for (const record of records) {
      const id = record.id
      controls.push({
        type: "checkbox",
        name: record.name,
        tooltip: `${record.esoGlobal} (${record.hideMechanism}) — on = shown, off = hidden`,
        getFunc: () => isComponentVisible(id),
        setFunc: (value) => setComponentVisiblePersistent(id, value),
        default: defaultComponentVisible(id),
      })
    }
  }
  return controls
}

export function initializeSettingsPanel(this: void): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: "Temper HUD",
    slashCommand: "/temperhud",
    registerForRefresh: true,
    registerForDefaults: true,
  }
  registerPanel(LibAddonMenu2, PANEL_ID, panelData, [...buildControls()])
  return undefined
}
