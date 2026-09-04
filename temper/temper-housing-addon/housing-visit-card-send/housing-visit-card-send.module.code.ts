import "@akasha/temper-eso-types/eso-chat"
import "@akasha/temper-eso-types/eso-extra"
import "@akasha/temper-eso-types/eso-functions-01"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

interface HouseEditboxView {
  GetText: (this: HouseEditboxView) => string
}
interface HouseControlsView {
  editbox: HouseEditboxView
}
function asHouseControlsView(value: unknown): HouseControlsView {
  return value as HouseControlsView
}

interface ChatEditControlView {
  HasFocus: (this: ChatEditControlView) => boolean
  SetText: (this: ChatEditControlView, text: string) => void
}
function asChatEditControlView(value: unknown): ChatEditControlView {
  return value as ChatEditControlView
}

function calculateVCLocation(this: void): undefined {
  if (
    portToFriend.addonState.VCLocationCalculated === undefined ||
    portToFriend.addonState.VCLocationCalculated === false
  ) {
    portToFriend.addonState.VCLocationCalculated = true
  }
}
portToFriend.CalculateVCLocation = calculateVCLocation

function favoriteToVC(this: void, index: number): undefined {
  const savedVars = portToFriend.savedVars
  if (
    index !== undefined &&
    savedVars !== undefined &&
    savedVars.favorites !== undefined &&
    savedVars.favorites[index] !== undefined
  ) {
    portToFriend.SendVisitCardOf(
      savedVars.favorites[index].name,
      savedVars.favorites[index].houseId,
      portToFriend.constants.sendBasicComment
    )
  }
}
portToFriend.FavoriteToVC = favoriteToVC

function myHousesToVC(this: void, id: number): undefined {
  portToFriend.SendVisitCardOf(GetDisplayName(), id, portToFriend.constants.sendBasicComment)
}
portToFriend.MyHousesToVC = myHousesToVC

function sendVisitCardOf(this: void, name: string, houseId: number, comment: string): undefined {
  if (name !== undefined && houseId !== undefined && comment !== undefined) {
    const message =
      portToFriend.constants.sendKeyWord + name + " " + tostring(houseId) + " (" + comment + ")"
    const chat = asChatEditControlView(CHAT_SYSTEM.textEntry.editControl)
    if (chat.HasFocus() === false) {
      StartChatInput()
    }
    chat.SetText(message)
  }
}
portToFriend.SendVisitCardOf = sendVisitCardOf

function sendVisitCard(this: void): undefined {
  let name = asHouseControlsView(portToFriend.controls.house).editbox.GetText()
  const houseId = portToFriend.addonState.houseId
  if (name === undefined || zo_strtrim(name) === "") {
    name = GetDisplayName()
  }
  if (houseId !== undefined) {
    portToFriend.SendVisitCardOf(name, houseId, portToFriend.constants.sendBasicComment)
  }
}
portToFriend.SendVisitCard = sendVisitCard
