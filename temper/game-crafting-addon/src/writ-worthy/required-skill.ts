import { newKnow } from "./know"
import { add as logAdd, endEvent as logEndEvent, startNewEvent as logStartNewEvent } from "./log"
import type { Know } from "./types"
import { KNOW } from "./types"
import { decaret } from "./util"

interface SkillIndexRow {
  id: number
  name: string | undefined
  skill_index: number
  ability_index: number
}

type NameToIndices = Record<string, SkillIndexRow | undefined>

export interface RequiredSkill {
  function_name: string
  skill_name_list: string[]
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
  FetchInfo: (this: RequiredSkill) => void
  FetchUpgradeInfo: (this: RequiredSkill) => void
  GetIndices: (this: RequiredSkill) => LuaMultiReturn<[number | undefined, number | undefined]>
}

const ALL: RequiredSkill[] = []

let name_to_indices: NameToIndices | undefined

export function newRequiredSkill(
  function_name: string,
  skill_name_list: string[],
  is_reduction?: boolean
): RequiredSkill {
  const o: RequiredSkill = {
    function_name,
    skill_name_list,
    _skill_index: undefined,
    _ability_index: undefined,
    _name: undefined,
    _is_purchased: undefined,
    _is_maxxed: undefined,
    _have: undefined,
    _max: undefined,
    _is_reduction: is_reduction,

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

      this._name = this.skill_name_list[0]
      this._is_purchased = true

      const [skill_index, ability_index] = this.GetIndices()
      if (!(skill_index !== undefined && ability_index !== undefined)) {
        return
      }
      const [name, , , , , purchased] = GetSkillAbilityInfo(
        SKILL_TYPE_TRADESKILL,
        skill_index,
        ability_index
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

      const [skill_index, ability_index] = this.GetIndices()
      if (!(skill_index !== undefined && ability_index !== undefined)) {
        return
      }

      const [have, max] = GetSkillAbilityUpgradeInfo(
        SKILL_TYPE_TRADESKILL,
        skill_index,
        ability_index
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

      for (const skillName of this.skill_name_list) {
        const r = name_to_indices[decaret(skillName)]
        if (r !== undefined) {
          this._skill_index = r.skill_index
          this._ability_index = r.ability_index
          break
        }
      }
      if (this._skill_index === undefined && this._ability_index !== undefined) {
        d("TemperWrit: unable to find skill indices for name:" + tostring(this.skill_name_list[0]))
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
  const skill_type = SKILL_TYPE_TRADESKILL
  const num_lines = GetNumSkillLines(skill_type)
  logAdd("t:" + tostring(skill_type) + "  num_lines:" + tostring(num_lines))
  for (let skill_index = 1; skill_index <= num_lines; skill_index += 1) {
    const num_abilities = GetNumSkillAbilities(skill_type, skill_index)
    logAdd(
      "t:" +
        tostring(skill_type) +
        " i:" +
        tostring(skill_index) +
        "  num_abilities:" +
        tostring(num_abilities)
    )
    for (let ability_index = 1; ability_index <= num_abilities; ability_index += 1) {
      const [name, tex, earnedRank, passive, ultimate, purchased, progression] =
        GetSkillAbilityInfo(skill_type, skill_index, ability_index)
      const id = GetSkillAbilityId(skill_type, skill_index, ability_index, false)
      logAdd(
        "t i a:" +
          tostring(skill_type) +
          " " +
          tostring(skill_index) +
          " " +
          tostring(ability_index) +
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
        skill_index,
        ability_index,
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
    function_name: string,
    skill_name_list: string[],
    is_reduction?: boolean
  ) => RequiredSkill
  ResetCache: (this: void) => void
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

const requiredSkillNamespace: RequiredSkillNamespace = {
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

TemperWrit.RequiredSkill = requiredSkillNamespace
