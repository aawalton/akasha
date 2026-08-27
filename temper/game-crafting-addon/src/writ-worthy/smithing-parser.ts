import {
  getSetBonus,
  parseItemLink,
  toKnowList,
  toMatList,
  warningText,
} from "./smithing-parser-ops"
import type { SetBonus, SmithingParser } from "./smithing-parser-types"
import type { KnowList, MatList, Parser } from "./types"


export function newSmithingParser(): SmithingParser {
  const o: SmithingParser = {
    class: "smithing",
    crafting_type: 0,
    request_item: undefined,
    set_bonus: undefined,
    trait: undefined,
    trait_num: undefined,
    motif_num: undefined,
    motif: undefined,
    improve_level: undefined,
    mat_list: [],

    GetSetBonus(this: SmithingParser, set_id: number): SetBonus {
      return getSetBonus(this, set_id)
    },
    ParseItemLink(this: Parser, item_link: string): Parser | undefined {
      return parseItemLink(o, item_link)
    },
    ToMatList(this: Parser): MatList {
      return toMatList(o)
    },
    ToKnowList(this: Parser): KnowList {
      return toKnowList(o)
    },
    WarningText(this: SmithingParser): string | undefined {
      return warningText(this)
    },
  }
  return o
}
