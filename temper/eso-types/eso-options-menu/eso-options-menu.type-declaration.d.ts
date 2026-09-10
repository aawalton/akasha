interface KeyboardOptionsObject {
  currentPanelId: number
  panelNames: Record<number, unknown>
  controlTable: Record<number, unknown>
  ApplySettings: (this: KeyboardOptionsObject) => void
  ChangePanels: (this: KeyboardOptionsObject, panelId: number) => void
}

declare const KEYBOARD_OPTIONS: KeyboardOptionsObject

interface ZoOptionsTreeNode {
  GetChildren: (this: ZoOptionsTreeNode) => ZoOptionsTreeNode[] | undefined
  GetData: (this: ZoOptionsTreeNode) => { id?: number } | undefined
  GetTree: (this: ZoOptionsTreeNode) => {
    SelectNode: (this: unknown, node: ZoOptionsTreeNode) => void
  }
}

interface ZoGameMenuHeader {
  GetChildren: (this: ZoGameMenuHeader) => ZoOptionsTreeNode[] | undefined
}

interface ZoGameMenuInGame {
  gameMenu: {
    headerControls: Record<string, ZoGameMenuHeader | undefined>
    navigationTree: Record<string, unknown>
  }
}

declare const ZO_GameMenu_InGame: ZoGameMenuInGame

declare const ZO_Options_OnMouseEnter: (this: void, control: Control) => undefined
