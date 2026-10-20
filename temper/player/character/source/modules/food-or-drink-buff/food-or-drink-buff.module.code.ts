type Status = "supported" | "partially-supported" | "unsupported"

type Effect = {
  readonly metric: string
  readonly effectType: string
  readonly value: number
}

export type Buff = {
  readonly effects: readonly Effect[]
  readonly status: Status
  readonly seconds: number
  readonly scaled: boolean
}

const COLOR = /\|c[0-9a-fA-F]{6}|\|r/g

const STATS: Readonly<Record<string, string>> = {
  "Max Health": "health-maximum",
  "Max Magicka": "magicka-maximum",
  "Max Stamina": "stamina-maximum",
  "Health Recovery": "health-recovery",
  "Magicka Recovery": "magicka-recovery",
  "Stamina Recovery": "stamina-recovery",
}

const METRIC = "temper-metric/"

const MAX = "Max "

const RECOVERY = " Recovery"

const SCALED = /^These effects are scaled based on your level(, up to Veteran Rank \d+)?\.$/

const SAID_OF_EVERY_BONUS: readonly string[] = [
  "The timer pauses when you are offline, and resumes when you return.",
  "This bonus is compatible with other foods or drinks.",
]

const INCREASE = /^Increase (.+?)(?: for \d+(?:\.\d+)? (?:hours?|minutes?))?\.$/

const EXPERIENCE = /^You gain a (\d+)% Experience Point bonus from all sources for \d+ minutes\.$/

const CLAUSE = /(.+?) by (\d+)(?:, and |, | and |$)/y

const PARTS = /, and |, | and /

const SENTENCE = /(?<=\.) +(?=[A-Z])/

const LASTS = /for (\d+(?:\.\d+)?) (hour|minute)s?/

const SECONDS: Readonly<Record<string, number>> = { hour: 3600, minute: 60 }

const PERCENT = 100

export function buffTextOf(said: string): string {
  return said
    .replace(COLOR, "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "")
    .join("\n")
}

function statsIn(phrase: string): readonly string[] | null {
  const parts = phrase.split(PARTS)
  const first = parts[0] ?? ""
  const last = parts[parts.length - 1] ?? ""
  const metrics: string[] = []
  for (const part of parts) {
    const max = first.startsWith(MAX) && !part.startsWith(MAX) ? `${MAX}${part}` : part
    const named = last.endsWith(RECOVERY) && !max.endsWith(RECOVERY) ? `${max}${RECOVERY}` : max
    const metric = STATS[named]
    if (metric === undefined) return null
    metrics.push(metric)
  }
  return metrics
}

function increasesIn(clauses: string): { readonly effects: Effect[]; readonly whole: boolean } {
  const effects: Effect[] = []
  CLAUSE.lastIndex = 0
  while (CLAUSE.lastIndex < clauses.length) {
    const found = CLAUSE.exec(clauses)
    if (found === null) return { effects, whole: false }
    const value = Number(found[2])
    const metrics = statsIn(found[1] ?? "")
    if (metrics === null || value <= 0) return { effects, whole: false }
    for (const metric of metrics) {
      effects.push({ metric: `${METRIC}${metric}`, effectType: "integer", value })
    }
  }
  return { effects, whole: true }
}

function sentencesOf(text: string): readonly string[] {
  return text.split("\n").flatMap((line) => line.split(SENTENCE))
}

function statusOf(effects: readonly Effect[], unread: number): Status {
  if (effects.length === 0) return "unsupported"
  return unread === 0 ? "supported" : "partially-supported"
}

export function buffOf(text: string): Buff {
  const effects: Effect[] = []
  let unread = 0
  for (const sentence of sentencesOf(text)) {
    if (SCALED.test(sentence) || SAID_OF_EVERY_BONUS.includes(sentence)) continue
    const increase = INCREASE.exec(sentence)
    const experience = EXPERIENCE.exec(sentence)
    if (increase !== null) {
      const said = increasesIn(increase[1] ?? "")
      effects.push(...said.effects)
      if (!said.whole) unread += 1
    } else if (experience !== null && Number(experience[1]) > 0) {
      const value = Number(experience[1]) / PERCENT
      effects.push({ metric: `${METRIC}experience-gain`, effectType: "fractional-change", value })
    } else unread += 1
  }
  const lasts = LASTS.exec(text)
  const seconds = lasts === null ? 0 : Math.round(Number(lasts[1]) * (SECONDS[lasts[2] ?? ""] ?? 0))
  const scaled = text.split("\n").some((line) => SCALED.test(line))
  return { effects, status: statusOf(effects, unread), seconds, scaled }
}
