import type { Improvement, RequestItem, Trait } from "./smithing-schema-types"
import type { MatList, Parser } from "./types"

export interface SetBonus {
  name: string | undefined
  trait_ct: number | undefined
  set_id: number | undefined
}

export interface Motif {
  motif_num: number
  motif_name: string | undefined
  mat_item_link: string | undefined
}

export interface SmithingParser extends Parser {
  request_item: RequestItem | undefined
  set_bonus: SetBonus | undefined
  trait: Trait | undefined
  trait_num: number | undefined
  motif_num: number | undefined
  motif: Motif | undefined
  improve_level: Improvement | undefined
  mat_list: MatList
  GetSetBonus: (this: SmithingParser, set_id: number) => SetBonus
  WarningText: (this: SmithingParser) => string | undefined
}
