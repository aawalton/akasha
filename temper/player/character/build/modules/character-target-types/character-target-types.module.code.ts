export const TARGET_DISCIPLINES = ["warfare", "fitness", "craft"] as const

export type TargetDisciplineKey = (typeof TARGET_DISCIPLINES)[number]

export interface TargetStar {
  readonly id: number
  readonly name: string
}

export interface TargetDiscipline {
  readonly discipline: TargetDisciplineKey
  readonly slotted: readonly TargetStar[]
  readonly stars: readonly TargetStar[]
}

export interface TargetBarSlot {
  readonly name: string
  readonly abilityId: number
}

export interface TargetGear {
  readonly slot: string
  readonly setId: number
  readonly setName: string
  readonly trait: number
  readonly traitName: string
}

export interface TargetPassive {
  readonly name: string
  readonly abilityId: number
  readonly rank: number
}

interface TargetQuickslot {
  readonly slot: number
  readonly kind: "item" | "collectible" | "emote" | "quick-chat"
  readonly id: number
  readonly name: string
}

export interface TargetAttributes {
  readonly health: number
  readonly magicka: number
  readonly stamina: number
}

export interface CharacterTarget {
  readonly buildId: string
  readonly title: string
  readonly icon: number
  readonly updatedAt: string
  readonly editId?: string
  readonly correlationId?: string
  readonly curseName: string
  readonly attributes: TargetAttributes
  readonly champion: readonly TargetDiscipline[]
  readonly bars: { readonly primary: readonly TargetBarSlot[]; readonly backup: readonly TargetBarSlot[] }
  readonly mundus?: { readonly name: string; readonly abilityId: number }
  readonly food?: { readonly name: string; readonly abilityId: number; readonly itemId: number }
  readonly gear: readonly TargetGear[]
  readonly passives: readonly TargetPassive[]
  readonly quickslots?: readonly TargetQuickslot[]
}
