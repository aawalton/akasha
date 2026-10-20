import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import {
  type PatchPageArgs,
  patchPage,
} from "akasha/page/access/modules/patch/patch.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"

const CHARACTER_BUILD = "character-build"

const CHARACTER = "temper-account-character"

const READ_LIMIT = 500

type Link = "liveBuildId" | "targetBuildId"

const LINK_OF: Readonly<Record<string, Link>> = {
  live: "liveBuildId",
  target: "targetBuildId",
}

export interface CharacterBuildPages {
  readonly get: typeof getPages
  readonly patch: (args: PatchPageArgs) => Promise<Page | null>
}

const LIVE_CHARACTER_BUILD_PAGES: CharacterBuildPages = {
  get: getPages,
  patch: patchPage,
}

export interface FiledCharacterBuild {
  readonly buildId: string
  readonly character: string
  readonly owned: boolean
  readonly attachedAs: Link | null
}

function textOf(value: Json | undefined): string | undefined {
  return typeof value === "string" && value !== "" ? value : undefined
}

function charactersByName(characters: readonly Page[]): Map<string, Page> {
  const byName = new Map<string, Page>()
  for (const character of characters) {
    const name = textOf(character.title)
    if (name !== undefined) byName.set(name, character)
  }
  return byName
}

export async function fileCharacterBuilds(
  accountPage: string,
  pages: CharacterBuildPages = LIVE_CHARACTER_BUILD_PAGES
): Promise<readonly FiledCharacterBuild[]> {
  const { rows: characters } = await pages.get({
    pageTypeSlug: CHARACTER,
    where: [{ key: "accountPage", eq: accountPage }],
    limit: READ_LIMIT,
  })
  const { rows: builds } = await pages.get({ pageTypeSlug: CHARACTER_BUILD, limit: READ_LIMIT })
  const byName = charactersByName(characters)
  const buildIds = new Set(builds.map((build) => build.id))
  const taken = new Map<string, string>()
  const filed: FiledCharacterBuild[] = []

  for (const build of builds) {
    const owner = textOf(build.accountPage)
    if (owner !== undefined && owner !== accountPage) continue
    const name = textOf(build.characterName)
    const character = name === undefined ? undefined : byName.get(name)
    if (name === undefined || character === undefined) continue

    const owned = owner === undefined
    if (owned) {
      await pages.patch({
        pageTypeSlug: CHARACTER_BUILD,
        where: [{ key: "id", eq: build.id }],
        set: { accountPage },
      })
    }

    const visibility = textOf(build.visibility)
    const link = visibility === undefined ? undefined : LINK_OF[visibility]
    let attachedAs: Link | null = null
    if (link !== undefined) {
      const key = `${character.id}\n${link}`
      const named = taken.get(key) ?? textOf(character[link])
      if (named === undefined || !buildIds.has(named)) {
        await pages.patch({
          pageTypeSlug: CHARACTER,
          where: [{ key: "id", eq: character.id }],
          set: { [link]: build.id },
        })
        taken.set(key, build.id)
        attachedAs = link
      }
    }

    if (owned || attachedAs !== null) {
      filed.push({ buildId: build.id, character: name, owned, attachedAs })
    }
  }
  return filed
}
