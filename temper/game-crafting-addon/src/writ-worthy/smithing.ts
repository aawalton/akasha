import { warn as logWarn } from "./log"
import { newSmithingParser } from "./smithing-parser"
import type { SmithingParser } from "./smithing-parser-types"
import { smithingInit } from "./smithing-schema"
import type { School } from "./smithing-schema-types"

interface MotifEntry {
  pages_id?: number
}

function parseLuaCapture(captured: string | number | undefined): string | undefined {
  return typeof captured === "string" ? captured : undefined
}

export function smithingDiscover(this: void): undefined {
  const sv: Record<string, unknown> = TemperWrit.savedVariables ?? {}
  TemperWrit.savedVariables = sv
  const discover: Record<string, unknown> = {}
  sv["discover"] = discover

  const set: Record<number, string | undefined> = {}
  let set_ct = 0
  {
    const t = "|H1:item:138798:6:1:0:0:0:18:255:4:%d:23:0:0:0:0:0:0:0:0:0:76000|h|h"
    const re = "Set: ([^;]*)"
    for (let i = 1; i <= 500; i += 1) {
      const item_link = string.format(t, i)
      const b = GenerateMasterWritBaseText(item_link)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      set[i] = f
      if (f !== undefined) {
        set_ct = set_ct + 1
      }
    }
  }
  discover["writ4_smithing_set_bonus"] = set
  d("TemperWrit: discovered set_ct:" + tostring(set_ct))

  const item: Record<number, string | undefined> = {}
  let item_ct = 0
  {
    const t = "|H1:item:138798:6:1:0:0:0:%d:255:4:37:23:0:0:0:0:0:0:0:0:0:76000|h|h"
    const re = "Craft an? (.*);"
    for (let i = 1; i <= 100; i += 1) {
      const item_link = string.format(t, i)
      const b = GenerateMasterWritBaseText(item_link)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      item[i] = f
      if (f !== undefined) {
        item_ct = item_ct + 1
      }
    }
  }
  discover["writ4_smithing_item"] = item
  d("TemperWrit: discovered item_ct:" + tostring(item_ct))

  const mat: Record<number, string | undefined> = {}
  let mat_ct = 0
  {
    const t = "|H1:item:138798:6:1:0:0:0:18:%d:4:37:23:0:0:0:0:0:0:0:0:0:76000|h|h"
    const re = "Craft an? ([^;]*);"
    for (let i = 170; i <= 255; i += 1) {
      const item_link = string.format(t, i)
      const b = GenerateMasterWritBaseText(item_link)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      mat[i] = f
      if (f !== undefined) {
        mat_ct = mat_ct + 1
      }
    }
  }
  discover["writ2_smithing_mat"] = mat
  d("TemperWrit: discovered mat_ct:" + tostring(mat_ct))

  const trait: Record<number, string | undefined> = {}
  let trait_ct = 0
  {
    const t = "|H1:item:119563:6:1:0:0:0:56:188:4:324:%d:51:0:0:0:0:0:0:0:0:72000|h|h"
    const re = "Trait: ([^;]*);"
    for (let i = 1; i <= 50; i += 1) {
      const item_link = string.format(t, i)
      const b = GenerateMasterWritBaseText(item_link)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      trait[i] = f
      if (f !== undefined) {
        trait_ct = trait_ct + 1
      }
    }
  }
  discover["writ5_smithing_trait"] = trait
  d("TemperWrit: discovered trait_ct:" + tostring(trait_ct))

  const motif: Record<number, string | undefined> = {}
  let motif_ct = 0
  {
    const t = "|H1:item:119563:6:1:0:0:0:56:188:4:324:4:%d:0:0:0:0:0:0:0:0:72000|h|h"
    const re = "Style: ([^;]*)"
    for (let i = 1; i <= 100; i += 1) {
      const item_link = string.format(t, i)
      const b = GenerateMasterWritBaseText(item_link)
      const [, , rawF] = string.find(b, re)
      const f = parseLuaCapture(rawF)
      motif[i] = f
      if (f !== undefined) {
        motif_ct = motif_ct + 1
      }
    }
  }
  discover["writ6_smithing_motif"] = motif
  d("TemperWrit: discovered motif_ct:" + tostring(motif_ct))

  const skill_line: Record<number, unknown> = {}
  const skill_line_ct = GetNumSkillLines(SKILL_TYPE_TRADESKILL)
  let total_ability_ct = 0
  for (let skill_index = 1; skill_index <= skill_line_ct; skill_index += 1) {
    const [name, rank, discovered, skill_line_id, advised, unlock_text] = GetSkillLineInfo(
      SKILL_TYPE_TRADESKILL,
      skill_index
    )
    const ability: Record<number, unknown> = {}
    const ss = {
      name,
      rank,
      discovered,
      skill_line_id,
      advised,
      unlock_text,
      ability,
    }
    skill_line[skill_index] = ss

    const ability_ct = GetNumSkillAbilities(SKILL_TYPE_TRADESKILL, skill_index)
    for (let ability_index = 1; ability_index <= ability_ct; ability_index += 1) {
      const [
        aName,
        texture_name,
        earned_rank,
        passive,
        ultimate,
        purchased,
        progression_index,
        rank_index,
      ] = GetSkillAbilityInfo(SKILL_TYPE_TRADESKILL, skill_index, ability_index)
      const ability_id = GetSkillAbilityId(SKILL_TYPE_TRADESKILL, skill_index, ability_index, false)
      const aa = {
        name: aName,
        texture_name,
        earned_rank,
        passive,
        ultimate,
        purchased,
        progression_index,
        rank_index,
        ability_id,
      }
      ability[ability_index] = aa
      total_ability_ct = total_ability_ct + 1
    }
  }
  discover["skill_line"] = skill_line
  d("TemperWrit: discovered ability_ct:" + tostring(total_ability_ct))
}

export function smithingScanMotifs(this: void): undefined {
  const achieve_known: Record<number, number> = {}
  const motifTable = TemperWrit.Smithing?.MOTIF
  if (motifTable !== undefined) {
    for (const [motif_id, motif_t] of pairs(motifTable)) {
      if (motif_t !== undefined && motif_t.pages_id !== undefined) {
        achieve_known[motif_t.pages_id] = motif_id
      }
    }
  }
  achieve_known[2230] = 0
  achieve_known[1418] = 0
  achieve_known[1043] = 0
  achieve_known[1030] = 0

  const cat_ct = GetNumAchievementCategories()
  for (let cat_i = 1; cat_i <= cat_ct; cat_i += 1) {
    const [, subcat_ct, achieve_subcat0_ct] = GetAchievementCategoryInfo(cat_i)
    let achieve_ct = 0
    for (let subcat_i = 0; subcat_i <= subcat_ct; subcat_i += 1) {
      let subcat_ii: number | undefined = subcat_i
      if (subcat_i === 0) {
        achieve_ct = achieve_subcat0_ct
        subcat_ii = undefined
      } else {
        const [, subAchieveCt] = GetAchievementSubCategoryInfo(cat_i, subcat_i)
        achieve_ct = subAchieveCt
      }

      for (let achieve_i = 1; achieve_i <= achieve_ct; achieve_i += 1) {
        const achieve_id = GetAchievementId(cat_i, subcat_ii, achieve_i)
        const [achieve_name] = GetAchievementInfo(achieve_id)

        if (achieve_known[achieve_id] !== undefined) {
        } else {
          const [match_start] = string.find(string.lower(achieve_name), "style master")
          if (match_start !== undefined) {
            logWarn("%d %s", achieve_id, achieve_name)
          }
        }
      }
    }
  }
}

export interface SmithingNamespace {
  Init: (this: void) => void
  Discover: (this: void) => void
  ScanMotifs: (this: void) => void
  Parser: {
    class: string
    New: (this: SmithingNamespace["Parser"]) => SmithingParser
  }
  MOTIF?: Record<number, MotifEntry | undefined>
  SCHOOL_WOOD?: School
  SCHOOL_JEWELRY?: School | undefined
}

const parserNamespace: SmithingNamespace["Parser"] = {
  class: "smithing",
  New: newSmithingParser,
}

const smithingNamespace: SmithingNamespace = {
  Init: smithingInit,
  Discover: smithingDiscover,
  ScanMotifs: smithingScanMotifs,
  Parser: parserNamespace,
}

TemperWrit.Smithing = smithingNamespace

export { newSmithingParser, smithingInit }
