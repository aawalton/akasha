import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { buildId as toBuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { findAccountAddress } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import type { Route } from "./+types/companion-versions.route.code"

interface CompanionVersion {
  id: string
  versionNumber: number
  isCheckpoint: boolean
  checkpointName: string | null
  createdAt: string
  buildHash: string
  buildMetadata: Record<string, unknown>
}

function jsonResponse(
  body: { versions: readonly CompanionVersion[] } | { error: string },
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

  const buildId = toBuildId(params.buildId)

  try {
    const accountPage = (await findAccountAddress(accountId)) ?? NEVER_MATCH_VALUE
    const { rows } = await getPages({
      pageTypeSlug: "temper-build-version",
      where: [
        { key: "accountPage", eq: accountPage },
        { key: "build", eq: buildId },
      ],
      order: [{ by: "versionNumber", dir: "desc" }],
      limit: 500,
    })

    const mapped = rows.map((row): CompanionVersion => {
      const createdAtRaw = row.createdAt
      const createdAtMs =
        typeof createdAtRaw === "number"
          ? createdAtRaw
          : typeof createdAtRaw === "string"
            ? Date.parse(createdAtRaw)
            : 0
      return {
        id: typeof row.id === "string" ? row.id : "",
        versionNumber: typeof row.versionNumber === "number" ? row.versionNumber : 0,
        isCheckpoint: row.isCheckpoint === "true",
        checkpointName: typeof row.checkpointName === "string" ? row.checkpointName : null,
        createdAt: new Date(createdAtMs).toISOString(),
        buildHash: typeof row.buildHash === "string" ? row.buildHash : "",
        buildMetadata: {
          title: typeof row.title === "string" ? row.title : "",
          description: typeof row.description === "string" ? row.description : "",
          ...(Array.isArray(row.baseRoles) ? { baseRoles: row.baseRoles } : {}),
          ...(typeof row.targetCount === "number" ? { targetCount: row.targetCount } : {}),
        },
      }
    })

    const checkpoints = mapped.filter((v) => v.isCheckpoint)
    const autoVersions = mapped.filter((v) => !v.isCheckpoint)
    const byDateDesc = (a: CompanionVersion, b: CompanionVersion) =>
      Date.parse(b.createdAt) - Date.parse(a.createdAt)
    checkpoints.sort(byDateDesc)
    autoVersions.sort(byDateDesc)

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
