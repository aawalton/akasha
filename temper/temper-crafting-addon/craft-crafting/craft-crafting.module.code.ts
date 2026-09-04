import { STATE } from "../crafting-state/crafting-state.module.code.ts"

export type CraftingList = Record<number, Record<number, Record<number, boolean>>>

export interface CraftingTable {
  list: CraftingList | undefined
  CompileTraits: (this: void) => undefined
}

export const CRAFTING: CraftingTable = {
  list: {},

  CompileTraits: function (this: void) {
    const crafts = [
      CRAFTING_TYPE_BLACKSMITHING,
      CRAFTING_TYPE_CLOTHIER,
      CRAFTING_TYPE_WOODWORKING,
      CRAFTING_TYPE_JEWELRYCRAFTING,
    ]

    if (CRAFTING.list === undefined) {
      CRAFTING.list = {}
    }
    const list = CRAFTING.list
    const maxTraits = STATE.MaxTraits
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
