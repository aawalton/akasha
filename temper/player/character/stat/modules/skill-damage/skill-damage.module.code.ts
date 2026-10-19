import {
  findIn,
  plainText,
  textPattern,
} from "akasha/temper/player/character/stat/modules/text-pattern/text-pattern.module.code.ts"

export type SkillDamage = {
  readonly hit: number
  readonly wave: number
  readonly waveSeconds: number
}

const WAVE = textPattern("every <n> second[s], deal{s|ing} <n> <w> damage")

const HIT = textPattern("deal{s|ing} <n> <w> damage")

const NO_DAMAGE: SkillDamage = { hit: 0, wave: 0, waveSeconds: 0 }

export function readSkillDamage(description: string): SkillDamage {
  const text = plainText(description)
  const wave = findIn(WAVE, text)
  if (wave !== undefined) return { hit: 0, wave: wave[1] ?? 0, waveSeconds: wave[0] ?? 0 }
  const hit = findIn(HIT, text)
  if (hit !== undefined) return { ...NO_DAMAGE, hit: hit[0] ?? 0 }
  return NO_DAMAGE
}
