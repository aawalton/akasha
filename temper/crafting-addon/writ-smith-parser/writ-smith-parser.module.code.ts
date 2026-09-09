import {
  getSetBonus,
  parseItemLink,
  toKnowList,
  toMatList,
  warningText,
} from "../writ-smith-parser-ops/writ-smith-parser-ops.module.code.ts"
import type {
  SetBonus,
  SmithingParser,
} from "../writ-smith-parser-types/writ-smith-parser-types.module.code.ts"
import type { KnowList, MatList, Parser } from "../writ-types/writ-types.module.code.ts"

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

    GetSetBonus(this: SmithingParser, setId: number): SetBonus {
      return getSetBonus(this, setId)
    },
    ParseItemLink(this: Parser, itemLink: string): Parser | undefined {
      return parseItemLink(o, itemLink)
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
