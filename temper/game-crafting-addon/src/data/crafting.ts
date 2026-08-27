import { state } from "../state"

export type CraftingList = Record<number, Record<number, Record<number, boolean>>>

export interface CraftingTable {
  list: CraftingList | undefined
  CompileTraits: (this: void) => undefined
}

export const Crafting: CraftingTable = {
  list: {},

  CompileTraits: function (this: void) {
    const crafts = [
      CRAFTING_TYPE_BLACKSMITHING,
      CRAFTING_TYPE_CLOTHIER,
      CRAFTING_TYPE_WOODWORKING,
      CRAFTING_TYPE_JEWELRYCRAFTING,
    ]

    if (Crafting.list === undefined) {
      Crafting.list = {}
    }
    const list = Crafting.list
    const maxTraits = state.MaxTraits
    for (const craft of crafts) {
      let craftLines = list[craft]
      if (craftLines === undefined) {
        craftLines = {}
        list[craft] = craftLines
      }
      const numLines = GetNumSmithingResearchLines(craft)
      for (let line = 1; line <= numLines; line++) {
        let lineTraits = craftLines[line]
        if (lineTraits === undefined) {
          lineTraits = {}
          craftLines[line] = lineTraits
        }
        for (let trait = 1; trait <= maxTraits; trait++) {
          if (lineTraits[trait] === undefined) {
            lineTraits[trait] = false
          }
        }
      }
    }
  },
}
