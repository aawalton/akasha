import { state } from "../state"
import * as Characters from "./characters"

const RESEARCH_CRAFTS: number[] = [
  CRAFTING_TYPE_BLACKSMITHING,
  CRAFTING_TYPE_CLOTHIER,
  CRAFTING_TYPE_WOODWORKING,
  CRAFTING_TYPE_JEWELRYCRAFTING,
]

export function IsInitialized(this: void): boolean {
  const [firstKey] = next(LibCharacterKnowledge.GetCharacterList())
  return firstKey !== undefined
}

export function OnInitialized(this: void, name: string, callback: (this: void) => void): undefined {
  if (IsInitialized()) {
    callback()
    return
  }
  LibCharacterKnowledge.RegisterForCallback(name, LibCharacterKnowledge.EVENT_INITIALIZED, callback)
}

export function CharIdForName(this: void, char: string): string | undefined {
  for (const [, entry] of ipairs(LibCharacterKnowledge.GetCharacterList())) {
    if (entry.name === char) {
      return entry.id
    }
  }
  return undefined
}

export function IsItemKnownByLink(this: void, char: string, link: string): boolean {
  const charId = CharIdForName(char)
  if (charId === undefined) {
    return false
  }
  return (
    LibCharacterKnowledge.GetItemKnowledgeForCharacter(link, undefined, charId) ===
    LibCharacterKnowledge.KNOWLEDGE_KNOWN
  )
}

export function IsItemKnownById(this: void, char: string, itemId: number): boolean {
  const charId = CharIdForName(char)
  if (charId === undefined) {
    return false
  }
  return (
    LibCharacterKnowledge.GetItemKnowledgeForCharacter(itemId, undefined, charId) ===
    LibCharacterKnowledge.KNOWLEDGE_KNOWN
  )
}

export function IsMotifChapterKnown(
  this: void,
  char: string,
  styleId: number,
  chapterId: number
): boolean {
  const charId = CharIdForName(char)
  if (charId === undefined) {
    return false
  }
  return (
    LibCharacterKnowledge.GetMotifKnowledgeForCharacter(styleId, chapterId, undefined, charId) ===
    LibCharacterKnowledge.KNOWLEDGE_KNOWN
  )
}

export function IsResearchKnown(
  this: void,
  char: string,
  craft: number,
  line: number,
  trait: number
): boolean {
  const charId = CharIdForName(char)
  if (charId === undefined) {
    return false
  }
  const [, , isKnown] = LibCharacterKnowledge.GetSmithingResearchLineTraitInfoForCharacter(
    craft,
    line,
    trait,
    undefined,
    charId
  )
  return isKnown
}

export function RebuildResearched(this: void, char: string): undefined {
  const researched: Record<number, Record<number, Record<number, boolean | number>>> = {}
  state.Data.crafting.researched[char] = researched
  for (const [, craft] of ipairs(RESEARCH_CRAFTS)) {
    const craftTable: Record<number, Record<number, boolean | number>> = {}
    researched[craft] = craftTable
    const numLines = GetNumSmithingResearchLines(craft)
    for (let line = 1; line <= numLines; line++) {
      const lineTable: Record<number, boolean | number> = {}
      craftTable[line] = lineTable
      for (let trait = 1; trait <= state.MaxTraits; trait++) {
        lineTable[trait] = IsResearchKnown(char, craft, line, trait)
      }
    }
  }
}

export function RebuildAll(this: void): undefined {
  for (const [, char] of ipairs(Characters.GetCharacters())) {
    RebuildResearched(char)
  }
}
