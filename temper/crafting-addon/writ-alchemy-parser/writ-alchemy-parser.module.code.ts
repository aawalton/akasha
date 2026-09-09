import {
  type Effect,
  effectById,
  type ReagentThree,
  toReagentThreeList,
} from "../writ-alchemy-data/writ-alchemy-data.module.code.ts"
import {
  add as logAdd,
  flatten as logFlatten,
  startNewEvent as logStartNewEvent,
} from "../writ-log/writ-log.module.code.ts"
import { listTotal, matRowFromName } from "../writ-mat-row/writ-mat-row.module.code.ts"
import {
  AL_LABORATORY_USE,
  AL_POTION_4X,
} from "../writ-required-skill/writ-required-skill.module.code.ts"
import type { GoldAmount, KnowList, MatList, Parser } from "../writ-types/writ-types.module.code.ts"
import { fail } from "../writ-util/writ-util.module.code.ts"
import { toWritFields } from "../writ-writ-fields/writ-writ-fields.module.code.ts"

interface AlchemyParser extends Parser {
  is_poison: boolean | undefined
  effects: Effect[]
  r3list: ReagentThree[]
  matList: MatList
}

export function newAlchemyParser(): AlchemyParser {
  const o: AlchemyParser = {
    class: "alchemy",
    crafting_type: CRAFTING_TYPE_ALCHEMY,
    is_poison: undefined,
    effects: [],
    r3list: [],
    matList: [],

    ParseItemLink(this: Parser, itemLink: string): Parser | undefined {
      logStartNewEvent("ParseItemLink: %s %s", o.class, itemLink)
      const fields = toWritFields(itemLink)
      const solventId = fields.writ1
      o.is_poison = solventId === 239

      const effectLog: Record<number, string> = {}
      const effectIds = [fields.writ2, fields.writ3, fields.writ4]
      for (let i = 0; i < effectIds.length; i += 1) {
        const effectId = effectIds[i]
        if (effectId === undefined) {
          break
        }
        const effect = effectById(effectId)
        if (effect === undefined) {
          return fail("Unknown potion effect:" + tostring(effectId))
        }
        effectLog[i + 1] = tostring(effectId) + " " + tostring(effect.name)
        o.effects[o.effects.length] = effect
      }

      const logT = {
        solventId,
        is_poison: o.is_poison,
        effects: logFlatten("", effectLog),
      }
      logAdd(logT)

      const [e0, e1, e2] = o.effects
      if (e0 !== undefined && e1 !== undefined && e2 !== undefined) {
        o.r3list = toReagentThreeList(e0, e1, e2)
      }
      return o
    },

    GetRequiredCraftCt(this: Parser): number {
      const apiVersion = GetAPIVersion()
      let resultCt = 20
      if (100026 <= apiVersion) {
        resultCt = 16
      }

      let resultPerCraft = 4
      if (o.is_poison === true) {
        resultPerCraft = 16
      }
      return math.ceil(resultCt / resultPerCraft)
    },

    ToMatList(this: Parser): MatList {
      let minGold: GoldAmount = 9999999999
      let minR3: ReagentThree | undefined
      const matCt = o.GetRequiredCraftCt?.() ?? 0
      for (const r3 of o.r3list) {
        r3[0].mat = matRowFromName(r3[0].name, matCt)
        r3[1].mat = matRowFromName(r3[1].name, matCt)
        r3[2].mat = matRowFromName(r3[2].name, matCt)

        const matList: MatList = []
        const m0 = r3[0].mat
        const m1 = r3[1].mat
        const m2 = r3[2].mat
        if (m0 !== undefined) {
          matList[matList.length] = m0
        }
        if (m1 !== undefined) {
          matList[matList.length] = m1
        }
        if (m2 !== undefined) {
          matList[matList.length] = m2
        }
        const matTotal = listTotal(matList)
        if (matTotal === undefined) {
          logAdd("no total")
          minGold = TemperWrit.GOLD_UNKNOWN
          minR3 = r3
          break
        }
        if (minGold !== undefined && matTotal < minGold) {
          minGold = matTotal
          minR3 = r3
        }
      }

      o.matList = []
      if (o.is_poison === true) {
        const solvent = matRowFromName("Alkahest", matCt)
        if (solvent !== undefined) {
          o.matList[o.matList.length] = solvent
        }
      } else {
        const solvent = matRowFromName("Lorkhan's Tears", matCt)
        if (solvent !== undefined) {
          o.matList[o.matList.length] = solvent
        }
      }
      if (minR3 !== undefined) {
        const r0 = minR3[0].mat
        const r1 = minR3[1].mat
        const r2 = minR3[2].mat
        if (r0 !== undefined) {
          o.matList[o.matList.length] = r0
        }
        if (r1 !== undefined) {
          o.matList[o.matList.length] = r1
        }
        if (r2 !== undefined) {
          o.matList[o.matList.length] = r2
        }
      }

      return o.matList
    },

    ToKnowList(this: Parser): KnowList {
      logStartNewEvent("ToKnowList: %s", o.class)
      const threeReagents = AL_LABORATORY_USE.ToKnow()
      const fourPotsPer = AL_POTION_4X.ToKnow()
      fourPotsPer.is_warn = true
      const r: KnowList = [threeReagents, fourPotsPer]
      return r
    },
  }
  return o
}

export interface AlchemyParserNamespace {
  class: string
  New: (this: AlchemyParserNamespace) => AlchemyParser
}

const ALCHEMY_PARSER_NAMESPACE: AlchemyParserNamespace = {
  class: "alchemy",
  New: newAlchemyParser,
}

const ALCHEMY_NAMESPACE = TemperWrit.Alchemy
if (ALCHEMY_NAMESPACE !== undefined) {
  ALCHEMY_NAMESPACE.Parser = ALCHEMY_PARSER_NAMESPACE
}
