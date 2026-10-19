import {
  findIn,
  plainText,
  sentencesOf,
  textPattern,
} from "akasha/temper/player/character/stat/modules/text-pattern/text-pattern.module.code.ts"

export type SkillHealing = {
  readonly direct: number
  readonly shield: number
  readonly tick: number
  readonly tickSeconds: number
  readonly lastsSeconds: number
  readonly unread: readonly string[]
}

const DEFAULT_TICK_SECONDS = 2

const SHIELD = textPattern(
  "damage shield [around you ]that absorbs [up to ]<n> damage[ for <n> second[s]]"
)

const HIT_THEN_TICKS = textPattern(
  "heal{s|ing|} for <n> health from the initial hit and <n> health each subsequent tick"
)

const EVERY = textPattern("heal{s|ing|}<b>[<*> for] <n> health every [<n>][ ]second[s]")

const DIRECT = textPattern("heal{s|ing|} [you ]for <n> health")

const IN_AREA = textPattern("healing increases by <n>% if you are in the area")

const HEALING_WORDS = ["heal", "shield", "restor"]

function mentionsHealing(sentence: string): boolean {
  const lower = sentence.toLowerCase()
  return HEALING_WORDS.some((word) => lower.includes(word))
}

export function readSkillHealing(description: string): SkillHealing {
  let direct = 0
  let shield = 0
  let tick = 0
  let tickSeconds = DEFAULT_TICK_SECONDS
  let lastsSeconds = 0
  let healed = false
  const unread: string[] = []
  for (const sentence of sentencesOf(plainText(description))) {
    const shielded = findIn(SHIELD, sentence)
    if (shielded !== undefined && shield === 0) {
      shield = shielded[0] ?? 0
      lastsSeconds = shielded[1] ?? 0
      continue
    }
    const hitThenTicks = findIn(HIT_THEN_TICKS, sentence)
    if (hitThenTicks !== undefined && !healed) {
      direct = hitThenTicks[0] ?? 0
      tick = hitThenTicks[1] ?? 0
      healed = true
      continue
    }
    const every = findIn(EVERY, sentence)
    if (every !== undefined && !healed) {
      tick = every[0] ?? 0
      tickSeconds = every[1] ?? 1
      healed = true
      continue
    }
    const once = findIn(DIRECT, sentence)
    if (once !== undefined && !healed) {
      direct = once[0] ?? 0
      healed = true
      continue
    }
    const inArea = findIn(IN_AREA, sentence)
    if (inArea !== undefined && healed) {
      const scale = 1 + (inArea[0] ?? 0) / 100
      direct = direct * scale
      tick = tick * scale
      continue
    }
    if (mentionsHealing(sentence) && !(healed && once !== undefined)) unread.push(sentence)
  }
  return { direct, shield, tick, tickSeconds, lastsSeconds, unread }
}
