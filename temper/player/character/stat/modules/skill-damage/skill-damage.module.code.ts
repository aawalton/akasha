export type SkillDamage = {
  readonly hit: number
  readonly wave: number
  readonly waveSeconds: number
}

const COLOR = /\|c[0-9a-fA-F]{6}|\|r/g

const WAVE = /every (\d+) seconds?, deal(?:s|ing) (\d+) \w+ Damage/i

const HIT = /deal(?:s|ing) (\d+) \w+ Damage/i

export const NO_DAMAGE: SkillDamage = { hit: 0, wave: 0, waveSeconds: 0 }

export function readSkillDamage(description: string): SkillDamage {
  const text = description.replace(COLOR, "").replace(/\s+/g, " ")
  const wave = WAVE.exec(text)
  if (wave !== null) return { hit: 0, wave: Number(wave[2]), waveSeconds: Number(wave[1]) }
  const hit = HIT.exec(text)
  if (hit !== null) return { ...NO_DAMAGE, hit: Number(hit[1]) }
  return NO_DAMAGE
}
