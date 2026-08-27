import { asLib } from "./casts-1a"

export const lib: Lib = asLib(ZO_CallbackObject.New())

let g_contextMenu: ContextMenuObject | undefined

export function getContextMenu(this: void): ContextMenuObject | undefined {
  return g_contextMenu
}

export function setContextMenu(this: void, contextMenu: ContextMenuObject | undefined): undefined {
  g_contextMenu = contextMenu
}
