import { updateDataLines } from "../skill-point-finder-data-lines/skill-point-finder-data-lines.module.code.ts"
import {
  calculateTotalPoints,
  setupData,
} from "../skill-point-finder-points/skill-point-finder-points.module.code.ts"
import {
  requireSVar,
  STATE,
} from "../skill-point-finder-state/skill-point-finder-state.module.code.ts"
import type { CharInfo } from "../skill-point-finder-types/skill-point-finder-types.module.code.ts"

function setSelectedChar(this: void, charName: string): undefined {
  for (const char of STATE.charData) {
    if (charName === char.charName) {
      STATE.selectedChar = char.charId
      break
    }
  }
}

function onItemSelect(this: void, _comboBox: ComboBox, choiceText: string): undefined {
  setSelectedChar(choiceText)
  updateDataLines()
  PlaySound(SOUNDS["POSITIVE_CLICK"] ?? "")
}

function createCharList(this: void): undefined {
  const container = USPF_GUI_Header_CharList
  container.comboBox = container.comboBox ?? ZO_ComboBox_ObjectFromContainer(container)
  const comboBox = container.comboBox

  container.data = {
    tooltipText:
      "Select a character to view. You must have logged in on the selected character with this addon active for information to populate.",
  }

  const sVar = requireSVar()
  STATE.charNames = []
  STATE.charData = []
  for (const info of sVar.charInfo) {
    STATE.charNames.push(info.charName)
    STATE.charData.push({ charId: info.charId, charName: info.charName })

    if (GetCurrentCharacterId() === info.charId) {
      STATE.currentCharName = info.charName
      STATE.selectedChar = info.charId
    }
  }

  comboBox.SetSortsItems(false)

  for (const name of STATE.charNames) {
    comboBox.AddItem(comboBox.CreateItemEntry(name, onItemSelect))
    if (name === STATE.currentCharName) {
      comboBox.SetSelectedItem(name)
    }
  }
}

export function initSetup(this: void): undefined {
  STATE.ptsTots = calculateTotalPoints()

  const charIdKnown: Record<string, { idx: number; name: string }> = {}
  const numCharacters = GetNumCharacters()
  if (numCharacters <= 0) return

  for (let i = 1; i <= numCharacters; i++) {
    const [name, , , , , , id] = GetCharacterInfo(i)
    charIdKnown[id] = { idx: i, name }
  }

  const currentId = GetCurrentCharacterId()
  const sVar = requireSVar()

  let newChar = true
  const newCharInfo: CharInfo[] = []
  for (const v of sVar.charInfo) {
    if (v.charId === currentId) {
      const known = charIdKnown[currentId]
      if (known !== undefined) {
        v.charName = zo_strformat("<<1>>", known.name)
      }
      newChar = false
    }
    if (charIdKnown[v.charId] !== undefined) {
      newCharInfo.push(v)
    } else {
      delete sVar.settings[v.charId]
      delete sVar.ptsData[v.charId]
    }
  }
  sVar.charInfo = newCharInfo

  if (newChar) {
    const known = charIdKnown[currentId]
    sVar.charInfo.push({
      charId: currentId,
      charName: zo_strformat("<<1>>", known !== undefined ? known.name : ""),
    })
    sVar.settings[currentId] = TemperTableFunctions.CopyTable(STATE.settings)
    sVar.ptsData[currentId] = TemperTableFunctions.CopyTable(STATE.ptsData)
  }

  sVar.charInfo.sort((c1, c2) => {
    const a = charIdKnown[c1.charId]
    const b = charIdKnown[c2.charId]
    return (a !== undefined ? a.idx : 0) - (b !== undefined ? b.idx : 0)
  })

  createCharList()
}

export function resetSelectedCharacter(this: void): undefined {
  const currentCharId = GetCurrentCharacterId()
  if (STATE.selectedChar !== currentCharId) {
    const container = USPF_GUI_Header_CharList
    container.comboBox = container.comboBox ?? ZO_ComboBox_ObjectFromContainer(container)
    const comboBox = container.comboBox

    for (const char of STATE.charData) {
      if (currentCharId === char.charId) {
        STATE.currentCharName = char.charName
        STATE.selectedChar = char.charId
        comboBox.SetSelectedItem(char.charName)
      }
    }
  }
  setupData(currentCharId)
}
