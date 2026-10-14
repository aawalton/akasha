export type SkillHealing = {
  readonly direct: number
  readonly shield: number
  readonly tick: number
  readonly tickSeconds: number
  readonly unread: readonly string[]
}

const COLOR = /\|c[0-9a-fA-F]{6}|\|r/g

const SENTENCE = /(?<=\.)\s+/

const MENTIONS_HEALING = /heal|shield|restor/i

const DEFAULT_TICK_SECONDS = 2

const SHIELD = /damage shield that absorbs (\d+) damage/i

const HIT_THEN_TICKS =
  /heal(?:s|ing)? for (\d+) Health from the initial hit and (\d+) Health each subsequent tick/i

const EVERY = /heals? you\b.*? for (\d+) Health every (\d+)? ?seconds?/i

const DIRECT = /heal(?:s|ing)? (?:you )?for (\d+) Health/i

function plainText(description: string): string {
  return description.replace(COLOR, "").replace(/\s+/g, " ").trim()
}

export function readSkillHealing(description: string): SkillHealing {
  let direct = 0
  let shield = 0
  let tick = 0
  let tickSeconds = DEFAULT_TICK_SECONDS
  let healed = false
  const unread: string[] = []
  for (const sentence of plainText(description).split(SENTENCE)) {
    const shielded = SHIELD.exec(sentence)
    if (shielded !== null && shield === 0) {
      shield = Number(shielded[1])
      continue
    }
    const hitThenTicks = HIT_THEN_TICKS.exec(sentence)
    if (hitThenTicks !== null && !healed) {
      direct = Number(hitThenTicks[1])
      tick = Number(hitThenTicks[2])
      healed = true
      continue
    }
    const every = EVERY.exec(sentence)
    if (every !== null && !healed) {
      tick = Number(every[1])
      tickSeconds = every[2] === undefined ? 1 : Number(every[2])
      healed = true
      continue
    }
    const once = DIRECT.exec(sentence)
    if (once !== null && !healed) {
      direct = Number(once[1])
      healed = true
      continue
    }
    if (MENTIONS_HEALING.test(sentence) && !(healed && DIRECT.test(sentence))) unread.push(sentence)
  }
  return { direct, shield, tick, tickSeconds, unread }
}
