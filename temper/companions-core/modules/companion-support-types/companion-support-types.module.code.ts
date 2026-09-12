export interface ReferenceBaseline {
  buffUptimes: Map<string, number>
  referenceDps: number
  baseDamageBuffMultiplier: number
  baseVulnerabilityMultiplier: number
  baseBreachPenetration: number
  basePenetration: number
  targetArmor: number
  baseToughness: number
  healthMax: number
  baseArmor: number
  damageTakenMult: number
  critChancePercent: number
  referenceLaDpsFraction: number
}

export interface BuffUptimeEntry {
  name: string
  uptime: number
  value: number | undefined
  valueType: string | undefined
  effectType: "buff" | "debuff"
}

export const ALLY_VISIBLE_BUFF_TARGETS = new Set([
  "ally",
  "self-and-ally",
  "self-or-ally",
  "lowest-health-ally",
  "ground",
])

export const EMPTY_BASELINE: ReferenceBaseline = {
  buffUptimes: new Map(),
  referenceDps: 0,
  baseDamageBuffMultiplier: 1,
  baseVulnerabilityMultiplier: 1,
  baseBreachPenetration: 0,
  basePenetration: 0,
  targetArmor: 0,
  baseToughness: 0,
  healthMax: 30000,
  baseArmor: 0,
  damageTakenMult: 1,
  critChancePercent: 0,
  referenceLaDpsFraction: 0,
}
