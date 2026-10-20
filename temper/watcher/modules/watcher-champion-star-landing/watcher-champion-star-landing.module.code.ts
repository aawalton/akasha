import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import { patchPageById } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { temperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.ts"
import { accountWideHolding } from "akasha/temper/eso/saved-variable/modules/account-wide/account-wide.module.code.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import { log } from "akasha/temper/watcher/modules/watcher-logging/watcher-logging.module.code.ts"

const TOP_LEVEL = "TemperCatalog_SavedVariables"

const HELD = "championStarCatalog"

const SKILL_ID = "esoChampionSkillId"

const JUMP_POINTS = "jumpPoints"

const IS_SLOTTABLE = "isSlottable"

export interface CapturedStar {
  readonly jumpPoints: readonly number[]
  readonly isSlottable: boolean
}

export interface StarPage {
  readonly id: string
  readonly slug: string
  readonly skillId: number
  readonly jumpPoints: readonly number[]
  readonly isSlottable: boolean | undefined
}

export interface StarWrite {
  readonly id: string
  readonly slug: string
  readonly jumpPoints?: readonly number[]
  readonly isSlottable?: boolean
}

interface StarWrites {
  readonly writes: readonly StarWrite[]
  readonly unpaged: readonly number[]
  readonly unjumped: readonly string[]
}

function numbersIn(value: unknown): number[] {
  if (Array.isArray(value)) {
    return value.filter((one): one is number => typeof one === "number")
  }
  if (!isRecord(value)) return []
  return Object.keys(value)
    .map(Number)
    .filter((index) => Number.isInteger(index))
    .sort((one, other) => one - other)
    .map((index) => value[String(index)])
    .filter((one): one is number => typeof one === "number")
}

export function championStarsIn(content: string): ReadonlyMap<number, CapturedStar> {
  const found = new Map<number, CapturedStar>()
  let root: Record<string, unknown>
  try {
    root = parseLuaSavedVariablesFile(content, TOP_LEVEL)
  } catch {
    return found
  }
  const held = accountWideHolding(root, HELD)
  if (held === undefined) return found
  for (const key of Object.keys(held)) {
    const skillId = Number(key)
    const star = held[key]
    if (!Number.isInteger(skillId) || skillId === 0 || !isRecord(star)) continue
    const isSlottable = star[IS_SLOTTABLE]
    if (typeof isSlottable !== "boolean") continue
    found.set(skillId, { jumpPoints: numbersIn(star[JUMP_POINTS]), isSlottable })
  }
  return found
}

function sameNumbers(one: readonly number[], other: readonly number[]): boolean {
  return one.length === other.length && one.every((value, index) => value === other[index])
}

export function championStarWrites(
  stars: ReadonlyMap<number, CapturedStar>,
  pages: readonly StarPage[]
): StarWrites {
  const paged = new Set<number>()
  const writes: StarWrite[] = []
  const unjumped: string[] = []
  for (const page of pages) {
    paged.add(page.skillId)
    const star = stars.get(page.skillId)
    if (star === undefined) continue
    const jumped = star.jumpPoints.length > 0 && !sameNumbers(star.jumpPoints, page.jumpPoints)
    if (star.jumpPoints.length === 0 && page.jumpPoints.length > 0) unjumped.push(page.slug)
    const slotted = star.isSlottable !== page.isSlottable
    if (!jumped && !slotted) continue
    writes.push({
      id: page.id,
      slug: page.slug,
      ...(jumped ? { jumpPoints: star.jumpPoints } : {}),
      ...(slotted ? { isSlottable: star.isSlottable } : {}),
    })
  }
  const unpaged = [...stars.keys()]
    .filter((skillId) => !paged.has(skillId))
    .sort((one, other) => one - other)
  return { writes, unpaged, unjumped }
}

async function starPagesOverPages(): Promise<readonly StarPage[]> {
  const rows = await collectPages({ pageTypeSlug: temperChampionStar.slug, pageSize: 2500 })
  return rows.flatMap((row): StarPage[] => {
    const skillId = row[SKILL_ID]
    if (typeof skillId !== "number" || row.slug === null) return []
    const isSlottable = row[IS_SLOTTABLE]
    return [
      {
        id: row.id,
        slug: row.slug,
        skillId,
        jumpPoints: numbersIn(row[JUMP_POINTS]),
        isSlottable: typeof isSlottable === "boolean" ? isSlottable : undefined,
      },
    ]
  })
}

async function writeOverPages(write: StarWrite): Promise<unknown> {
  return patchPageById({
    pageTypeSlug: temperChampionStar.slug,
    id: write.id,
    set: {
      ...(write.jumpPoints === undefined ? {} : { [JUMP_POINTS]: [...write.jumpPoints] }),
      ...(write.isSlottable === undefined ? {} : { [IS_SLOTTABLE]: write.isSlottable }),
    },
  })
}

interface ChampionStarDeps {
  readonly starPages?: () => Promise<readonly StarPage[]>
  readonly write?: (write: StarWrite) => Promise<unknown>
  readonly report?: (message: string) => void
}

export async function landChampionStars(
  content: string,
  deps: ChampionStarDeps = {}
): Promise<StarWrites> {
  const stars = championStarsIn(content)
  if (stars.size === 0) return { writes: [], unpaged: [], unjumped: [] }
  const starPages = deps.starPages ?? starPagesOverPages
  const write = deps.write ?? writeOverPages
  const report = deps.report ?? log
  const outcome = championStarWrites(stars, await starPages())
  for (const one of outcome.writes) await write(one)
  const { writes, unpaged, unjumped } = outcome
  report(
    `${writes.length} champion star page(s) given the points the game states; ${unpaged.length} captured star number(s) no page states${unpaged.length === 0 ? "" : `: ${unpaged.join(", ")}`}`
  )
  if (unjumped.length > 0) {
    report(`jump points the game does not state, left on: ${unjumped.join(", ")}`)
  }
  return outcome
}
