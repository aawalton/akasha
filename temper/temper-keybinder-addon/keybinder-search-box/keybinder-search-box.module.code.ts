import { filterTextChanged } from "../keybinder-filter/keybinder-filter.module.code.ts"
import { KEYBINDER_STATE } from "../keybinder-state/keybinder-state.module.code.ts"

const GLASS = " |t40:40:/esoui/art/tutorial/gamepad/gp_inventory_trait_not_researched_icon.dds|t"

const EXPANDED_WIDTH = 264
const COLLAPSED_WIDTH = 64
const FIELD_HEIGHT = 31
const PANEL_ANCHOR_OFFSET_X = 74
const PANEL_ANCHOR_OFFSET_Y = 38
const CLOSE_BUTTON_SIZE = 16
const EDGE_TEXTURE_CELL = 32
const EDGE_TEXTURE_SLICE = 4

function setDefaultText(this: void, control: EditControl, text: string): undefined {
  control.SetDefaultText(text)
}

export function setupControl(this: void): undefined {
  const templateName = "ZO_InventorySearchTemplate"
  const bagSearchBg = WINDOW_MANAGER.CreateControlFromVirtual<BackdropControl>(
    "$(parent)VotansKeybinderSearch",
    ZO_Keybindings,
    templateName
  )

  const bagSearch = bagSearchBg.GetNamedChild<EditControl>("Box")
  if (bagSearch === undefined) {
    return
  }
  const bagSearchTx = bagSearch.GetNamedChild("Text")
  KEYBINDER_STATE.searchBox = bagSearch

  bagSearchBg.ClearAnchors()
  bagSearchBg.SetAnchor(
    TOPLEFT,
    ZO_Keybindings,
    TOPLEFT,
    PANEL_ANCHOR_OFFSET_X,
    PANEL_ANCHOR_OFFSET_Y
  )
  bagSearchBg.SetDimensions(EXPANDED_WIDTH, FIELD_HEIGHT)

  const closeButton = WINDOW_MANAGER.CreateControlFromVirtual(
    undefined,
    bagSearchBg,
    "ZO_CloseButton"
  )

  const votansKeybinderFocusGained = (): boolean => {
    setDefaultText(bagSearch, "")
    bagSearchBg.SetAlpha(0.25)
    bagSearchBg.SetWidth(EXPANDED_WIDTH)
    closeButton.SetDimensions(CLOSE_BUTTON_SIZE, CLOSE_BUTTON_SIZE)
    closeButton.SetHidden(false)
    return false
  }
  const votansKeybinderFocusLost = (): boolean => {
    if (bagSearch.GetText() !== "") {
      bagSearchBg.SetAlpha(0.25)
      bagSearchBg.SetWidth(EXPANDED_WIDTH)
    } else {
      bagSearchBg.SetAlpha(0)
      bagSearchBg.SetWidth(COLLAPSED_WIDTH)
      closeButton.SetHidden(true)
    }
    setDefaultText(bagSearch, GLASS)
    return false
  }
  const votansKeybinderTextChanged = (): boolean => {
    if (WINDOW_MANAGER.GetFocusControl() !== bagSearch) {
      return votansKeybinderFocusLost()
    }
    return false
  }
  const votansKeybinderCloseClick = (): undefined => {
    bagSearch.SetText("")
    PlaySound(SOUNDS.DEFAULT_CLICK ?? "")
  }

  closeButton.ClearAnchors()
  closeButton.SetAnchor(TOPLEFT, bagSearch, TOPRIGHT, 0, 4)
  closeButton.SetHidden(true)
  closeButton.SetHandler("OnMouseDown", votansKeybinderCloseClick)
  closeButton.SetInheritAlpha(false)

  bagSearchBg.SetEdgeTexture(
    "EsoUI/Art/Tooltips/UI-SliderBackdrop.dds",
    EDGE_TEXTURE_CELL,
    EDGE_TEXTURE_SLICE,
    0
  )
  bagSearchBg.SetInsets(1, 1, 1, 1)
  bagSearch.ClearAnchors()
  bagSearch.SetAnchor(TOPLEFT, undefined, TOPLEFT, 4, 4)
  bagSearch.SetAnchor(BOTTOMRIGHT, undefined, BOTTOMRIGHT, -20, -4)
  bagSearch.SetInheritAlpha(false)
  bagSearch.SetEditEnabled(true)
  setDefaultText(bagSearch, GLASS)
  if (bagSearchTx !== undefined) {
    bagSearchTx.ClearAnchors()
    bagSearchTx.SetAnchorFill()
  } else {
    bagSearch.SetDefaultTextColor(1, 1, 1, 1)
  }
  votansKeybinderFocusLost()

  bagSearch.SetHandler("OnEscape", () => {
    bagSearch.LoseFocus()
    bagSearch.SetText("")
  })
  bagSearch.SetHandler("OnTextChanged", () => {
    ZO_EditDefaultText_OnTextChanged(bagSearch)
    filterTextChanged()
  })
  bagSearch.SetHandler("OnEnter", () => {
    bagSearch.LoseFocus()
  })

  ZO_PreHookHandler(bagSearch, "OnFocusGained", votansKeybinderFocusGained)
  ZO_PreHookHandler(bagSearch, "OnFocusLost", votansKeybinderFocusLost)
  ZO_PreHookHandler(bagSearch, "OnTextChanged", votansKeybinderTextChanged)
}
