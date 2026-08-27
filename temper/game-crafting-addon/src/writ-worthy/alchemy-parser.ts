import { type Effect, effectById, type ReagentThree, toReagentThreeList } from "./alchemy-data"
import { add as logAdd, flatten as logFlatten, startNewEvent as logStartNewEvent } from "./log"
import { listTotal, matRowFromName } from "./mat-row"
import { AL_LABORATORY_USE, AL_POTION_4X } from "./required-skill"
import type { GoldAmount, KnowList, MatList, Parser } from "./types"
import { fail, toWritFields } from "./util"

interface AlchemyParser extends Parser {
  is_poison: boolean | undefined
  effects: Effect[]
  r3list: ReagentThree[]
  mat_list: MatList
}

export function newAlchemyParser(): AlchemyParser {
  const o: AlchemyParser = {
    class: "alchemy",
    crafting_type: CRAFTING_TYPE_ALCHEMY,
    is_poison: undefined,
    effects: [],
    r3list: [],
    mat_list: [],

    ParseItemLink(this: Parser, item_link: string): Parser | undefined {
      logStartNewEvent("ParseItemLink: %s %s", o.class, item_link)
      const fields = toWritFields(item_link)
      const solvent_id = fields.writ1
      o.is_poison = solvent_id === 239

      const effect_log: Record<number, string> = {}
      const effect_ids = [fields.writ2, fields.writ3, fields.writ4]
      for (let i = 0; i < effect_ids.length; i += 1) {
        const effect_id = effect_ids[i]
        if (effect_id === undefined) {
          break
        }
        const effect = effectById(effect_id)
        if (effect === undefined) {
          return fail("Unknown potion effect:" + tostring(effect_id))
        }
        effect_log[i + 1] = tostring(effect_id) + " " + tostring(effect.name)
        o.effects[o.effects.length] = effect
      }

      const log_t = {
        solvent_id,
        is_poison: o.is_poison,
        effects: logFlatten("", effect_log),
      }
      logAdd(log_t)

      const [e0, e1, e2] = o.effects
      if (e0 !== undefined && e1 !== undefined && e2 !== undefined) {
        o.r3list = toReagentThreeList(e0, e1, e2)
      }
      return o
    },

    GetRequiredCraftCt(this: Parser): number {
      const api_version = GetAPIVersion()
      let result_ct = 20
      if (100026 <= api_version) {
        result_ct = 16
      }

      let result_per_craft = 4
      if (o.is_poison === true) {
        result_per_craft = 16
      }
      return math.ceil(result_ct / result_per_craft)
    },

    ToMatList(this: Parser): MatList {
      let min_gold: GoldAmount = 9999999999
      let min_r3: ReagentThree | undefined
      const mat_ct = o.GetRequiredCraftCt?.() ?? 0
      for (const r3 of o.r3list) {
        r3[0].mat = matRowFromName(r3[0].name, mat_ct)
        r3[1].mat = matRowFromName(r3[1].name, mat_ct)
        r3[2].mat = matRowFromName(r3[2].name, mat_ct)

        const mat_list: MatList = []
        const m0 = r3[0].mat
        const m1 = r3[1].mat
        const m2 = r3[2].mat
        if (m0 !== undefined) {
          mat_list[mat_list.length] = m0
        }
        if (m1 !== undefined) {
          mat_list[mat_list.length] = m1
        }
        if (m2 !== undefined) {
          mat_list[mat_list.length] = m2
        }
        const mat_total = listTotal(mat_list)
        if (mat_total === undefined) {
          logAdd("no total")
          min_gold = TemperWrit.GOLD_UNKNOWN
          min_r3 = r3
          break
        }
        if (min_gold !== undefined && mat_total < min_gold) {
          min_gold = mat_total
          min_r3 = r3
        }
      }

      o.mat_list = []
      if (o.is_poison === true) {
        const solvent = matRowFromName("Alkahest", mat_ct)
        if (solvent !== undefined) {
          o.mat_list[o.mat_list.length] = solvent
        }
      } else {
        const solvent = matRowFromName("Lorkhan's Tears", mat_ct)
        if (solvent !== undefined) {
          o.mat_list[o.mat_list.length] = solvent
        }
      }
      if (min_r3 !== undefined) {
        const r0 = min_r3[0].mat
        const r1 = min_r3[1].mat
        const r2 = min_r3[2].mat
        if (r0 !== undefined) {
          o.mat_list[o.mat_list.length] = r0
        }
        if (r1 !== undefined) {
          o.mat_list[o.mat_list.length] = r1
        }
        if (r2 !== undefined) {
          o.mat_list[o.mat_list.length] = r2
        }
      }

      return o.mat_list
    },

    ToKnowList(this: Parser): KnowList {
      logStartNewEvent("ToKnowList: %s", o.class)
      const three_reagents = AL_LABORATORY_USE.ToKnow()
      const four_pots_per = AL_POTION_4X.ToKnow()
      four_pots_per.is_warn = true
      const r: KnowList = [three_reagents, four_pots_per]
      return r
    },
  }
  return o
}

export interface AlchemyParserNamespace {
  class: string
  New: (this: AlchemyParserNamespace) => AlchemyParser
}

const alchemyParserNamespace: AlchemyParserNamespace = {
  class: "alchemy",
  New: newAlchemyParser,
}

const alchemyNamespace = TemperWrit.Alchemy
if (alchemyNamespace !== undefined) {
  alchemyNamespace.Parser = alchemyParserNamespace
}
