import { asRecord } from "akasha/code/type/narrowing/modules/as-record/as-record.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  type UpsertPageArgs,
  upsertPage,
} from "akasha/page/access/modules/upsert/upsert.module.code.ts"
import type { Page, PageWhere } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { characterBuild } from "akasha/temper/player/character/character-build/character-build.page-type.ts"

const CHARACTER = "temper-account-character"

export interface ChosenBuild {
  readonly buildId: string
  readonly over: string
}

export interface ChoosingCharacter {
  readonly where: PageWhere
  readonly targetBuildId: unknown
  readonly targetBuildIds: readonly string[]
  readonly chosen: ChosenBuild
}

export interface ChoosingPages {
  readonly get: (args: {
    pageTypeSlug: string
    where: PageWhere
    limit: number
  }) => Promise<{ readonly rows: readonly Page[] }>
  readonly upsert: (args: UpsertPageArgs) => Promise<Page>
}

const LIVE_PAGES: ChoosingPages = { get: getPages, upsert: upsertPage }

export function chosenBuildIn(value: unknown): ChosenBuild | undefined {
  const record = asRecord(value)
  if (typeof record?.buildId !== "string" || typeof record.over !== "string") return undefined
  return { buildId: record.buildId, over: record.over }
}

async function chosenId(
  held: ChoosingCharacter,
  pages: ChoosingPages
): Promise<string | undefined> {
  const named = held.chosen.buildId
  if (held.targetBuildIds.includes(named)) return named
  const { rows } = await pages.get({
    pageTypeSlug: characterBuild.slug,
    where: [{ key: "correlationId", eq: named }],
    limit: 1,
  })
  const made = rows[0]?.id
  return made !== undefined && held.targetBuildIds.includes(made) ? made : undefined
}

export async function chooseBuild(
  held: ChoosingCharacter,
  pages: ChoosingPages = LIVE_PAGES
): Promise<string | undefined> {
  const { chosen } = held
  if (chosen.buildId === chosen.over || held.targetBuildId !== chosen.over) return undefined
  const id = await chosenId(held, pages)
  if (id === undefined || id === chosen.over) return undefined
  await pages.upsert({
    pageTypeSlug: CHARACTER,
    where: held.where,
    set: { targetBuildId: id },
    select: ["id"],
  })
  return id
}
