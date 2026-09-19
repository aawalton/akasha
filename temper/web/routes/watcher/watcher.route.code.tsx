import { getUser } from "akasha/alan/harness/supabase-rr/modules/auth-server/auth-server.module.code.ts"
import { createServerClient } from "akasha/alan/harness/supabase-rr/modules/server-client/server-client.module.code.ts"
import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { getPage, getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { readServedWatcherVersion } from "akasha/temper/web/.server/served-watcher-version/served-watcher-version.module.code.ts"
import {
  readReportedBuild,
  summarizeWatcherBuild,
} from "akasha/temper/web/modules/watcher-build-status/watcher-build-status.module.code.ts"
import { WatcherPageContent } from "akasha/temper/web/modules/watcher-page-content/watcher-page-content.module.code.tsx"
import {
  readReportedOperations,
  summarizeWatcherRun,
} from "akasha/temper/web/modules/watcher-run-status/watcher-run-status.module.code.ts"
import {
  summarizeWatcherSync,
  type WatcherSyncSourceCounts,
} from "akasha/temper/web/modules/watcher-sync-status/watcher-sync-status.module.code.ts"
import { Suspense } from "react"
import { data } from "react-router"

export function meta() {
  return [{ title: "Temper | Watcher" }]
}

function isoInstant(value: unknown): string | null {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) return null
  return value
}

async function readSource(pageTypeSlug: string, userId: string): Promise<WatcherSyncSourceCounts> {
  const result = await getPages({
    pageTypeSlug,
    where: [{ key: "accountPage", eq: userId }],
    select: ["updatedAt"],
    order: [{ by: "updatedAt", dir: "desc" }],
    limit: 1,
    withCount: true,
  })
  const newest = result.rows[0]
  const contact = newest?.updatedAt
  return {
    count: result.count ?? result.rows.length,
    lastContactAt: typeof contact === "string" ? contact : null,
    capturedAt: null,
  }
}

async function readAccountInventory(userId: string): Promise<WatcherSyncSourceCounts> {
  const held = await getPage({
    pageTypeSlug: "temper-account",
    where: [{ key: "title", eq: userId }],
    select: ["updatedAt", "capturedAt"],
  })
  const contact = held?.updatedAt
  return {
    count: held == null ? 0 : 1,
    lastContactAt: typeof contact === "string" ? contact : null,
    capturedAt: isoInstant(held?.capturedAt),
  }
}

export async function loader({ request }: { request: Request }) {
  const { headers } = createServerClient(request)
  const { user, headers: userHeaders } = await getUser(request)
  for (const [k, v] of userHeaders) {
    if (k.toLowerCase() === "set-cookie") headers.append("set-cookie", v)
  }

  if (!user) return data({ sync: null, build: null, run: null }, { headers })

  const [enrolment, characters, inventory] = await Promise.all([
    getPage({
      pageTypeSlug: "temper-watcher-enrolment",
      where: [{ key: "accountPage", eq: user.id }],
      select: ["tokenCreatedAt", "lastRunOutcome"],
    }),
    readSource("temper-account-character", user.id),
    readAccountInventory(user.id),
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

export default function WatcherPage({
  loaderData,
}: {
  loaderData: {
    sync: ReturnType<typeof summarizeWatcherSync> | null
    build: ReturnType<typeof summarizeWatcherBuild> | null
    run: ReturnType<typeof summarizeWatcherRun> | null
  }
}) {
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 160 })} />}>
      <WatcherPageContent sync={loaderData.sync} build={loaderData.build} run={loaderData.run} />
    </Suspense>
  )
}
