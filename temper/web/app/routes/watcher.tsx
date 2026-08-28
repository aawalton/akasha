import { PageLayoutSkeleton } from "@shared/design-layout/components/page-layout"
import { simplePageSkeleton } from "@shared/design-layout/components/skeleton-presets"
import { getPage, getPages } from "@shared/pages-access/get"
import { getUser } from "@shared/supabase-rr/auth/server"
import { createServerClient } from "@shared/supabase-rr/server"
import { Suspense } from "react"
import { data } from "react-router"
import { WatcherPageContent } from "@/components/watcher/watcher-page-content"
import { readServedWatcherVersion } from "@/lib/served-watcher-version"
import { readReportedBuild, summarizeWatcherBuild } from "@/lib/watcher-build-status"
import { readReportedOperations, summarizeWatcherRun } from "@/lib/watcher-run-status"
import { summarizeWatcherSync, type WatcherSyncSourceCounts } from "@/lib/watcher-sync-status"
import type { Route } from "./+types/watcher"

export function meta() {
  return [{ title: "Temper | Watcher" }]
}

function epochMsToIso(value: unknown): string | null {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return null
  return new Date(value).toISOString()
}

async function readSource(
  pageTypeSlug: string,
  userId: string,
  captureKey?: string
): Promise<WatcherSyncSourceCounts> {
  const result = await getPages({
    pageTypeSlug,
    where: [{ key: "userId", eq: userId }],
    select: captureKey === undefined ? ["updatedAt"] : ["updatedAt", captureKey],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 1,
    withCount: true,
  })
  const newest = result.rows[0]
  const contact = newest?.updatedAt
  return {
    count: result.count ?? result.rows.length,
    lastContactAt: typeof contact === "string" ? contact : null,
    capturedAt: captureKey === undefined ? null : epochMsToIso(newest?.[captureKey]),
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = createServerClient(request)
  const { user, headers: userHeaders } = await getUser(request)
  for (const [k, v] of userHeaders) {
    if (k.toLowerCase() === "set-cookie") headers.append("set-cookie", v)
  }

  if (!user) return data({ sync: null, build: null, run: null }, { headers })

  const [enrolment, characters, inventory] = await Promise.all([
    getPage({
      pageTypeSlug: "temper-watcher-enrolment",
      where: [{ key: "accountUserId", eq: user.id }],
      select: ["tokenCreatedAt", "lastRunOutcome"],
    }),
    readSource("temper-account-character", user.id),
    readSource("temper-inventory-snapshot", user.id, "dataTimestamp"),
  ])

  const createdAt = enrolment?.tokenCreatedAt
  const sync = summarizeWatcherSync({
    connectedAt: typeof createdAt === "string" ? createdAt : null,
    characters,
    inventory,
  })

  const build = summarizeWatcherBuild({
    targetVersion: readServedWatcherVersion(),
    ...readReportedBuild(enrolment?.lastRunOutcome),
  })

  const run = summarizeWatcherRun(readReportedOperations(enrolment?.lastRunOutcome))

  return data({ sync, build, run }, { headers })
}

export default function WatcherPage({ loaderData }: Route.ComponentProps) {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 160 })} />}>
      <WatcherPageContent sync={loaderData.sync} build={loaderData.build} run={loaderData.run} />
    </Suspense>
  )
}
