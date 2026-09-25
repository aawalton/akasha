import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import { deletePageById } from "akasha/page/access/modules/deleting/deleting.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { races } from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import { classes } from "akasha/temper/modules/character-class/character-class.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { buildSlug } from "akasha/temper/player/character/build/build-support/modules/build-slug/build-slug.module.code.ts"
import type {
  BuildHash,
  BuildId,
  EsoCharacterId,
} from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { buildId as toBuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import {
  ACCOUNT_PAGE_TYPE,
  accountScopedSlug,
  findAccountAddress,
} from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { extractCharacterMetadata } from "akasha/temper/web/modules/build-metadata/build-metadata.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

function noAccountPageWhy(userId: string): string {
  return `no ${ACCOUNT_PAGE_TYPE} page names user ${userId}, so a build imported now would belong to no account`
}

const CHARACTER_BUILD = "character-build"

async function takenBack(buildId: string): Promise<string> {
  try {
    await deletePageById({ pageTypeSlug: CHARACTER_BUILD, id: buildId })
    return `; the build ${buildId} written before it was taken away`
  } catch (e) {
    const why = e instanceof Error ? e.message : String(e)
    return `; the build ${buildId} written before it is left behind, as taking it away failed: ${why}`
  }
}

type ImportCharacterResult =
  | { buildId: BuildId; buildName: string }
  | { error: "not-authenticated" }
  | { error: "invalid-hash" }
  | { error: "no-account"; message: string }
  | { error: "create-failed"; message: string }

export async function importCharacterFromHash(
  request: Request,
  hash: BuildHash,
  esoCharacterId?: EsoCharacterId
): Promise<{ result: ImportCharacterResult; headers: Headers }> {
  const headers = new Headers()
  const reader = await signedInAs(TEMPER_SITE, request)
  const reached = reader === null ? null : await accountOfContributor(reader)
  const userId = reached?.ok === true ? reached.account : null
  if (userId === null) {
    return { result: { error: "not-authenticated" }, headers }
  }
  const accountPage = await findAccountAddress(userId)
  if (accountPage === null) {
    return { result: { error: "no-account", message: noAccountPageWhy(userId) }, headers }
  }

  const buildState = decodeBuild(hash)
  if (!buildState) {
    return { result: { error: "invalid-hash" }, headers }
  }

  const raceName = races.data[buildState.character.race]?.name ?? "Unknown"
  const className = classes.data[buildState.character.class]?.name ?? "Unknown"
  buildState.name = `${raceName} ${className}`

  const buildMetadata = extractCharacterMetadata(buildState)

  const slug = buildSlug(buildState.name, `${accountPage}\n${hash}`)
  const { rows: importedBefore } = await getPages({
    pageTypeSlug: CHARACTER_BUILD,
    where: [{ key: "slug", eq: slug }],
    limit: 1,
  })
  const { rows: existingBuilds } =
    importedBefore.length > 0
      ? { rows: importedBefore }
      : await getPages({
          pageTypeSlug: CHARACTER_BUILD,
          where: [
            { key: "accountPage", eq: accountPage },
            { key: "buildHash", eq: hash },
          ],
          limit: 1,
        })
  const firstExistingBuild = existingBuilds[0]
  if (firstExistingBuild && typeof firstExistingBuild.id === "string") {
    return {
      result: { buildId: toBuildId(firstExistingBuild.id), buildName: buildState.name },
      headers,
    }
  }

  if (esoCharacterId) {
    const { rows: existingEntities } = await getPages({
      pageTypeSlug: "temper-account-character",
      where: [
        { key: "accountPage", eq: accountPage },
        { key: "esoCharacterId", eq: esoCharacterId },
      ],
      limit: 1,
    })

    let liveBuildId: string | undefined
    const entity = existingEntities[0]
    if (entity) {
      liveBuildId = typeof entity.liveBuildId === "string" ? entity.liveBuildId : undefined
    }

    let newBuildId = ""
    try {
      const created = await createPage({
        pageTypeSlug: CHARACTER_BUILD,
        properties: {
          slug,
          accountPage,
          title: buildState.name,
          description: buildMetadata.description,
          buildHash: hash,
          visibility: "live",
          ...(buildMetadata.baseRoles ? { roles: [...buildMetadata.baseRoles] } : {}),
          ...(buildMetadata.targetCount != null ? { targetCount: buildMetadata.targetCount } : {}),
        },
      })
      newBuildId = typeof created.id === "string" ? created.id : ""

      if (entity) {
        await patchPage({
          pageTypeSlug: "temper-account-character",
          where: [
            { key: "accountPage", eq: accountPage },
            { key: "esoCharacterId", eq: esoCharacterId },
          ],
          set: { liveBuildId: newBuildId },
        })
      } else {
        await createPage({
          pageTypeSlug: "temper-account-character",
          properties: {
            slug: accountScopedSlug(`character-${esoCharacterId}`, accountPage),
            accountPage,
            esoCharacterId,
            liveBuildId: newBuildId,
          },
        })
      }

      return {
        result: {
          buildId: toBuildId(newBuildId !== "" ? newBuildId : (liveBuildId ?? "")),
          buildName: buildState.name,
        },
        headers,
      }
    } catch (e) {
      const why = e instanceof Error ? e.message : "Unknown error"
      const undone = newBuildId === "" ? "" : await takenBack(newBuildId)
      return { result: { error: "create-failed", message: `${why}${undone}` }, headers }
    }
  }

  try {
    const created = await createPage({
      pageTypeSlug: CHARACTER_BUILD,
      properties: {
        slug,
        accountPage,
        title: buildState.name,
        description: buildMetadata.description,
        buildHash: hash,
        visibility: "private",
        ...(buildMetadata.baseRoles ? { roles: [...buildMetadata.baseRoles] } : {}),
        ...(buildMetadata.targetCount != null ? { targetCount: buildMetadata.targetCount } : {}),
      },
    })
    const newBuildId = typeof created.id === "string" ? created.id : ""
    return {
      result: { buildId: toBuildId(newBuildId), buildName: buildState.name },
      headers,
    }
  } catch (e) {
    return {
      result: { error: "create-failed", message: e instanceof Error ? e.message : "Unknown error" },
      headers,
    }
  }
}
