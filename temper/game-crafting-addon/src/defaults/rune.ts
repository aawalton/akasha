import { ChampionPointsTexture } from "../constants"

export interface RuneGlyphDef {
  1: number
  2: number
  3: number
  4: number
}

export interface RuneRefineGlyphEntry {
  location: [number, number][]
  crafted: boolean
  [key: string]: unknown
}

export interface RuneTable {
  level: Record<number, string>
  skillLevel: Record<number, number>
  aspectSkill: number
  potencySkill: number
  rune: Record<number, Record<number, number | Record<number, number>>>
  glyph: Record<number, Record<number, RuneGlyphDef>>
  job: { amount: number; slot: Record<number, number> }
  refine: { glyphs: RuneRefineGlyphEntry[]; crafted: boolean }
}

export const Rune: RuneTable = {
  level: {
    1: "1 - 10",
    2: "5 - 15",
    3: "10 - 20",
    4: "15 - 25",
    5: "20 - 30",
    6: "25 - 35",
    7: "30 - 40",
    8: "35 - 45",
    9: "40 - 50",
    10: ChampionPointsTexture + "10",
    11: ChampionPointsTexture + "30",
    12: ChampionPointsTexture + "50",
    13: ChampionPointsTexture + "70",
    14: ChampionPointsTexture + "100",
    15: ChampionPointsTexture + "150",
    16: ChampionPointsTexture + "160",
  },
  skillLevel: {
    1: 1,
    2: 1,
    3: 2,
    4: 2,
    5: 3,
    6: 3,
    7: 4,
    8: 4,
    9: 5,
    10: 5,
    11: 6,
    12: 7,
    13: 8,
    14: 9,
    15: 10,
    16: 10,
  },
  aspectSkill: 1,
  potencySkill: 1,
  rune: {
    [ITEMTYPE_ENCHANTING_RUNE_ESSENCE]: {
      1: 45831,
      2: 45832,
      3: 45833,
      4: 45834,
      5: 45835,
      6: 45836,
      7: 45837,
      8: 45838,
      9: 45839,
      10: 45840,
      11: 45841,
      12: 45842,
      13: 45843,
      14: 45846,
      15: 45847,
      16: 45848,
      17: 45849,
      18: 68342,
      19: 166045,
    },
    [ITEMTYPE_ENCHANTING_RUNE_POTENCY]: {
      1: {
        1: 45855,
        2: 45856,
        3: 45857,
        4: 45806,
        5: 45807,
        6: 45808,
        7: 45809,
        8: 45810,
        9: 45811,
        10: 45812,
        11: 45813,
        12: 45814,
        13: 45815,
        14: 45816,
        15: 64509,
        16: 68341,
      },
      2: {
        1: 45817,
        2: 45818,
        3: 45819,
        4: 45820,
        5: 45821,
        6: 45822,
        7: 45823,
        8: 45824,
        9: 45825,
        10: 45826,
        11: 45827,
        12: 45828,
        13: 45829,
        14: 45830,
        15: 64508,
        16: 68340,
      },
    },
    [ITEMTYPE_ENCHANTING_RUNE_ASPECT]: {
      1: 45850,
      2: 45851,
      3: 45852,
      4: 45853,
      5: 45854,
    },
  },
  glyph: {
    [ITEMTYPE_GLYPH_ARMOR]: {
      1: { 1: 26580, 2: 45831, 3: 1, 4: 1 },
      2: { 1: 26582, 2: 45832, 3: 1, 4: 2 },
      3: { 1: 26588, 2: 45833, 3: 1, 4: 3 },
      4: { 1: 68343, 2: 68342, 3: 1, 4: 4 },
    },
    [ITEMTYPE_GLYPH_WEAPON]: {
      1: { 1: 68344, 2: 68342, 3: 2, 4: 1 },
      2: { 1: 54484, 2: 45843, 3: 1, 4: 2 },
      3: { 1: 26845, 2: 45842, 3: 2, 4: 3 },
      4: { 1: 43573, 2: 45831, 3: 2, 4: 4 },
      5: { 1: 45868, 2: 45832, 3: 2, 4: 5 },
      6: { 1: 45867, 2: 45833, 3: 2, 4: 6 },
      7: { 1: 45869, 2: 45834, 3: 2, 4: 7 },
      8: { 1: 5365, 2: 45839, 3: 1, 4: 8 },
      9: { 1: 26848, 2: 45838, 3: 1, 4: 9 },
      10: { 1: 26844, 2: 45840, 3: 1, 4: 10 },
      11: { 1: 26587, 2: 45837, 3: 1, 4: 11 },
      12: { 1: 26841, 2: 45841, 3: 1, 4: 12 },
      13: { 1: 5366, 2: 45842, 3: 1, 4: 13 },
      14: { 1: 26591, 2: 45843, 3: 2, 4: 14 },
    },
    [ITEMTYPE_GLYPH_JEWELRY]: {
      1: { 1: 26581, 2: 45834, 3: 1, 4: 1 },
      2: { 1: 26583, 2: 45835, 3: 1, 4: 2 },
      3: { 1: 26589, 2: 45836, 3: 1, 4: 3 },
      4: { 1: 45870, 2: 45835, 3: 2, 4: 4 },
      5: { 1: 45871, 2: 45836, 3: 2, 4: 5 },
      6: { 1: 45883, 2: 45847, 3: 1, 4: 6 },
      7: { 1: 45884, 2: 45848, 3: 1, 4: 7 },
      8: { 1: 45885, 2: 45847, 3: 2, 4: 8 },
      9: { 1: 45886, 2: 45848, 3: 2, 4: 9 },
      10: { 1: 5364, 2: 45839, 3: 2, 4: 10 },
      11: { 1: 26849, 2: 45838, 3: 2, 4: 11 },
      12: { 1: 43570, 2: 45840, 3: 2, 4: 12 },
      13: { 1: 26586, 2: 45837, 3: 2, 4: 13 },
      14: { 1: 26847, 2: 45841, 3: 2, 4: 14 },
      15: { 1: 45872, 2: 45849, 3: 1, 4: 15 },
      16: { 1: 45873, 2: 45849, 3: 2, 4: 16 },
      17: { 1: 45874, 2: 45846, 3: 1, 4: 17 },
      18: { 1: 45875, 2: 45846, 3: 2, 4: 18 },
      19: { 1: 166046, 2: 166045, 3: 2, 4: 19 },
      20: { 1: 166047, 2: 166045, 3: 1, 4: 19 },
    },
  },
  job: { amount: 0, slot: { 1: 0, 2: 0, 3: 0 } },
  refine: { glyphs: [], crafted: false },
}
