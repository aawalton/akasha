import { TEXT_PRIMARY, TEXT_SECONDARY } from "@akasha/design-tokens/text-color"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import { getSavedVariables } from "../saved-variables"
import { CreatePlaceholderPanel } from "./placeholder-panel"
export interface TabControl extends Control {
  label: LabelControl
  button: ButtonControl
}

export interface SubTabDefinition {
  id: string
  title: string
}

export interface TabDefinition {
  id: string
  title: string
  subTabs: SubTabDefinition[]
}

export const TAB_HEIGHT = 32
export const TAB_SPACING = 45
export const SUB_TAB_INDENT = 20
export const SUB_TAB_SPACING = 35
export const TAB_WIDTH = 220

export const TABS: TabDefinition[] = [
  {
    id: "character",
    title: "Character",
    subTabs: [
      { id: "character-character", title: "Character" },
      { id: "character-equipment", title: "Equipment" },
      { id: "character-skills", title: "Skills" },
      { id: "character-cp", title: "CP" },
      { id: "character-stats", title: "Stats" },
    ],
  },
]

export const topTabControls: Record<string, TabControl> = {}
export const subTabControls: Record<string, Record<string, TabControl>> = {}
export const subTabPanels: Record<string, Control> = {}
export let selectedTabId: string | undefined
export let selectedSubTabId: string | undefined
export let tabContainer: Control | undefined
export let contentContainer: Control | undefined

export const externalRefreshers: Record<string, () => void> = {}

export function UpdateTabPositions(): undefined {
  if (!tabContainer) return

  let offsetY = 0

  for (const tabDef of TABS) {
    const topTab = topTabControls[tabDef.id]
    if (!topTab) continue

    topTab.ClearAnchors()
    topTab.SetAnchor(TOPLEFT, tabContainer, TOPLEFT, 0, offsetY)
    offsetY = offsetY + TAB_SPACING

    const isSelected = tabDef.id === selectedTabId
    const subControls = subTabControls[tabDef.id]
    if (subControls !== undefined) {
      for (const subDef of tabDef.subTabs) {
        const subTab = subControls[subDef.id]
        if (!subTab) continue

        if (isSelected) {
          subTab.SetHidden(false)
          subTab.ClearAnchors()
          subTab.SetAnchor(TOPLEFT, tabContainer, TOPLEFT, SUB_TAB_INDENT, offsetY)
          offsetY = offsetY + SUB_TAB_SPACING
        } else {
          subTab.SetHidden(true)
        }
      }
    }
  }
}

export function SelectSubTab(parentTabId: string, subTabId: string): undefined {
  selectedSubTabId = subTabId

  const savedVars = getSavedVariables()
  savedVars.navigation.selectedSubTab = subTabId

  const subControls = subTabControls[parentTabId]
  if (subControls !== undefined) {
    for (const [id, subTab] of Object.entries(subControls)) {
      const isSelected = id === subTabId
      const c = isSelected ? TEXT_PRIMARY : TEXT_SECONDARY
      subTab.label.SetColor(c[0], c[1], c[2], 1)
    }
  }

  for (const [id, panel] of Object.entries(subTabPanels)) {
    panel.SetHidden(id !== subTabId)
  }

  RefreshActivePanel()
}

export function RefreshActivePanel(): undefined {
  if (selectedSubTabId === undefined) return
  const refresher = externalRefreshers[selectedSubTabId]
  if (refresher !== undefined) {
    refresher()
  }
}

export function SelectTopTab(tabId: string, subTabId?: string): undefined {
  selectedTabId = tabId

  const savedVars = getSavedVariables()
  savedVars.navigation.selectedTab = tabId

  for (const [id, tab] of Object.entries(topTabControls)) {
    const isSelected = id === tabId
    const c = isSelected ? TEXT_PRIMARY : TEXT_SECONDARY
    tab.label.SetColor(c[0], c[1], c[2], 1)
  }

  UpdateTabPositions()

  const tabDef = TABS.find((t) => t.id === tabId)
  if (!tabDef) return

  let targetSubTab = subTabId
  if (targetSubTab === undefined || !tabDef.subTabs.find((s) => s.id === targetSubTab)) {
    targetSubTab = requireFirst(tabDef.subTabs, "tabDef.subTabs").id
  }

  SelectSubTab(tabId, targetSubTab)
}

export function CreateSubTab(
  parent: Control,
  subDef: SubTabDefinition,
  parentTabId: string
): TabControl {
  const base = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  base.SetDimensions(TAB_WIDTH - SUB_TAB_INDENT, TAB_HEIGHT)
  base.SetAnchor(TOPLEFT, parent, TOPLEFT, SUB_TAB_INDENT, 0)
  base.SetHidden(true)

  const label = WINDOW_MANAGER.CreateControl(undefined, base, CT_LABEL)
  label.SetAnchor(TOPLEFT, base, TOPLEFT, 0, 0)
  label.SetFont("ZoFontWinH3")
  label.SetText(string.upper(subDef.title))
  label.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)

  const button = WINDOW_MANAGER.CreateControl(undefined, base, CT_BUTTON)
  button.SetAnchorFill()
  button.SetHandler("OnClicked", () => {
    SelectSubTab(parentTabId, subDef.id)
  })
  button.SetHandler("OnMouseEnter", () => {
    if (selectedSubTabId !== subDef.id) {
      label.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    }
  })
  button.SetHandler("OnMouseExit", () => {
    if (selectedSubTabId !== subDef.id) {
      label.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
    }
  })

  const tab: TabControl = Object.assign(base, { label, button })
  return tab
}

export function CreateTab(parent: Control, offsetY: number, tabDef: TabDefinition): TabControl {
  const base = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  base.SetDimensions(TAB_WIDTH, TAB_HEIGHT)
  base.SetAnchor(TOPLEFT, parent, TOPLEFT, 0, offsetY)

  const label = WINDOW_MANAGER.CreateControl(undefined, base, CT_LABEL)
  label.SetAnchor(TOPLEFT, base, TOPLEFT, 0, 0)
  label.SetFont("ZoFontWinH2")
  label.SetText(string.upper(tabDef.title))
  label.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)

  const button = WINDOW_MANAGER.CreateControl(undefined, base, CT_BUTTON)
  button.SetAnchorFill()
  button.SetHandler("OnClicked", () => {
    SelectTopTab(tabDef.id)
  })
  button.SetHandler("OnMouseEnter", () => {
    if (selectedTabId !== tabDef.id) {
      label.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    }
  })
  button.SetHandler("OnMouseExit", () => {
    if (selectedTabId !== tabDef.id) {
      label.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
    }
  })

  const tab: TabControl = Object.assign(base, { label, button })
  return tab
}

export function InitializeTabs(container: Control, content: Control): undefined {
  tabContainer = container
  contentContainer = content
  let offsetY = 0

  for (const tabDef of TABS) {
    const tab = CreateTab(container, offsetY, tabDef)
    topTabControls[tabDef.id] = tab
    offsetY = offsetY + TAB_SPACING

    const subControls: Record<string, TabControl> = {}
    subTabControls[tabDef.id] = subControls
    for (const subDef of tabDef.subTabs) {
      const subTab = CreateSubTab(container, subDef, tabDef.id)
      subControls[subDef.id] = subTab

      const panel = CreatePlaceholderPanel(content)
      subTabPanels[subDef.id] = panel
    }
  }

  const savedVars = getSavedVariables()
  const initialTab = savedVars.navigation.selectedTab ?? requireFirst(TABS, "TABS").id
  const initialSubTab = savedVars.navigation.selectedSubTab ?? undefined
  SelectTopTab(initialTab, initialSubTab)
}

export function RegisterExternalTab(
  tabDef: TabDefinition,
  creators: Record<string, (container: Control) => Control>,
  refreshers: Record<string, () => void>
): undefined {
  if (!tabContainer || !contentContainer) return

  TABS.push(tabDef)

  const tab = CreateTab(tabContainer, 0, tabDef)
  topTabControls[tabDef.id] = tab

  const subControls: Record<string, TabControl> = {}
  subTabControls[tabDef.id] = subControls
  for (const subDef of tabDef.subTabs) {
    const subTab = CreateSubTab(tabContainer, subDef, tabDef.id)
    subControls[subDef.id] = subTab

    const creator = creators[subDef.id]
    if (creator !== undefined) {
      const panel = creator(contentContainer)
      subTabPanels[subDef.id] = panel
    } else {
      const panel = CreatePlaceholderPanel(contentContainer)
      subTabPanels[subDef.id] = panel
    }
  }

  for (const [id, refresher] of Object.entries(refreshers)) {
    externalRefreshers[id] = refresher
  }

  UpdateTabPositions()

  if (selectedTabId !== undefined) {
    SelectTopTab(selectedTabId, selectedSubTabId)
  }
}

export const TabManager = {
  InitializeTabs,
  SelectTopTab,
  SelectSubTab,
  RefreshActivePanel,
  RegisterExternalTab,
}
