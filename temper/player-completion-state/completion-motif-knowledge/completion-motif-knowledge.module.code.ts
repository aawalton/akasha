import { getSavedVariables } from "../completion-saved-variables/completion-saved-variables.module.code.ts"

export const MOTIF_CHAPTERS_PER_STYLE = 14

export type SparseMotifKnowledge = Record<number, number[]>

export function scanMotifKnowledge(): SparseMotifKnowledge {
  const knowledge: SparseMotifKnowledge = {}

  const numStyles = GetNumValidItemStyles()
  for (let styleId = 1; styleId <= numStyles; styleId++) {
    const knownChapters: number[] = []
    for (let chapterIndex = 1; chapterIndex <= MOTIF_CHAPTERS_PER_STYLE; chapterIndex++) {
      if (IsSmithingStyleKnown(styleId, chapterIndex)) {
        knownChapters.push(chapterIndex)
      }
    }
    if (knownChapters.length > 0) {
      knowledge[styleId] = knownChapters
    }
  }

  return knowledge
}

export function collectMotifKnowledge(): undefined {
  const savedVars = getSavedVariables()
  const charEntry = savedVars.characters[GetCurrentCharacterId()]
  if (charEntry === undefined) return

  charEntry.motifKnowledge = scanMotifKnowledge()
}
