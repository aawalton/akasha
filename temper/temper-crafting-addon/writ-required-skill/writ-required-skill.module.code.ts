import { newKnow } from "../writ-know/writ-know.module.code.ts"
import {
  add as logAdd,
  endEvent as logEndEvent,
  startNewEvent as logStartNewEvent,
} from "../writ-log/writ-log.module.code.ts"
import type { Know } from "../writ-types/writ-types.module.code.ts"
import { KNOW } from "../writ-types/writ-types.module.code.ts"
import { decaret } from "../writ-util/writ-util.module.code.ts"

interface SkillIndexRow {
  id: number
  name: string | undefined
  skillIndex: number
  abilityIndex: number
}

type NameToIndices = Record<string, SkillIndexRow | undefined>

export interface RequiredSkill {
  function_name: string
  skillNameList: string[]
  _skill_index: number | undefined
  _ability_index: number | undefined
  _name: string | undefined
  _is_purchased: boolean | undefined
  _is_purchsed?: undefined
  _is_maxxed: boolean | undefined
  _have: number | undefined
  _max: number | undefined
  _is_reduction: boolean | undefined
  ToKnow: (this: RequiredSkill) => Know
  IsKnown: (this: RequiredSkill) => boolean
  Name: (this: RequiredSkill) => string
  IsPurchased: (this: RequiredSkill) => boolean
  IsMaxxed: (this: RequiredSkill) => boolean
  FetchInfo: (this: RequiredSkill) => undefined
  FetchUpgradeInfo: (this: RequiredSkill) => undefined
  GetIndices: (this: RequiredSkill) => LuaMultiReturn<[number | undefined, number | undefined]>
}

const ALL: RequiredSkill[] = []

let name_to_indices: NameToIndices | undefined

export function newRequiredSkill(
  functionName: string,
  skillNameList: string[],
  isReduction?: boolean
): RequiredSkill {
  const o: RequiredSkill = {
    function_name: functionName,
    skillNameList,
    _skill_index: undefined,
    _ability_index: undefined,
    _name: undefined,
    _is_purchased: undefined,
    _is_maxxed: undefined,
    _have: undefined,
    _max: undefined,
    _is_reduction: isReduction,

    ToKnow(this: RequiredSkill): Know {
      let how = KNOW.SKILL_REQUIRED
      if (this._is_reduction === true) {
        how = KNOW.SKILL_COST_REDUCTION
      }
      const ww = TemperWrit.Str
      const str = (key: string): string => (ww !== undefined ? ww(key) : undefined) ?? key
      if (this.function_name === "IsMaxxed") {
        const known = this.IsKnown()
        const text = string.format(
          str("know_err_skill_not_maxed"),
          this.Name(),
          this._have ?? -1,
          this._max ?? -1
        )
        return newKnow({
          name: "Skill: " + this.Name(),
          is_known: known,
          lack_msg: text,
          how,
        })
      }
      const known = this.IsKnown()
      const text = string.format(str("know_err_skill_missing"), this.Name())
      return newKnow({
        name: "Skill: " + this.Name(),
        is_known: known,
        lack_msg: text,
        how,
      })
    },

    IsKnown(this: RequiredSkill): boolean {
      if (this.function_name === "IsMaxxed") {
        return this.IsMaxxed()
      }
      return this.IsPurchased()
    },

    Name(this: RequiredSkill): string {
      if (this._name === undefined) {
        this.FetchInfo()
      }
      if (this._name === undefined) {
        return "?"
      }
      return decaret(this._name)
    },

    IsPurchased(this: RequiredSkill): boolean {
      const purchsed = this._is_purchsed
      if (purchsed === undefined) {
        this.FetchInfo()
      }
      return this._is_purchased ?? false
    },

    IsMaxxed(this: RequiredSkill): boolean {
      if (this._is_maxxed === undefined) {
        this.FetchInfo()
        this.FetchUpgradeInfo()
      }
      return this._is_maxxed ?? false
    },

    FetchInfo(this: RequiredSkill): undefined {
      if (this._name !== undefined && this._is_purchased !== undefined) {
        return
      }

      this._name = this.skillNameList[0]
      this._is_purchased = true

      const [skillIndex, abilityIndex] = this.GetIndices()
      if (!(skillIndex !== undefined && abilityIndex !== undefined)) {
        return
      }
      const [name, , , , , purchased] = GetSkillAbilityInfo(
        SKILL_TYPE_TRADESKILL,
        skillIndex,
        abilityIndex
      )
      if (!(name !== undefined)) {
        return
      }
      this._name = name
      this._is_purchased = purchased
    },

    FetchUpgradeInfo(this: RequiredSkill): undefined {
      if (this._have !== undefined && this._max !== undefined) {
        return
      }
      this._have = 0
      this._max = 0
      this._is_maxxed = true

      const [skillIndex, abilityIndex] = this.GetIndices()
      if (!(skillIndex !== undefined && abilityIndex !== undefined)) {
        return
      }

      const [have, max] = GetSkillAbilityUpgradeInfo(
        SKILL_TYPE_TRADESKILL,
        skillIndex,
        abilityIndex
      )
      if (!(have !== undefined && max !== undefined)) {
        return
      }
      this._have = have
      this._max = max
      this._is_maxxed = max <= have
    },

    GetIndices(this: RequiredSkill): LuaMultiReturn<[number | undefined, number | undefined]> {
      if (this._skill_index !== undefined && this._ability_index !== undefined) {
        return $multi(this._skill_index, this._ability_index)
      }

      if (name_to_indices === undefined) {
        name_to_indices = findAllSkills()
      }

      for (const skillName of this.skillNameList) {
        const r = name_to_indices[decaret(skillName)]
        if (r !== undefined) {
          this._skill_index = r.skillIndex
          this._ability_index = r.abilityIndex
          break
        }
      }
      if (this._skill_index === undefined && this._ability_index !== undefined) {
        d("TemperWrit: unable to find skill indices for name:" + tostring(this.skillNameList[0]))
      }
      return $multi(this._skill_index, this._ability_index)
    },
  }

  ALL[ALL.length] = o
  return o
}

export function resetCache(): undefined {
  for (const r of ALL) {
    r._name = undefined
    r._is_purchased = undefined
    r._is_maxxed = undefined
    r._have = undefined
    r._max = undefined
  }
}

export function findAllSkills(): NameToIndices {
  logStartNewEvent("FindAllSkills")
  const t: NameToIndices = {}
  logAdd("Scanning all skills...")
  const skillType = SKILL_TYPE_TRADESKILL
  const numLines = GetNumSkillLines(skillType)
  logAdd("t:" + tostring(skillType) + "  num_lines:" + tostring(numLines))
  for (let skillIndex = 1; skillIndex <= numLines; skillIndex += 1) {
    const numAbilities = GetNumSkillAbilities(skillType, skillIndex)
    logAdd(
      "t:" +
        tostring(skillType) +
        " i:" +
        tostring(skillIndex) +
        "  num_abilities:" +
        tostring(numAbilities)
    )
    for (let abilityIndex = 1; abilityIndex <= numAbilities; abilityIndex += 1) {
      const [name, tex, earnedRank, passive, ultimate, purchased, progression] =
        GetSkillAbilityInfo(skillType, skillIndex, abilityIndex)
      const id = GetSkillAbilityId(skillType, skillIndex, abilityIndex, false)
      logAdd(
        "t i a:" +
          tostring(skillType) +
          " " +
          tostring(skillIndex) +
          " " +
          tostring(abilityIndex) +
          " id:" +
          tostring(id) +
          " name:" +
          tostring(name) +
          " tex:" +
          tostring(tex) +
          " earnedRank:" +
          tostring(earnedRank) +
          " passive:" +
          tostring(passive) +
          " ultimate:" +
          tostring(ultimate) +
          " purchased:" +
          tostring(purchased) +
          " progression:" +
          tostring(progression)
      )
      t[decaret(name)] = {
        id,
        name,
        skillIndex,
        abilityIndex,
      }
    }
  }
  logEndEvent()
  return t
}

export const BS_TEMPER_EXPERTISE = newRequiredSkill(
  "IsMaxxed",
  ["Temper Expertise", "Härterkenntnis", "Expertise de la trempe^f"],
  true
)
export const CL_TEMPER_EXPERTISE = newRequiredSkill(
  "IsMaxxed",
  ["Tannin Expertise", "Gerberkunde", "Expertise en tanins^f"],
  true
)
export const WW_TEMPER_EXPERTISE = newRequiredSkill(
  "IsMaxxed",
  ["Resin Expertise", "Harzkenntnis", "Expertise en résines^f"],
  true
)
export const JW_TEMPER_EXPERTISE = newRequiredSkill("IsMaxxed", ["Platings Expertise"], true)
export const EN_ASPECT_GOLD = newRequiredSkill("IsMaxxed", [
  "Aspect Improvement",
  "Aspektverbesserung",
  "Amélioration d'aspect^f",
])
export const PR_FOOD_4X = newRequiredSkill("IsMaxxed", ["Chef", "Kochkunst", "Chef^m"], true)
export const PR_DRINK_4X = newRequiredSkill(
  "IsMaxxed",
  ["Brewer", "Braukunst", "Brasserie^f"],
  true
)
export const AL_POTION_4X = newRequiredSkill("IsMaxxed", ["Chemistry", "Chemie", "Chimie"], true)
export const AL_LABORATORY_USE = newRequiredSkill("IsPurchased", [
  "Laboratory Use",
  "Laborkenntnis",
  "Utilisation du laboratoire^f",
])

export interface RequiredSkillNamespace {
  New: (
    this: RequiredSkillNamespace,
    functionName: string,
    skillNameList: string[],
    isReduction?: boolean
  ) => RequiredSkill
  ResetCache: (this: void) => undefined
  FindAllSkills: (this: void) => NameToIndices
  ALL: RequiredSkill[]
  BS_TEMPER_EXPERTISE: RequiredSkill
  CL_TEMPER_EXPERTISE: RequiredSkill
  WW_TEMPER_EXPERTISE: RequiredSkill
  JW_TEMPER_EXPERTISE: RequiredSkill
  EN_ASPECT_GOLD: RequiredSkill
  PR_FOOD_4X: RequiredSkill
  PR_DRINK_4X: RequiredSkill
  AL_POTION_4X: RequiredSkill
  AL_LABORATORY_USE: RequiredSkill
}

const REQUIRED_SKILL_NAMESPACE: RequiredSkillNamespace = {
  New: newRequiredSkill,
  ResetCache: resetCache,
  FindAllSkills: findAllSkills,
  ALL,
  BS_TEMPER_EXPERTISE,
  CL_TEMPER_EXPERTISE,
  WW_TEMPER_EXPERTISE,
  JW_TEMPER_EXPERTISE,
  EN_ASPECT_GOLD,
  PR_FOOD_4X,
  PR_DRINK_4X,
  AL_POTION_4X,
  AL_LABORATORY_USE,
}

TemperWrit.RequiredSkill = REQUIRED_SKILL_NAMESPACE
