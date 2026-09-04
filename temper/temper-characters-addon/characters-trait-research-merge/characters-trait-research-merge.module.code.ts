import type {
  TraitResearchCraftType,
  TraitResearchLine,
  TraitResearchTrait,
} from "@akasha/temper-completion/completion-progress"
import { mergeByKey } from "../characters-keyed-merge/characters-keyed-merge.module.code.ts"
import { populatedName } from "../characters-populated-name/characters-populated-name.module.code.ts"

type TraitResearchCapture = Record<number, TraitResearchCraftType>

function mergeTrait(stored: TraitResearchTrait, fresh: TraitResearchTrait): TraitResearchTrait {
  return {
    name: populatedName(stored.name, fresh.name),
    known: stored.known || fresh.known,
  }
}

function mergeLine(stored: TraitResearchLine, fresh: TraitResearchLine): TraitResearchLine {
  return {
    name: populatedName(stored.name, fresh.name),
    traits: mergeByKey(stored.traits, fresh.traits, mergeTrait),
  }
}

function mergeCraftType(
  stored: TraitResearchCraftType,
  fresh: TraitResearchCraftType
): TraitResearchCraftType {
  return {
    name: populatedName(stored.name, fresh.name),
    lines: mergeByKey(stored.lines, fresh.lines, mergeLine),
  }
}

export function mergeTraitResearch(
  stored: TraitResearchCapture | undefined,
  fresh: TraitResearchCapture
): TraitResearchCapture {
  return mergeByKey(stored, fresh, mergeCraftType)
}
