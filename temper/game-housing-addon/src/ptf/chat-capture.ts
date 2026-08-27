import { getPtfSavedVars, PortToFriend } from "./state"

function parseLuaCapture(captured: string | undefined): string | undefined {
  return captured
}

function IsChatAllowed(this: void, channelType: number): boolean {
  let retVal = false
  const allowed = getPtfSavedVars().vc_chatAllowed
  if (
    channelType !== undefined &&
    ((channelType === 12 && allowed.g1 === true) ||
      (channelType === 13 && allowed.g2 === true) ||
      (channelType === 14 && allowed.g3 === true) ||
      (channelType === 15 && allowed.g4 === true) ||
      (channelType === 16 && allowed.g1 === true) ||
      (channelType === 17 && allowed.o1 === true) ||
      (channelType === 18 && allowed.o2 === true) ||
      (channelType === 19 && allowed.o3 === true) ||
      (channelType === 20 && allowed.o4 === true) ||
      (channelType === 21 && allowed.o5 === true) ||
      (channelType === 0 && allowed.say === true) ||
      (channelType === 1 && allowed.yell === true) ||
      (channelType === 3 && allowed.group === true) ||
      (channelType === 2 && allowed.tell === true) ||
      (channelType === 6 && allowed.emote === true) ||
      (channelType === 31 && allowed.zone === true) ||
      (channelType === 32 && allowed.enzone === true) ||
      (channelType === 33 && allowed.frzone === true) ||
      (channelType === 34 && allowed.dezone === true) ||
      (channelType === 35 && allowed.jpzone === true))
  ) {
    retVal = true
  }
  return retVal
}
PortToFriend.IsChatAllowed = IsChatAllowed

function IsValidPTFString(this: void, text: string): boolean {
  let retVal = false
  if (
    text !== undefined &&
    PortToFriend.StringStartsWith(text, PortToFriend.constants.sendKeyWord)
  ) {
    retVal = true
  }
  return retVal
}
PortToFriend.IsValidPTFString = IsValidPTFString

function AddVisitCardFromString(this: void, rawVisitCard: string): undefined {
  let name = ""
  let houseId: number | string = 0
  let comment = ""
  if (
    rawVisitCard !== undefined &&
    PortToFriend.StringStartsWith(rawVisitCard, PortToFriend.constants.sendKeyWord)
  ) {
    let working = string.sub(rawVisitCard, string.len(PortToFriend.constants.sendKeyWord))
    const [parenPos] = string.find(working, "%(")
    if (parenPos !== undefined) {
      comment = string.sub(working, parenPos + 1, string.len(working) - 1)
      working = zo_strtrim(string.sub(working, 0, parenPos - 1))

      const [houseIndexCapture] = string.match(working, ".* ()")
      const houseIndexRaw = parseLuaCapture(houseIndexCapture)
      const houseIndex = tonumber(houseIndexRaw)
      if (houseIndexRaw !== undefined && houseIndex !== undefined && houseIndex > 0) {
        houseId = string.sub(working, houseIndex)
        if (tonumber(houseId) !== undefined) {
          name = zo_strtrim(string.sub(working, 0, houseIndex - 1))
          PortToFriend.AddVisitCard(name, houseId, comment)
        }
      }
    }
  }
}
PortToFriend.AddVisitCardFromString = AddVisitCardFromString

function DoesVisitCardExist(this: void, entry: { name: string; houseId: number }): boolean {
  let retVal = false
  if (entry !== undefined) {
    const receivedCards = getPtfSavedVars().vc.receivedCards
    for (const i of $range(1, receivedCards.length)) {
      const card = receivedCards[i - 1]
      if (card !== undefined && card.name === entry.name && card.houseId === entry.houseId) {
        retVal = true
        break
      }
    }
  }
  return retVal
}
PortToFriend.DoesVisitCardExist = DoesVisitCardExist

function AddVisitCard(
  this: void,
  name: string,
  houseId: number | string,
  _comment: string
): undefined {
  const numericHouseId = tonumber(houseId)
  if (numericHouseId !== undefined && numericHouseId > 0 && name !== undefined) {
    const savedVars = getPtfSavedVars()
    if (savedVars.vc === undefined) {
      savedVars.vc = { allowSelf: false, receivedCards: [] }
    }
    if (savedVars.vc.receivedCards === undefined) {
      savedVars.vc.receivedCards = []
    }
    const entry = { name, houseId: numericHouseId }
    if (!PortToFriend.DoesVisitCardExist(entry)) {
      savedVars.vc.receivedCards.push(entry)
      PortToFriend.addonState.taintedVisitCards = true
    }
    PortToFriend.UpdateVisitCardList()
  }
}
PortToFriend.AddVisitCard = AddVisitCard

function ChatMessageReceived(
  this: void,
  eventCode: number,
  channelType: number,
  _fromName: string,
  text: string,
  _isCustomerService: boolean,
  fromDisplayName: string
): undefined {
  if (
    eventCode === EVENT_CHAT_MESSAGE_CHANNEL &&
    PortToFriend.IsChatAllowed(channelType) &&
    PortToFriend.IsValidPTFString(text)
  ) {
    if (fromDisplayName !== GetDisplayName() || getPtfSavedVars().vc.allowSelf === true) {
      PortToFriend.AddVisitCardFromString(text)
    }
  }
}
PortToFriend.ChatMessageReceived = ChatMessageReceived

function CollectibleNotification(
  this: void,
  _eventCode: number,
  collectibleId: number,
  _notificationId: number
): undefined {
  const data = ZO_COLLECTIBLE_DATA_MANAGER.GetAllCollectibleDataObjects()
  for (const i of $range(1, data.length)) {
    const obj = data[i - 1]
    if (obj !== undefined && obj.IsHouse() === true && obj.collectibleId === collectibleId) {
      const refId = obj.GetReferenceId()
      PortToFriend.purchasedHouses[refId] = {
        name: obj.GetFormattedName(),
        location: zo_strformat("<<C:1>>", obj.houseLocation),
      }
      PortToFriend.UpdateMyHouses()
      break
    }
  }
}
PortToFriend.CollectibleNotification = CollectibleNotification
