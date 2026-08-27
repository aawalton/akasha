import { asLam } from "./casts"
import type { AddonListData, Lam, Lamcc, LamWidgetData } from "./types"

export const wm = WINDOW_MANAGER
export const em = EVENT_MANAGER
export const sm = SCENE_MANAGER
export const cm = CALLBACK_MANAGER

export const lam: Lam = asLam({
  widgets: {},
  util: {},
  controlsForReload: [],
})

export const widgets = lam.widgets
export const controlsForReload = lam.controlsForReload

export const lamcc: Lamcc = { scrollCount: 0 }

export const addonsForList: AddonListData[] = []
export const addonToOptionsMap: Record<string, LamWidgetData[]> = {}
export const optionsState: Record<string, number> = {}

export function registerWidget(this: void, widgetType: string, widgetVersion: number): boolean {
  const existing = widgets[widgetType]
  if (existing !== undefined && existing >= widgetVersion) {
    return false
  }
  widgets[widgetType] = widgetVersion
  return true
}

function registerWidgetMethod(this: Lam, widgetType: string, widgetVersion: number): boolean {
  return registerWidget(widgetType, widgetVersion)
}
lam.RegisterWidget = registerWidgetMethod
