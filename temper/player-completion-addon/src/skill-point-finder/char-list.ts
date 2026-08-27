import { updateDataLines } from "./data-lines"
import { calculateTotalPoints, setupData } from "./points"
import { requireSVar, state } from "./state"
import type { CharInfo } from "./types"

function setSelectedChar(this: void, charName: string): undefined {
  for (const char of state.charData) {
    if (charName === char.charName) {
      state.selectedChar = char.charId
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
  state.charNames = []
  state.charData = []
  for (const info of sVar.charInfo) {
    state.charNames.push(info.charName)
    state.charData.push({ charId: info.charId, charName: info.charName })

    if (GetCurrentCharacterId() === info.charId) {
      state.currentCharName = info.charName
      state.selectedChar = info.charId
    }
  }

  comboBox.SetSortsItems(false)

  for (const name of state.charNames) {
    comboBox.AddItem(comboBox.CreateItemEntry(name, onItemSelect))
    if (name === state.currentCharName) {
      comboBox.SetSelectedItem(name)
    }
  }
}

export function initSetup(this: void): undefined {
  state.ptsTots = calculateTotalPoints()

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
    sVar.settings[currentId] = TemperTableFunctions.CopyTable(state.settings)
    sVar.ptsData[currentId] = TemperTableFunctions.CopyTable(state.ptsData)
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
  if (state.selectedChar !== currentCharId) {
    const container = USPF_GUI_Header_CharList
    container.comboBox = container.comboBox ?? ZO_ComboBox_ObjectFromContainer(container)
    const comboBox = container.comboBox

    for (const char of state.charData) {
      if (currentCharId === char.charId) {
        state.currentCharName = char.charName
        state.selectedChar = char.charId
        comboBox.SetSelectedItem(char.charName)
      }
    }
  }
  setupData(currentCharId)
}
