type Ranked = { readonly rank?: number | undefined }

type MorphForms = { readonly base: Ranked; readonly morph1: Ranked; readonly morph2: Ranked }

export type MorphRanks = {
  readonly baseRank: number
  readonly morph1Rank: number
  readonly morph2Rank: number
}

export function morphRanksOf(skill: MorphForms, rankMost: number): MorphRanks {
  return {
    baseRank: Math.min(skill.base.rank ?? 0, rankMost),
    morph1Rank: Math.min(skill.morph1.rank ?? 0, rankMost),
    morph2Rank: Math.min(skill.morph2.rank ?? 0, rankMost),
  }
}

export function morphPoints(ranks: MorphRanks): number {
  return ranks.baseRank + ranks.morph1Rank + ranks.morph2Rank
}

export function morphMost(rankMost: number): number {
  return morphPoints({ baseRank: rankMost, morph1Rank: rankMost, morph2Rank: rankMost })
}

let held: number | null = null

export function holdMorphRankMost(rankMost: number): undefined {
  held = rankMost
  return undefined
}

export function heldMorphRankMost(): number {
  if (held === null) throw new Error("the morph rank cap is read with the completion pages, unread")
  return held
}
