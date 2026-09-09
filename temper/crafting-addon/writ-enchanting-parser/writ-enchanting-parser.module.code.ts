import { startNewEvent as logStartNewEvent } from "../writ-log/writ-log.module.code.ts"
import { matRowFromName } from "../writ-mat-row/writ-mat-row.module.code.ts"
import { EN_ASPECT_GOLD } from "../writ-required-skill/writ-required-skill.module.code.ts"
import type { KnowList, MatList, MatRow, Parser } from "../writ-types/writ-types.module.code.ts"
import { fail } from "../writ-util/writ-util.module.code.ts"
import { toWritFields } from "../writ-writ-fields/writ-writ-fields.module.code.ts"

interface RUNE {
  name: string
  item_id: number
}

const REJERA: RUNE = { name: "Rejera", item_id: 64509 }
const REPORA: RUNE = { name: "Repora", item_id: 68341 }
const JEHADE: RUNE = { name: "Jehade", item_id: 64508 }
const ITADE: RUNE = { name: "Itade", item_id: 68340 }
const DEKEIPA: RUNE = { name: "Dekeipa", item_id: 45839 }
const DENI: RUNE = { name: "Deni", item_id: 45833 }
const DENIMA: RUNE = { name: "Denima", item_id: 45836 }
const DETERI: RUNE = { name: "Deteri", item_id: 45842 }
const HAOKO: RUNE = { name: "Haoko", item_id: 45841 }
const HAKEIJO: RUNE = { name: "Hakeijo", item_id: 68342 }
const KADERI: RUNE = { name: "Kaderi", item_id: 45849 }
const KUOKO: RUNE = { name: "Kuoko", item_id: 45837 }
const MAKDERI: RUNE = { name: "Makderi", item_id: 45848 }
const MAKKO: RUNE = { name: "Makko", item_id: 45832 }
const MAKKOMA: RUNE = { name: "Makkoma", item_id: 45835 }
const MEIP: RUNE = { name: "Meip", item_id: 45840 }
const OKO: RUNE = { name: "Oko", item_id: 45831 }
const OKOMA: RUNE = { name: "Okoma", item_id: 45834 }
const OKORI: RUNE = { name: "Okori", item_id: 45843 }
const ORU: RUNE = { name: "Oru", item_id: 45846 }
const RAKEIPA: RUNE = { name: "Rakeipa", item_id: 45838 }
const TADERI: RUNE = { name: "Taderi", item_id: 45847 }
const REKUTA: RUNE = { name: "Rekuta", item_id: 45853 }
const KUTA: RUNE = { name: "Kuta", item_id: 45854 }

const ADD = "add"
const SUB = "sub"
const CP150 = 207
const CP160 = 225
const PURPLE = 4
const GOLD = 5

const POTENCY_RUNES: Record<string, Record<number, RUNE | undefined> | undefined> = {
  [ADD]: {
    [CP150]: REJERA,
    [CP160]: REPORA,
  },
  [SUB]: {
    [CP150]: JEHADE,
    [CP160]: ITADE,
  },
}

const ASPECT_RUNES: Record<number, RUNE | undefined> = {
  [PURPLE]: REKUTA,
  [GOLD]: KUTA,
}

interface Glyph {
  name: string
  essenceRune: RUNE
  addSub: string
  glyphId: number
}

const GLYPHS: Record<number, Glyph | undefined> = {}

function newGlyph(name: string, essenceRune: RUNE, addSub: string, glyphId: number): Glyph {
  const o: Glyph = {
    name,
    essenceRune,
    addSub,
    glyphId,
  }
  GLYPHS[glyphId] = o
  return o
}

newGlyph("glyph_magicka", MAKKO, ADD, 26582)
newGlyph("glyph_stamina", DENI, ADD, 26588)
newGlyph("glyph_health", OKO, ADD, 26580)
newGlyph("glyph_prismatic_defense", HAKEIJO, ADD, 68343)
newGlyph("glyph_flame", RAKEIPA, ADD, 26848)
newGlyph("glyph_decrease_health", OKOMA, SUB, 45869)
newGlyph("glyph_weapon_damage", OKORI, ADD, 54484)
newGlyph("glyph_foulness", HAOKO, ADD, 26841)
newGlyph("glyph_poison", KUOKO, ADD, 26587)
newGlyph("glyph_frost", DEKEIPA, ADD, 5365)
newGlyph("glyph_shock", MEIP, ADD, 26844)
newGlyph("glyph_hardening", DETERI, ADD, 5366)
newGlyph("glyph_crushing", DETERI, SUB, 26845)
newGlyph("glyph_weakening", OKORI, SUB, 26591)
newGlyph("glyph_absorb_health", OKO, SUB, 43573)
newGlyph("glyph_absorb_stamina", DENI, SUB, 45867)
newGlyph("glyph_absorb_magicka", MAKKO, SUB, 45868)
newGlyph("glyph_prismatic_onslaught", HAKEIJO, SUB, 68344)
newGlyph("glyph_frost_resist", DEKEIPA, SUB, 5364)
newGlyph("glyph_stamina_recovery", DENIMA, ADD, 26589)
newGlyph("glyph_reduce_feat_cost", DENIMA, SUB, 45871)
newGlyph("glyph_disease_resist", HAOKO, SUB, 26847)
newGlyph("glyph_bashing", KADERI, ADD, 45872)
newGlyph("glyph_shielding", KADERI, SUB, 45873)
newGlyph("glyph_poison_resist", KUOKO, SUB, 26586)
newGlyph("glyph_increase_magical_harm", MAKDERI, ADD, 45884)
newGlyph("glyph_decrease_spell_harm", MAKDERI, SUB, 45886)
newGlyph("glyph_magicka_recovery", MAKKOMA, ADD, 26583)
newGlyph("glyph_reduce_spell_cost", MAKKOMA, SUB, 45870)
newGlyph("glyph_shock_resist", MEIP, SUB, 43570)
newGlyph("glyph_health_recovery", OKOMA, ADD, 26581)
newGlyph("glyph_potion_boost", ORU, ADD, 45874)
newGlyph("glyph_potion_speed", ORU, SUB, 45875)
newGlyph("glyph_flame_resist", RAKEIPA, SUB, 26849)
newGlyph("glyph_increase_physical_harm", TADERI, ADD, 45883)
newGlyph("glyph_decrease_physical_harm", TADERI, SUB, 45885)

interface EnchantingParser extends Parser {
  glyph: Glyph | undefined
  aspect_rune: RUNE | undefined
  potency_rune: RUNE | undefined
  level: number
  qualityNum: number
}

export function newEnchantingParser(): EnchantingParser {
  const o: EnchantingParser = {
    class: "enchanting",
    crafting_type: CRAFTING_TYPE_ENCHANTING,
    glyph: undefined,
    aspect_rune: undefined,
    potency_rune: undefined,
    level: 0,
    qualityNum: 0,

    ParseItemLink(this: Parser, itemLink: string): Parser | undefined {
      logStartNewEvent("ParseItemLink: %s %s", o.class, itemLink)
      const fields = toWritFields(itemLink)
      const glyphId = fields.writ1
      const levelNum = fields.writ2
      const qualityNum = fields.writ3

      if (levelNum === CP150) {
        o.level = 150
      } else {
        o.level = 160
      }
      o.qualityNum = qualityNum ?? 0

      const glyph = glyphId !== undefined ? GLYPHS[glyphId] : undefined
      o.glyph = glyph

      const potencyByLevel = glyph !== undefined ? POTENCY_RUNES[glyph.addSub] : undefined
      const potencyRune =
        potencyByLevel !== undefined && levelNum !== undefined
          ? potencyByLevel[levelNum]
          : undefined
      const aspectRune = qualityNum !== undefined ? ASPECT_RUNES[qualityNum] : undefined
      if (
        !(
          glyph !== undefined &&
          potencyByLevel !== undefined &&
          levelNum !== undefined &&
          potencyRune !== undefined &&
          qualityNum !== undefined &&
          aspectRune !== undefined
        )
      ) {
        return fail("Glyph not found:" + tostring(glyphId))
      }
      o.potency_rune = potencyRune
      o.aspect_rune = aspectRune

      return o
    },

    ToMatList(this: Parser): MatList {
      const ml: MatList = []
      const potency = o.potency_rune
      const glyph = o.glyph
      const aspect = o.aspect_rune
      if (potency !== undefined) {
        pushRow(ml, matRowFromName(potency.name))
      }
      if (glyph !== undefined) {
        pushRow(ml, matRowFromName(glyph.essenceRune.name))
      }
      if (aspect !== undefined) {
        pushRow(ml, matRowFromName(aspect.name))
      }
      return ml
    },

    ToKnowList(this: Parser): KnowList {
      if (o.aspect_rune === KUTA) {
        logStartNewEvent("ToKnowList: %s", o.class)
        const kuta = EN_ASPECT_GOLD.ToKnow()
        return [kuta]
      }
      return []
    },
  }
  return o
}

function pushRow(ml: MatList, row: MatRow | undefined): undefined {
  if (row !== undefined) {
    ml[ml.length] = row
  }
}

export interface EnchantingParserNamespace {
  class: string
  New: (this: EnchantingParserNamespace) => EnchantingParser
}

const ENCHANTING_PARSER_NAMESPACE: EnchantingParserNamespace = {
  class: "enchanting",
  New: newEnchantingParser,
}

export interface EnchantingNamespace {
  Parser: EnchantingParserNamespace
}

const ENCHANTING_NAMESPACE: EnchantingNamespace = {
  Parser: ENCHANTING_PARSER_NAMESPACE,
}

TemperWrit.Enchanting = ENCHANTING_NAMESPACE
