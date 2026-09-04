export type ColorHex = string

export type ColorString = string

export type MoneyString = string

export type GoldAmount = number | undefined

export interface WritFields {
  text: string | undefined
  link_style: number | undefined
  unknown3: number | undefined
  item_id: number | undefined
  sub_type: number | undefined
  internal_level: number | undefined
  enchant_id: number | undefined
  enchant_sub_type: number | undefined
  enchant_level: number | undefined
  writ1: number | undefined
  writ2: number | undefined
  writ3: number | undefined
  writ4: number | undefined
  writ5: number | undefined
  writ6: number | undefined
  item_style: number | undefined
  is_crafted: number | undefined
  is_bound: number | undefined
  is_stolen: number | undefined
  charge_ct: number | undefined
  unknown21: number | undefined
  unknown22: number | undefined
  unknown23: number | undefined
  writ_reward: number | undefined
}

export interface MatRow {
  name: string | undefined
  name_tr?: string | undefined
  link: string | undefined
  item_id?: number | undefined
  ct: number | undefined
  mm: number | undefined
  mat?: MatRow | undefined
  Total: (this: MatRow) => GoldAmount
  HaveCt: (this: MatRow) => number
}

export type MatList = MatRow[]

export interface KnowKind {
  cmw: boolean
}

export const KNOW: {
  MOTIF: KnowKind
  RECIPE: KnowKind
  TRAIT: KnowKind
  TRAIT_CT_FOR_SET: KnowKind
  SKILL_COST_REDUCTION: KnowKind
  SKILL_REQUIRED: KnowKind
} = {
  MOTIF: { cmw: true },
  RECIPE: { cmw: true },
  TRAIT: { cmw: true },
  TRAIT_CT_FOR_SET: { cmw: true },
  SKILL_COST_REDUCTION: { cmw: false },
  SKILL_REQUIRED: { cmw: true },
}

export interface KnowArgs {
  name: string
  is_known: boolean
  is_warn?: boolean | undefined
  lack_msg: string
  how?: KnowKind | undefined
}

export interface Know {
  name: string
  is_known: boolean
  is_warn: boolean | undefined
  lack_msg: string
  how: KnowKind | undefined
  DebugText: (this: Know) => string
  TooltipText: (this: Know) => ColorString | undefined
}

export type KnowList = Know[]

export interface Parser {
  class: string
  crafting_type: number
  ParseItemLink: (this: Parser, item_link: string) => Parser | undefined
  ToMatList: (this: Parser) => MatList
  ToKnowList: (this: Parser) => KnowList
  GetRequiredCraftCt?: (this: Parser) => number
}

export type PriceLookup = (this: void, link: string) => number | undefined
