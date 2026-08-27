import { PortToFriend } from "./state"

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

function CalculateVCLocation(this: void): undefined {
  if (
    PortToFriend.addonState.VCLocationCalculated === undefined ||
    PortToFriend.addonState.VCLocationCalculated === false
  ) {
    PortToFriend.addonState.VCLocationCalculated = true
  }
}
PortToFriend.CalculateVCLocation = CalculateVCLocation

function FavoriteToVC(this: void, index: number): undefined {
  const savedVars = PortToFriend.savedVars
  if (
    index !== undefined &&
    savedVars !== undefined &&
    savedVars.favorites !== undefined &&
    savedVars.favorites[index] !== undefined
  ) {
    PortToFriend.SendVisitCardOf(
      savedVars.favorites[index].name,
      savedVars.favorites[index].houseId,
      PortToFriend.constants.sendBasicComment
    )
  }
}
PortToFriend.FavoriteToVC = FavoriteToVC

function MyHousesToVC(this: void, id: number): undefined {
  PortToFriend.SendVisitCardOf(GetDisplayName(), id, PortToFriend.constants.sendBasicComment)
}
PortToFriend.MyHousesToVC = MyHousesToVC

function SendVisitCardOf(this: void, name: string, houseId: number, comment: string): undefined {
  if (name !== undefined && houseId !== undefined && comment !== undefined) {
    const message =
      PortToFriend.constants.sendKeyWord + name + " " + tostring(houseId) + " (" + comment + ")"
    const chat = asChatEditControlView(CHAT_SYSTEM.textEntry.editControl)
    if (chat.HasFocus() === false) {
      StartChatInput()
    }
    chat.SetText(message)
  }
}
PortToFriend.SendVisitCardOf = SendVisitCardOf

function SendVisitCard(this: void): undefined {
  let name = asHouseControlsView(PortToFriend.controls.house).editbox.GetText()
  const houseId = PortToFriend.addonState.houseId
  if (name === undefined || zo_strtrim(name) === "") {
    name = GetDisplayName()
  }
  if (houseId !== undefined) {
    PortToFriend.SendVisitCardOf(name, houseId, PortToFriend.constants.sendBasicComment)
  }
}
PortToFriend.SendVisitCard = SendVisitCard
