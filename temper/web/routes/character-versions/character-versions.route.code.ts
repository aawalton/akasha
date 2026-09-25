import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { findAccountAddress } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import {
  buildVersionCreatedAt,
  newestCreatedFirst,
} from "akasha/temper/web/modules/build-version-created-at/build-version-created-at.module.code.ts"
import {
  buildAddressOf,
  buildVersionPageTypeOf,
} from "akasha/temper/web/modules/build-version-page-type/build-version-page-type.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import type { Route } from "./+types/character-versions.route.code"

interface CharacterVersion {
  id: string
  versionNumber: number
  isCheckpoint: boolean
  checkpointName: string | null
  createdAt: string | null
  buildHash: string
  buildMetadata: Record<string, unknown>
}

function jsonResponse(
  body: { versions: readonly CharacterVersion[] } | { error: string },
  headers: Headers,
  status = 200
): Response {
  headers.set("Content-Type", "application/json; charset=utf-8")
  return new Response(JSON.stringify(body), { status, headers })
}

export async function loader({ params, request }: Route.LoaderArgs): Promise<Response> {
  const headers = new Headers()
  const reader = await signedInAs(TEMPER_SITE, request)
  const reached = reader === null ? null : await accountOfContributor(reader)
  const accountId = reached?.ok === true ? reached.account : null
  if (accountId === null) {
    return jsonResponse({ error: "Not authenticated" }, headers, 401)
  }

  const build = buildAddressOf("character-build", params.buildSlug)

  try {
    const accountPage = (await findAccountAddress(accountId)) ?? NEVER_MATCH_VALUE
    const { rows } = await getPages({
      pageTypeSlug: buildVersionPageTypeOf("character-build"),
      where: [
        { key: "accountPage", eq: accountPage },
        { key: "build", eq: build },
      ],
      order: [{ by: "versionNumber", dir: "desc" }],
      limit: 500,
    })

    const mapped = rows.map((row): CharacterVersion => {
      const id = typeof row.id === "string" ? row.id : ""
      const versionNumber = typeof row.versionNumber === "number" ? row.versionNumber : 0
      return {
        id,
        versionNumber,
        isCheckpoint: row.isCheckpoint === true,
        checkpointName: typeof row.checkpointName === "string" ? row.checkpointName : null,
        createdAt: buildVersionCreatedAt(id, versionNumber),
        buildHash: typeof row.buildHash === "string" ? row.buildHash : "",
        buildMetadata: {
          title: typeof row.title === "string" ? row.title : "",
          description: typeof row.description === "string" ? row.description : "",
          characterName: typeof row.characterName === "string" ? row.characterName : "",
          ...(Array.isArray(row.roles) ? { roles: row.roles } : {}),
          ...(typeof row.targetCount === "number" ? { targetCount: row.targetCount } : {}),
        },
      }
    })

    const checkpoints = mapped.filter((v) => v.isCheckpoint)
    const autoVersions = mapped.filter((v) => !v.isCheckpoint)
    checkpoints.sort(newestCreatedFirst)
    autoVersions.sort(newestCreatedFirst)

    return jsonResponse({ versions: [...checkpoints, ...autoVersions] }, headers)
  } catch (err) {
    return jsonResponse(
      {
        error: `Failed to fetch versions: ${err instanceof Error ? err.message : "Unknown error"}`,
      },
      headers,
      500
    )
  }
}
