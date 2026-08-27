import type { TraitResearchCraftType, TraitResearchLine, TraitResearchTrait } from "@temper/game-completion/completion-types"

type TraitResearchCapture = Record<number, TraitResearchCraftType>

function preferPopulated(stored: string, fresh: string): string {
  return fresh !== "" ? fresh : stored
}

function mergeTrait(stored: TraitResearchTrait, fresh: TraitResearchTrait): TraitResearchTrait {
  return {
    name: preferPopulated(stored.name, fresh.name),
    known: stored.known || fresh.known,
  }
}

function mergeTraits(
  stored: Record<number, TraitResearchTrait>,
  fresh: Record<number, TraitResearchTrait>
): Record<number, TraitResearchTrait> {
  const merged: Record<number, TraitResearchTrait> = {}
  for (const [key, storedTrait] of Object.entries(stored)) {
    merged[Number(key)] = storedTrait
  }
  for (const [key, freshTrait] of Object.entries(fresh)) {
    const index = Number(key)
    const priorTrait = merged[index]
    merged[index] = priorTrait === undefined ? freshTrait : mergeTrait(priorTrait, freshTrait)
  }
  return merged
}

function mergeLines(
  stored: Record<number, TraitResearchLine>,
  fresh: Record<number, TraitResearchLine>
): Record<number, TraitResearchLine> {
  const merged: Record<number, TraitResearchLine> = {}
  for (const [key, storedLine] of Object.entries(stored)) {
    merged[Number(key)] = storedLine
  }
  for (const [key, freshLine] of Object.entries(fresh)) {
    const index = Number(key)
    const priorLine = merged[index]
    merged[index] =
      priorLine === undefined
        ? freshLine
        : {
            name: preferPopulated(priorLine.name, freshLine.name),
            traits: mergeTraits(priorLine.traits, freshLine.traits),
          }
  }
  return merged
}

export function mergeTraitResearch(
  stored: TraitResearchCapture | undefined,
  fresh: TraitResearchCapture
): TraitResearchCapture {
  if (stored === undefined) return fresh

  const merged: TraitResearchCapture = {}
  for (const [key, storedCraftType] of Object.entries(stored)) {
    merged[Number(key)] = storedCraftType
  }
  for (const [key, freshCraftType] of Object.entries(fresh)) {
    const index = Number(key)
    const priorCraftType = merged[index]
    merged[index] =
      priorCraftType === undefined
        ? freshCraftType
        : {
            name: preferPopulated(priorCraftType.name, freshCraftType.name),
            lines: mergeLines(priorCraftType.lines, freshCraftType.lines),
          }
  }
  return merged
}
