import { getSettingsString } from "../lang/register-strings"
import { SetsTable } from "./stores"

export type SetDescription = [setHeader: string, setRequirement: string, setBonuses: string]

const destinationsSetsData: Record<number, SetDescription | undefined> = {}

export function InitializeSetDescription(): undefined {
  let setIndex = 0
  for (const setData of SetsTable) {
    setIndex = setIndex + 1
    const itemId = setData[0]
    const traitsRequired = setData[1]
    const itemLink = string.format(
      "|H1:item:%d:370:50:0:0:0:0:0:0:0:0:0:0:0:0:1:0:0:0:10000:0|h|h",
      itemId
    )
    const [, setName, numBonuses] = GetItemLinkSetInfo(itemLink, false)

    const setRequirement = zo_strformat(getSettingsString("DEST_SET_REQUIREMENT"), traitsRequired)
    let setBonuses = ""

    let numRequired: number | undefined
    for (let bonusIndex = 1; bonusIndex <= numBonuses; bonusIndex++) {
      const [bonusRequired, bonusDescription] = GetItemLinkSetBonusInfo(itemLink, false, bonusIndex)
      numRequired = bonusRequired
      setBonuses = setBonuses + bonusDescription + "\n"
    }

    const setHeader = zo_strformat(SI_ITEM_FORMAT_STR_SET_NAME, setName, numRequired, numRequired)

    setBonuses = string.sub(setBonuses, 1, -2)
    destinationsSetsData[setIndex] = [setHeader, setRequirement, setBonuses]
  }
}

export function GetSetDescription(setId: number): SetDescription | undefined {
  return destinationsSetsData[setId]
}
