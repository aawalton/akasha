import { getPages } from "@akasha/pages-access/get"
import { getUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import { createServerClient } from "akasha/alan/harness/supabase-rr/server-client/server-client.module.code.ts"
import { buildId as toBuildId } from "../../../formula-framework/branded-id/branded-id.module.code.ts"
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
  const { user, headers: authHeaders } = await getUser(request)
  if (!user) {
    return jsonResponse({ error: "Not authenticated" }, authHeaders, 401)
  }

  const { headers } = createServerClient(request)
  for (const value of authHeaders.getSetCookie()) {
    headers.append("Set-Cookie", value)
  }

  const buildId = toBuildId(params.buildId)

  try {
    const { rows } = await getPages({
      pageTypeSlug: "temper-build-version",
      where: [
        { key: "accountPage", eq: user.id },
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
      const buildMetadata = row.buildMetadata
      return {
        id: typeof row.id === "string" ? row.id : "",
        versionNumber: typeof row.versionNumber === "number" ? row.versionNumber : 0,
        isCheckpoint: row.isCheckpoint === "true",
        checkpointName: typeof row.checkpointName === "string" ? row.checkpointName : null,
        createdAt: new Date(createdAtMs).toISOString(),
        buildHash: typeof row.buildHash === "string" ? row.buildHash : "",
        buildMetadata:
          buildMetadata !== null &&
          typeof buildMetadata === "object" &&
          !Array.isArray(buildMetadata)
            ? buildMetadata
            : {},
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
