import { getPage } from "@akasha/pages-access/get"
import { collectPages } from "@akasha/pages-access/iterate"
import type { AutomationSettings } from "@akasha/temper-build-support/automation-settings"
import type {
  WantedCompanionEquipmentSignature,
  WantedEquipmentSignature,
} from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type {
  CharacterBuildInput,
  CompanionBuildInput,
  CompletionCharacterInput,
  CompletionCompanionInput,
} from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import {
  compileWantedEquipment as compileCharacterSignatures,
  compileWantedCompanionEquipment as compileCompanionSignatures,
} from "@akasha/temper-items-rules-matcher/rule-matcher-context-equipment"

export const CHARACTER_PAGE_TYPE_SLUG = "temper-account-character"
export const COMPANION_PAGE_TYPE_SLUG = "temper-companion-progress"
export const CHARACTER_BUILD_PAGE_TYPE_SLUG = "character-build"
export const COMPANION_BUILD_PAGE_TYPE_SLUG = "companion-build"

const ROWS_PER_READ = 1000
const SORT_ORDER_LAST = 999

export type PageAsk = {
  pageTypeSlug: string
  where: readonly { key: string; eq: string }[]
  select?: readonly string[]
  pageSize?: number
}

export type PageValues = Record<string, unknown>

export type PageReader = {
  collect: (args: PageAsk) => Promise<readonly PageValues[]>
  get: (args: PageAsk) => Promise<PageValues | null>
}

export const DEFAULT_PAGE_READER: PageReader = {
  collect: async (args) => (await collectPages(args)).map((page): PageValues => ({ ...page })),
  get: async (args) => {
    const page = await getPage(args)
    return page === null ? null : { ...page }
  },
}

export type CharacterWithBuilds = {
  esoCharacterId: string
  sortOrder?: number
  targetBuildHash?: string
  liveBuildHash?: string
}

type CharacterRow = {
  esoCharacterId: string
  sortOrder: number | undefined
  targetBuildId: string | undefined
  liveBuildId: string | undefined
}

type CompanionRow = {
  companionId: string
  sortOrder: number | undefined
  targetBuildId: string | undefined
}

type BuildRow = {
  id: string
  buildHash: string
}

function textOf(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined
}

function countOf(value: unknown): number | undefined {
  return typeof value === "number" ? value : undefined
}

function inSortOrder<T extends { sortOrder: number | undefined }>(rows: T[]): T[] {
  return rows.sort((a, b) => (a.sortOrder ?? SORT_ORDER_LAST) - (b.sortOrder ?? SORT_ORDER_LAST))
}

async function readCharacterRows(userId: string, reader: PageReader): Promise<CharacterRow[]> {
  const rows = await reader.collect({
    pageTypeSlug: CHARACTER_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: userId }],
    pageSize: ROWS_PER_READ,
  })

  const named: CharacterRow[] = []
  for (const row of rows) {
    const esoCharacterId = textOf(row.esoCharacterId)
    if (esoCharacterId === undefined) continue
    named.push({
      esoCharacterId,
      sortOrder: countOf(row.displayOrder),
      targetBuildId: textOf(row.targetBuildId),
      liveBuildId: textOf(row.liveBuildId),
    })
  }
  return inSortOrder(named)
}

async function readCompanionRows(userId: string, reader: PageReader): Promise<CompanionRow[]> {
  const rows = await reader.collect({
    pageTypeSlug: COMPANION_PAGE_TYPE_SLUG,
    where: [{ key: "accountPage", eq: userId }],
    pageSize: ROWS_PER_READ,
  })

  const named: CompanionRow[] = []
  for (const row of rows) {
    const companionId = textOf(row.companionId)
    if (companionId === undefined) continue
    named.push({
      companionId,
      sortOrder: countOf(row.displayOrder),
      targetBuildId: textOf(row.targetBuildId),
    })
  }
  return inSortOrder(named)
}

async function readBuildHash(
  pageTypeSlug: string,
  buildId: string,
  reader: PageReader
): Promise<string | undefined> {
  const build = await reader.get({
    pageTypeSlug,
    where: [{ key: "id", eq: buildId }],
    select: ["buildHash"],
  })
  return textOf(build?.buildHash)
}

async function readBuildsById(
  pageTypeSlug: string,
  buildIds: ReadonlyArray<string | undefined>,
  reader: PageReader
): Promise<Map<string, BuildRow>> {
  const buildById = new Map<string, BuildRow>()
  for (const buildId of buildIds) {
    if (buildId === undefined || buildById.has(buildId)) continue
    const buildHash = await readBuildHash(pageTypeSlug, buildId, reader)
    if (buildHash === undefined) continue
    buildById.set(buildId, { id: buildId, buildHash })
  }
  return buildById
}

export async function readCharactersWithTargetBuilds(
  userId: string,
  reader: PageReader = DEFAULT_PAGE_READER
): Promise<CharacterWithBuilds[]> {
  const rows = await readCharacterRows(userId, reader)

  const characters: CharacterWithBuilds[] = []
  for (const row of rows) {
    const character: CharacterWithBuilds = {
      esoCharacterId: row.esoCharacterId,
      sortOrder: row.sortOrder,
    }

    if (row.targetBuildId !== undefined) {
      const hash = await readBuildHash(CHARACTER_BUILD_PAGE_TYPE_SLUG, row.targetBuildId, reader)
      if (hash !== undefined) character.targetBuildHash = hash
    }

    if (row.liveBuildId !== undefined) {
      const hash = await readBuildHash(CHARACTER_BUILD_PAGE_TYPE_SLUG, row.liveBuildId, reader)
      if (hash !== undefined) character.liveBuildHash = hash
    }

    characters.push(character)
  }
  return characters
}

export async function compileWantedEquipment(
  userId: string,
  automationSettings?: AutomationSettings,
  reader: PageReader = DEFAULT_PAGE_READER
): Promise<readonly WantedEquipmentSignature[]> {
  const rows = await readCharacterRows(userId, reader)
  const builds = await readBuildsById(
    CHARACTER_BUILD_PAGE_TYPE_SLUG,
    rows.map((row) => row.targetBuildId),
    reader
  )

  const buildById = new Map<string, CharacterBuildInput>()
  for (const [buildId, build] of builds) {
    buildById.set(buildId, { id: build.id, buildHash: build.buildHash, esoCharacterId: undefined })
  }

  const characters: CompletionCharacterInput[] = rows.map((row) => ({
    esoCharacterId: row.esoCharacterId,
    targetBuildId: row.targetBuildId,
    sortOrder: row.sortOrder,
  }))

  return compileCharacterSignatures(characters, buildById, automationSettings)
}

export async function compileWantedCompanionEquipment(
  userId: string,
  automationSettings?: AutomationSettings,
  reader: PageReader = DEFAULT_PAGE_READER
): Promise<readonly WantedCompanionEquipmentSignature[]> {
  const rows = await readCompanionRows(userId, reader)
  const builds = await readBuildsById(
    COMPANION_BUILD_PAGE_TYPE_SLUG,
    rows.map((row) => row.targetBuildId),
    reader
  )

  const buildById = new Map<string, CompanionBuildInput>(builds)

  const companions: CompletionCompanionInput[] = rows.map((row) => ({
    companionId: row.companionId,
    targetBuildId: row.targetBuildId,
  }))

  return compileCompanionSignatures(companions, buildById, automationSettings)
}
