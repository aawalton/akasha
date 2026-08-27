import { newKnow } from "./know"
import { add as logAdd, startNewEvent as logStartNewEvent, warn as logWarn } from "./log"
import { matRowFromLink, matRowFromName } from "./mat-row"
import type { SetBonus, SmithingParser } from "./smithing-parser-types"
import { QUALITY, QUALITY_JEWELRY, REQUEST_ITEMS } from "./smithing-schema"
import type { School } from "./smithing-schema-types"
import type { Know, KnowList, MatList, MatRow } from "./types"
import { KNOW } from "./types"
import { fail, red, toWritFields } from "./util"

type MatRowMimic = MatRow & { can_mimic?: boolean }

let client_lang: string | undefined

type LibSetsAccessor = (this: void) => TemperWritLibSetsApi | undefined

function isLibSetsAccessor(this: void, value: unknown): value is LibSetsAccessor {
  return value !== undefined
}

function libSetsHasGetSetName(
  this: void,
  lib: LibSetsApi
): lib is LibSetsApi & TemperWritLibSetsApi {
  return "GetSetName" in lib
}

function lckHasMotifApi(
  this: void,
  lck: LibCharacterKnowledgeApi | undefined
): lck is LibCharacterKnowledgeApi & TemperWritLckMotifApi {
  return lck !== undefined
}

export function getSetBonus(this: void, _parser: SmithingParser, set_id: number): SetBonus {
  const r: SetBonus = { name: undefined, trait_ct: undefined, set_id: undefined }
  if (client_lang === undefined) {
    client_lang = GetCVar("language.2")
  }
  const libAccessorRaw = TemperWrit.LibSets
  const lib = isLibSetsAccessor(libAccessorRaw) ? libAccessorRaw() : undefined
  if (lib !== undefined && lib.GetSetInfo !== undefined) {
    const si = lib.GetSetInfo(set_id)
    if (si !== undefined) {
      if (si.setNames !== undefined) {
        r.name = si.setNames[client_lang] ?? si.setNames["en"]
      }
      r.trait_ct = si.traitsNeeded
    } else {
      r.name = "Unknown Set " + tostring(set_id)
      r.trait_ct = 0
      logWarn(
        "LibSets lacks data for set_id:" +
          tostring(set_id) +
          ", using hardcoded: " +
          tostring(r.name)
      )
    }
  }
  const langRaw = TemperWrit.savedVariables?.lang
  const lang = typeof langRaw === "string" ? langRaw : undefined
  const forced = libSetsHasGetSetName(LibSets) ? LibSets.GetSetName(set_id, lang) : undefined
  r.name = forced ?? r.name

  if (r.set_id == null) {
    r.set_id = set_id
  }
  return r
}

export function parseItemLink(
  this: void,
  parser: SmithingParser,
  item_link: string
): SmithingParser | undefined {
  logStartNewEvent("ParseItemLink: %s %s", parser.class, item_link)
  const fields = toWritFields(item_link)
  const item_num = fields.writ1
  const quality_num = fields.writ3
  const set_num = fields.writ4
  const trait_num = fields.writ5
  const motif_num = fields.writ6

  parser.request_item = item_num !== undefined ? REQUEST_ITEMS[item_num] : undefined
  const request_item = parser.request_item
  if (request_item === undefined) {
    return undefined
  }
  if (request_item.tr == null) {
    const gear = TemperWrit.Gear
    request_item.tr = request_item.item_name
    request_item.item_name =
      (gear !== undefined ? gear(request_item.example_item_id) : undefined) ??
      request_item.item_name
  }
  logAdd("request_item", tostring(item_num) + " " + tostring(request_item.item_name))
  parser.crafting_type = request_item.school.trade_skill_type
  parser.set_bonus = getSetBonus(parser, set_num ?? 0)
  if (parser.set_bonus === undefined) {
    return fail("set not found " + tostring(set_num))
  }
  logAdd("set_bonus", parser.set_bonus)

  const trait = request_item.trait_set[trait_num ?? 0]
  parser.trait = trait
  parser.trait_num = trait_num
  if (trait !== undefined) {
    const si = TemperWrit.SI
    if (trait.trait_name == null) {
      trait.trait_name = si !== undefined ? si("SI_ITEMTRAITTYPE" + tostring(trait_num)) : undefined
    }
    if (trait.mat_link == null) {
      trait.mat_link = GetSmithingTraitItemLink((trait_num ?? 0) + 1, LINK_STYLE_DEFAULT)
    }
  }
  logAdd("trait", parser.trait)

  parser.motif_num = motif_num
  parser.motif = undefined
  if (motif_num !== undefined && 0 < motif_num) {
    const motifName = TemperWrit.Motif
    parser.motif = {
      motif_num,
      motif_name: motifName !== undefined ? motifName(motif_num) : undefined,
      mat_item_link: GetItemStyleMaterialLink(motif_num, LINK_STYLE_DEFAULT),
    }
  }
  logAdd("motif", parser.motif)

  if (request_item.school.motif_required) {
    if (parser.motif === undefined) {
      return fail("motif not found " + tostring(motif_num))
    }
  } else {
    parser.motif_num = undefined
  }
  if (parser.crafting_type === CRAFTING_TYPE_JEWELRYCRAFTING) {
    parser.improve_level = quality_num !== undefined ? QUALITY_JEWELRY[quality_num] : undefined
  } else {
    parser.improve_level = quality_num !== undefined ? QUALITY[quality_num] : undefined
  }
  logAdd("improve", parser.improve_level)
  if (parser.improve_level === undefined) {
    return fail("quality not found " + tostring(quality_num))
  }
  return parser
}

export function toMatList(this: void, parser: SmithingParser): MatList {
  const request_item = parser.request_item
  const improve_level = parser.improve_level
  const trait = parser.trait
  if (request_item === undefined || improve_level === undefined || trait === undefined) {
    parser.mat_list = []
    return parser.mat_list
  }
  const ml: MatList = []
  const base = matRowFromName(request_item.school.base_mat_name, request_item.base_mat_ct)
  if (base !== undefined) {
    ml[ml.length] = base
  }
  if (trait.mat_link !== undefined) {
    const traitRow = matRowFromLink(trait.mat_link)
    if (traitRow !== undefined) {
      ml[ml.length] = traitRow
    }
  }
  if (parser.motif !== undefined && parser.motif.mat_item_link !== undefined) {
    const mat_row = matRowFromLink(parser.motif.mat_item_link)
    if (mat_row !== undefined) {
      const mimic_row: MatRowMimic = mat_row
      mimic_row.can_mimic = true
      ml[ml.length] = mat_row
    }
  }
  if (0 < improve_level.green_mat_ct) {
    const row = matRowFromName(request_item.school.green_mat_name, improve_level.green_mat_ct)
    if (row !== undefined) {
      ml[ml.length] = row
    }
  }
  if (0 < improve_level.blue_mat_ct) {
    const row = matRowFromName(request_item.school.blue_mat_name, improve_level.blue_mat_ct)
    if (row !== undefined) {
      ml[ml.length] = row
    }
  }
  if (0 < improve_level.purple_mat_ct) {
    const row = matRowFromName(request_item.school.purple_mat_name, improve_level.purple_mat_ct)
    if (row !== undefined) {
      ml[ml.length] = row
    }
  }
  if (0 < improve_level.gold_mat_ct) {
    const row = matRowFromName(request_item.school.gold_mat_name, improve_level.gold_mat_ct)
    if (row !== undefined) {
      ml[ml.length] = row
    }
  }
  parser.mat_list = ml
  return parser.mat_list
}

export function toKnowList(this: void, parser: SmithingParser): KnowList {
  logStartNewEvent("ToKnowList: %s", parser.class)
  const r: KnowList = []
  const request_item = parser.request_item
  if (request_item === undefined) {
    return r
  }

  const strLookup = TemperWrit.Str
  const str = (key: string): string => (strLookup !== undefined ? strLookup(key) : undefined) ?? ""

  const lck = LibCharacterKnowledge
  if (request_item.school.motif_required && parser.motif !== undefined && lckHasMotifApi(lck)) {
    const rr = lck.GetMotifKnowledgeForCharacter(
      parser.motif.motif_num,
      request_item.motif_page ?? 0
    )
    const motif_known = rr === lck.KNOWLEDGE_KNOWN

    const motif_name = parser.motif.motif_name
    const title = "motif " + tostring(motif_name)
    const fmt = str("know_err_motif")
    const msg = string.format(fmt, tostring(motif_name))
    r[r.length] = newKnow({
      name: title,
      is_known: motif_known,
      lack_msg: msg,
      how: KNOW.MOTIF,
    })
  }

  const trait = parser.trait
  const research_line = request_item.research_line ?? 0
  const [rawLineName] = GetSmithingResearchLineInfo(
    request_item.school.trade_skill_type,
    research_line
  )
  const line_name = string.lower(rawLineName)
  logAdd(
    "GetSmithingResearchLineInfo(" +
      "skill=" +
      tostring(request_item.school.trade_skill_type) +
      ", line=" +
      tostring(research_line) +
      ") = " +
      tostring(line_name)
  )
  if (trait !== undefined) {
    const [, , trait_known] = GetSmithingResearchLineTraitInfo(
      request_item.school.trade_skill_type,
      research_line,
      trait.trait_index
    )
    logAdd(
      "GetSmithingResearchLineTraitInfo(" +
        "skill=" +
        tostring(request_item.school.trade_skill_type) +
        ", line=" +
        tostring(research_line) +
        ", trait=" +
        tostring(trait.trait_index) +
        ") = " +
        tostring(trait_known)
    )
    const trait_name = trait.trait_name
    const title = "trait " + tostring(trait_name) + " " + line_name
    const fmt = str("know_err_trait")
    const msg = string.format(fmt, tostring(trait_name), line_name)
    r[r.length] = newKnow({
      name: title,
      is_known: trait_known,
      lack_msg: msg,
      how: KNOW.TRAIT,
    })
  }

  const set_bonus = parser.set_bonus
  if (set_bonus !== undefined && set_bonus.trait_ct !== undefined) {
    let known_trait_ct = 0
    const known_t: number[] = []
    for (const [, traitRow] of pairs(request_item.trait_set)) {
      if (traitRow !== undefined) {
        const [, , known] = GetSmithingResearchLineTraitInfo(
          request_item.school.trade_skill_type,
          research_line,
          traitRow.trait_index
        )
        let value = 0
        if (known) {
          value = 1
        }
        known_trait_ct = known_trait_ct + value
        known_t[traitRow.trait_index] = value
      }
    }
    logAdd(
      "known traits for " +
        "GSRLTI(skill=" +
        tostring(request_item.school.trade_skill_type) +
        ", line=" +
        tostring(research_line) +
        ", trait_index=?):" +
        table.concat(known_t, " ")
    )
    const title = tostring(set_bonus.trait_ct) + " traits for set bonus"
    const msg = string.format(
      str("know_err_trait_ct_too_low"),
      known_trait_ct,
      set_bonus.trait_ct,
      tostring(set_bonus.name)
    )
    r[r.length] = newKnow({
      name: title,
      is_known: set_bonus.trait_ct <= known_trait_ct,
      lack_msg: msg,
      how: KNOW.TRAIT_CT_FOR_SET,
    })
  }

  const improve_level = parser.improve_level
  if (improve_level !== undefined && improve_level.index === 5) {
    const skill = request_item.school.temper_skill
    const know: Know = skill.ToKnow()
    know.is_warn = true
    r[r.length] = know
  }

  return r
}

export function warningText(this: void, parser: SmithingParser): string | undefined {
  if (parser.motif !== undefined) {
    return undefined
  }
  const school: (School & { motif_require?: boolean }) | undefined = parser.request_item?.school
  if (parser.request_item !== undefined && school !== undefined && school.motif_require !== true) {
    return undefined
  }
  return red("Unknown motif: " + tostring(parser.motif_num))
}
