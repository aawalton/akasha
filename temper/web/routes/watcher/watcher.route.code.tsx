import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { PageLayoutSkeleton } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { getPage, getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { NEVER_MATCH_VALUE } from "akasha/page/access/modules/sentinels/sentinels.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { findAccountAddress } from "akasha/temper/player/character/temper-account/modules/account-address/account-address.module.code.ts"
import { readServedWatcherVersion } from "akasha/temper/web/.server/served-watcher-version/served-watcher-version.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import {
  type ReportedBuild,
  readReportedBuild,
  summarizeWatcherBuild,
} from "akasha/temper/web/modules/watcher-build-status/watcher-build-status.module.code.ts"
import { WatcherPageContent } from "akasha/temper/web/modules/watcher-page-content/watcher-page-content.module.code.tsx"
import {
  type ReportedRun,
  readReportedOperations,
  summarizeWatcherRun,
} from "akasha/temper/web/modules/watcher-run-status/watcher-run-status.module.code.ts"
import {
  summarizeWatcherSync,
  type WatcherSyncSourceCounts,
} from "akasha/temper/web/modules/watcher-sync-status/watcher-sync-status.module.code.ts"
import { watcherDocumentTitle } from "akasha/temper/web/phrase/pages/watcher-document-title.temper-web-phrase.ts"
import { Suspense } from "react"
import { data } from "react-router"

const ENROLMENT = "temper-watcher-enrolment"

const ACCOUNT_CHARACTER = "temper-account-character"

const ACCOUNT = "temper-account"

const READ = [ENROLMENT, ACCOUNT_CHARACTER, ACCOUNT]

export function meta() {
  return [{ title: watcherDocumentTitle.title }]
}

function isoInstant(value: unknown): string | null {
  if (typeof value !== "string" || Number.isNaN(Date.parse(value))) return null
  return value
}

async function readSource(
  pageTypeSlug: string,
  accountPage: string,
  reportedAt: string | null
): Promise<WatcherSyncSourceCounts> {
  const result = await getPages({
    pageTypeSlug,
    where: [{ key: "accountPage", eq: accountPage }],
    select: ["id"],
    limit: 1,
    withCount: true,
  })
  return {
    count: result.count ?? result.rows.length,
    lastContactAt: reportedAt,
    capturedAt: null,
  }
}

async function readAccountInventory(
  userId: string,
  reportedAt: string | null
): Promise<WatcherSyncSourceCounts> {
  const held = await getPage({
    pageTypeSlug: ACCOUNT,
    where: [{ key: "key", eq: userId }],
    select: ["capturedAt"],
  })
  return {
    count: held == null ? 0 : 1,
    lastContactAt: reportedAt,
    capturedAt: isoInstant(held?.capturedAt),
  }
}

export async function loader({ request }: { request: Request }) {
  const reader = await signedInAs(TEMPER_SITE, request)
  const reached = reader === null ? null : await accountOfContributor(reader)
  const accountId = reached?.ok === true ? reached.account : null

  if (accountId === null) return data({ sync: null, build: null, run: null })

  const accountPage = (await findAccountAddress(accountId)) ?? NEVER_MATCH_VALUE

  const enrolment = await getPage({
    pageTypeSlug: ENROLMENT,
    where: [{ key: "accountPage", eq: accountPage }],
    select: ["tokenCreatedAt", "watcherVersion", "reportedAt", "operations"],
  })
  const reportedAt = isoInstant(enrolment?.reportedAt)

  const [characters, inventory] = await Promise.all([
    readSource(ACCOUNT_CHARACTER, accountPage, reportedAt),
    readAccountInventory(accountId, reportedAt),
  ])

  const createdAt = enrolment?.tokenCreatedAt
  const sync = summarizeWatcherSync({
    connectedAt: typeof createdAt === "string" ? createdAt : null,
    characters,
    inventory,
  })

  const report = (enrolment ?? {}) as ReportedBuild & ReportedRun

  const build = summarizeWatcherBuild({
    targetVersion: readServedWatcherVersion(),
    ...readReportedBuild(report),
  })

  const run = summarizeWatcherRun(readReportedOperations(report))

  return data({ sync, build, run })
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
  useLoaderFollowing(READ)
  return (
    <Suspense fallback={<PageLayoutSkeleton config={simplePageSkeleton({ titleWidth: 160 })} />}>
      <WatcherPageContent sync={loaderData.sync} build={loaderData.build} run={loaderData.run} />
    </Suspense>
  )
}
