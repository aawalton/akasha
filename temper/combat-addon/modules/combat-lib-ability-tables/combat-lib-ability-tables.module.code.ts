export type AbilityConversionEntry = readonly [
  number | undefined,
  number | undefined,
  number | undefined,
  number | undefined,
]

function sparseEntry(
  convertedId: number | undefined,
  result: number | undefined,
  convertedId2: number | undefined,
  result2: number | undefined
): AbilityConversionEntry {
  return [convertedId, result, convertedId2, result2]
}

export const ABILITY_CONVERSIONS: Record<number, AbilityConversionEntry> = {
  [22178]: [22179, 2240, undefined, undefined],
  [22182]: [22183, 2240, undefined, undefined],
  [22180]: [49091, 2240, undefined, undefined],

  [26209]: [26220, 2240, undefined, undefined],
  [26807]: [26809, 2240, undefined, undefined],
  [26821]: [29824, undefined, undefined, undefined],

  [29173]: [53881, 2240, undefined, undefined],
  [39089]: [62775, 2240, undefined, undefined],
  [39095]: [62787, 2240, undefined, undefined],

  [28799]: [146553, undefined, undefined, undefined],
  [39162]: [170989, undefined, undefined, undefined],
  [39167]: [146593, undefined, undefined, undefined],
  [39163]: [170990, undefined, undefined, undefined],

  [29556]: [63015, 2240, undefined, undefined],
  [39195]: [63019, 2240, undefined, undefined],
  [39192]: [63030, 2240, undefined, undefined],

  [103492]: [103492, 2240, 103492, 2250],
  [103652]: [103652, 2240, 103652, 2250],
  [103665]: [103665, 2240, 103665, 2250],

  [103503]: [103521, 2240, undefined, undefined],
  [103706]: sparseEntry(103706, undefined, 103708, 2240),
  [103710]: [122260, 2240, undefined, undefined],

  [103478]: [108609, 2240, undefined, undefined],
  [103557]: [108621, 2240, undefined, undefined],
  [103564]: [108641, 2240, undefined, undefined],

  [61503]: [61504, 2240, undefined, undefined],
  [61505]: [61506, 2240, undefined, undefined],
  [61507]: [61509, 2240, undefined, undefined],

  [38566]: [101161, 2240, undefined, undefined],
  [40211]: [101169, 2240, undefined, undefined],
  [40215]: [101178, 2240, undefined, undefined],

  [38563]: [38564, 2240, undefined, undefined],
  [40223]: [40224, 2240, undefined, undefined],
  [40220]: [40221, 2240, undefined, undefined],

  [28279]: [28279, 2200, 28279, undefined],
  [38814]: [38814, 2200, 38814, undefined],
  [38807]: [38807, 2200, 38807, undefined],

  [83600]: [83600, 2200, 85156, 2240],
  [85187]: [85187, 2200, 85192, 2240],
  [85179]: [85179, 2200, 85182, 2240],

  [31531]: [88565, 2240, undefined, undefined],
  [40109]: [88575, 2240, undefined, undefined],
  [40116]: [88606, undefined, undefined, undefined],

  [29043]: [92507, 2240, undefined, undefined],
  [31874]: [92503, 2240, undefined, undefined],
  [31888]: [92512, 2240, undefined, undefined],

  [33375]: [90587, 2240, undefined, undefined],
  [35414]: [90593, 2240, undefined, undefined],
  [35419]: [90620, 2240, undefined, undefined],

  [35445]: [35451, 2250, undefined, undefined],

  [24584]: sparseEntry(undefined, undefined, 114903, 2250),
  [24595]: sparseEntry(undefined, undefined, 114908, 2250),
  [24589]: sparseEntry(undefined, undefined, 114909, 2250),

  [108840]: [108842, 2240, undefined, undefined],
  [76076]: [76078, undefined, undefined, undefined],
  [77182]: [77187, 2240, undefined, undefined],

  [108845]: [108846, 16, undefined, undefined],
  [77140]: [77354, 2240, undefined, undefined],
  [77369]: [77371, 16, undefined, undefined],

  [23234]: [51392, 2240, undefined, undefined],
  [23236]: [51392, 2240, undefined, undefined],

  [85922]: [85841, undefined, undefined, undefined],

  [86122]: [86224, 2240, undefined, undefined],
  [86126]: [88758, 2240, undefined, undefined],
  [86130]: [88761, 2240, undefined, undefined],

  [115238]: [119372, 2240, undefined, undefined],
  [118623]: [118624, 2240, undefined, undefined],
  [118639]: [121797, 2240, undefined, undefined],

  [114860]: [114861, 2240, undefined, undefined],
  [117330]: [114861, 2240, undefined, undefined],
  [117690]: [117691, 2240, undefined, undefined],
  [117693]: [117691, 2240, undefined, undefined],
  [117749]: [117750, 2240, undefined, undefined],
  [117773]: [117750, 2240, undefined, undefined],

  [117940]: [117947, 2240, undefined, undefined],

  [28567]: [126370, 2240, undefined, undefined],
  [40457]: [126374, 2240, undefined, undefined],
  [40452]: [126371, 2240, undefined, undefined],

  [16536]: [163227, 2240, undefined, undefined],
  [40493]: [163236, 2240, undefined, undefined],
  [40489]: [163238, 2240, undefined, undefined],

  [185836]: [185838, 2240, undefined, undefined],
  [201286]: [185838, 2240, undefined, undefined],
  [185839]: [185841, 2240, undefined, undefined],
  [201293]: [185841, 2240, undefined, undefined],
  [182988]: [182989, 2240, undefined, undefined],
  [201296]: [182989, 2240, undefined, undefined],

  [185912]: [185913, 2240, undefined, undefined],
  [186489]: [186490, 2240, undefined, undefined],

  [222678]: [217528, 2240, undefined, undefined],
}

export const ABILITY_ADDITIONS: Record<number, number> = {
  [61902]: 61907,
  [61907]: 61902,
  [61919]: 61930,
  [61930]: 61919,
  [61927]: 61932,
  [61932]: 61927,
  [46324]: 114716,
  [114716]: 46324,
  [185836]: 201286,
  [201286]: 185836,
  [185839]: 201293,
  [201293]: 185839,
  [182988]: 201296,
  [201296]: 182988,
  [185794]: 188658,
  [188658]: 185794,
  [185805]: 193331,
  [193331]: 185805,
  [183261]: 198282,
  [198282]: 183261,
  [183537]: 198309,
  [198309]: 183537,
  [183447]: 198563,
  [198563]: 183447,
  [185803]: 188787,
  [188787]: 185803,
  [183122]: 193397,
  [193397]: 183122,
  [186189]: 198288,
  [198288]: 186189,
  [186193]: 198330,
  [198330]: 186193,
  [186207]: 198564,
  [198564]: 186207,
  [182977]: 188780,
  [188780]: 182977,
  [186366]: 193398,
  [193398]: 186366,
  [186191]: 198292,
  [198292]: 186191,
  [186200]: 198537,
  [198537]: 186200,
  [186209]: 198567,
  [198567]: 186209,
}

export const ABILITY_ADDITIONS_REVERSE: Record<number, number> = {}
for (const [k, v] of pairs(ABILITY_ADDITIONS)) {
  ABILITY_ADDITIONS_REVERSE[v] = k
}

export const DIRECT_HEAVY_ATTACKS: Record<number, boolean> = {
  [16041]: true,
  [15279]: true,
  [16420]: true,
  [16691]: true,
  [15383]: true,
  [16261]: true,
  [32477]: true,
}

export const VALID_SKILL_START_RESULTS: Record<number, boolean> = {
  [ACTION_RESULT_BLOCKED_DAMAGE]: true,
  [ACTION_RESULT_DAMAGE_SHIELDED]: true,
  [ACTION_RESULT_SNARED]: true,
  [ACTION_RESULT_BEGIN]: true,
  [ACTION_RESULT_EFFECT_GAINED]: true,
  [ACTION_RESULT_KNOCKBACK]: true,
  [ACTION_RESULT_IMMUNE]: true,
}

export const VALID_NON_PROJECTILE_SKILL_START_RESULTS: Record<number, boolean> = {
  [ACTION_RESULT_DAMAGE]: true,
  [ACTION_RESULT_CRITICAL_DAMAGE]: true,
  [ACTION_RESULT_HEAL]: true,
  [ACTION_RESULT_CRITICAL_HEAL]: true,
}

export const VALID_SKILL_END_RESULTS: Record<number, boolean> = {
  [ACTION_RESULT_EFFECT_GAINED]: true,
  [ACTION_RESULT_EFFECT_FADED]: true,
}
