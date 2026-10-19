import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { stringAt } from "akasha/code/type/narrowing/modules/string-at/string-at.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  readFiles,
  readPages,
} from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import { rotationReadingOf } from "akasha/temper/player/character/stat/modules/character-rotation-reading/character-rotation-reading.module.code.ts"
import { characterCompletionSchema } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"
import {
  besidePathsFor,
  contentIn,
  type ReadFiles,
  type ReadPages,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"

const COMPLETION = "completion"

const COMPLETION_ENDING = "json"

const EVERY = 1000

type CharacterReading = {
  readonly toughness: number
  readonly damage: number
  readonly healing: number
}

export type CharacterReadings = Readonly<Record<string, CharacterReading>>

type Reading = typeof rotationReadingOf

interface CharacterReadingsDeps {
  readonly getRows?: typeof getPages
  readonly readPages?: ReadPages
  readonly readFiles?: ReadFiles
  readonly reading?: Reading
  readonly report?: (message: string) => void
}

type Character = { readonly slug: string; readonly esoCharacterId: string }

function charactersIn(rows: readonly Record<string, unknown>[]): readonly Character[] {
  const found: Character[] = []
  for (const row of rows) {
    const slug = stringAt(row, "slug")
    const esoCharacterId = stringAt(row, "esoCharacterId")
    if (slug === null || esoCharacterId === null) continue
    if (stringAt(row, COMPLETION) !== COMPLETION_ENDING) continue
    found.push({ slug, esoCharacterId })
  }
  return found
}

async function readingOf(
  held: string,
  reading: Reading
): Promise<CharacterReading | { readonly refused: string }> {
  const completion = characterCompletionSchema.safeParse(JSON.parse(held))
  if (!completion.success) return { refused: "its completion does not read" }
  const read = await reading(completion.data)
  if ("refused" in read) return read
  return {
    toughness: Math.round(read.toughnessPerSecond),
    damage: Math.round(read.damagePerSecond),
    healing: Math.round(read.healingPerSecond),
  }
}

export async function characterReadingsFor(
  accountPage: string,
  deps: CharacterReadingsDeps = {}
): Promise<CharacterReadings> {
  const report = deps.report ?? log
  const reading = deps.reading ?? rotationReadingOf
  const { rows } = await (deps.getRows ?? getPages)({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: accountPage }],
    select: ["slug", "esoCharacterId", COMPLETION],
    limit: EVERY,
  })
  const characters = charactersIn(rows)
  if (characters.length === 0) return {}
  const beside = await besidePathsFor(
    deps.readPages ?? readPages,
    CHARACTER_PAGE_TYPE_SLUG,
    characters.map((one) => one.slug),
    COMPLETION,
    COMPLETION_ENDING
  )
  const found = await (deps.readFiles ?? readFiles)([...beside.values()])
  if (!found.ok) throw new Error(`the characters' completions went unread: ${found.why}`)
  const readings: Record<string, CharacterReading> = {}
  for (const one of characters) {
    const held = contentIn(found.bodies, beside.get(one.slug) ?? "")
    if (held === null) continue
    try {
      const read = await readingOf(held, reading)
      if ("refused" in read) report(`Readings: ${one.slug} has none, since ${read.refused}`)
      else readings[one.esoCharacterId] = read
    } catch (thrown) {
      report(`Readings: ${one.slug} has none, since the reading threw: ${saidBy(thrown)}`)
    }
  }
  return readings
}
