import { HUD_SCENE_CATALOG } from "@temper/shared-interface-hud-scene-catalog/generated/hud-scene-catalog.generated"
import type { HudComponentRecord } from "@temper/shared-interface-hud-scene-catalog/schema"
import { header } from "@temper/shared-interface-lam/header"
import { registerPanel } from "@temper/shared-interface-lam/register-panel"
import {
  defaultComponentVisible,
  isComponentVisible,
  setComponentVisiblePersistent,
} from "./hide-init"

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
