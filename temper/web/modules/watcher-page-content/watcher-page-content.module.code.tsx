"use client"

import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { LayoutLink } from "akasha/design/interface/layout/modules/router-context/router-context.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import {
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import type { WatcherBuildSummary } from "akasha/temper/web/modules/watcher-build-status/watcher-build-status.module.code.ts"
import { WatcherBuildStatusCard } from "akasha/temper/web/modules/watcher-build-status-card/watcher-build-status-card.module.code.tsx"
import type { WatcherRunSummary } from "akasha/temper/web/modules/watcher-run-status/watcher-run-status.module.code.ts"
import { WatcherRunStatusCard } from "akasha/temper/web/modules/watcher-run-status-card/watcher-run-status-card.module.code.tsx"
import type { WatcherSyncSummary } from "akasha/temper/web/modules/watcher-sync-status/watcher-sync-status.module.code.ts"
import { WatcherSyncStatusCard } from "akasha/temper/web/modules/watcher-sync-status-card/watcher-sync-status-card.module.code.tsx"
import { watcherPageContentAddonsDownload } from "akasha/temper/web/phrase/pages/watcher-page-content-addons-download.temper-web-phrase.ts"
import { watcherPageContentAddonsHeading } from "akasha/temper/web/phrase/pages/watcher-page-content-addons-heading.temper-web-phrase.ts"
import { watcherPageContentAddonsName } from "akasha/temper/web/phrase/pages/watcher-page-content-addons-name.temper-web-phrase.ts"
import { watcherPageContentAddonsNeed } from "akasha/temper/web/phrase/pages/watcher-page-content-addons-need.temper-web-phrase.ts"
import { watcherPageContentAddonsPath } from "akasha/temper/web/phrase/pages/watcher-page-content-addons-path.temper-web-phrase.ts"
import { watcherPageContentCharactersAddon } from "akasha/temper/web/phrase/pages/watcher-page-content-characters-addon.temper-web-phrase.ts"
import { watcherPageContentHeading } from "akasha/temper/web/phrase/pages/watcher-page-content-heading.temper-web-phrase.ts"
import { watcherPageContentIntro } from "akasha/temper/web/phrase/pages/watcher-page-content-intro.temper-web-phrase.ts"
import { watcherPageContentItemsAddon } from "akasha/temper/web/phrase/pages/watcher-page-content-items-addon.temper-web-phrase.ts"
import { watcherPageContentManual } from "akasha/temper/web/phrase/pages/watcher-page-content-manual.temper-web-phrase.ts"
import { watcherPageContentManualHeading } from "akasha/temper/web/phrase/pages/watcher-page-content-manual-heading.temper-web-phrase.ts"
import { watcherPageContentManualLink } from "akasha/temper/web/phrase/pages/watcher-page-content-manual-link.temper-web-phrase.ts"
import { watcherPageContentMenu } from "akasha/temper/web/phrase/pages/watcher-page-content-menu.temper-web-phrase.ts"
import { watcherPageContentNeedsHeading } from "akasha/temper/web/phrase/pages/watcher-page-content-needs-heading.temper-web-phrase.ts"
import { watcherPageContentOnedrivePath } from "akasha/temper/web/phrase/pages/watcher-page-content-onedrive-path.temper-web-phrase.ts"
import { watcherPageContentOutOfDate } from "akasha/temper/web/phrase/pages/watcher-page-content-out-of-date.temper-web-phrase.ts"
import { watcherPageContentStepBrowser } from "akasha/temper/web/phrase/pages/watcher-page-content-step-browser.temper-web-phrase.ts"
import { watcherPageContentStepCheck } from "akasha/temper/web/phrase/pages/watcher-page-content-step-check.temper-web-phrase.ts"
import { watcherPageContentStepEnable } from "akasha/temper/web/phrase/pages/watcher-page-content-step-enable.temper-web-phrase.ts"
import { watcherPageContentStepExtract } from "akasha/temper/web/phrase/pages/watcher-page-content-step-extract.temper-web-phrase.ts"
import { watcherPageContentStepInstalls } from "akasha/temper/web/phrase/pages/watcher-page-content-step-installs.temper-web-phrase.ts"
import { watcherPageContentStepLogin } from "akasha/temper/web/phrase/pages/watcher-page-content-step-login.temper-web-phrase.ts"
import { watcherPageContentStepRun } from "akasha/temper/web/phrase/pages/watcher-page-content-step-run.temper-web-phrase.ts"
import { watcherPageContentStepTtc } from "akasha/temper/web/phrase/pages/watcher-page-content-step-ttc.temper-web-phrase.ts"
import { watcherPageContentStepWarning } from "akasha/temper/web/phrase/pages/watcher-page-content-step-warning.temper-web-phrase.ts"
import { watcherPageContentTtcName } from "akasha/temper/web/phrase/pages/watcher-page-content-ttc-name.temper-web-phrase.ts"
import { watcherPageContentTtcNeed } from "akasha/temper/web/phrase/pages/watcher-page-content-ttc-need.temper-web-phrase.ts"
import { watcherPageContentWarningChoice } from "akasha/temper/web/phrase/pages/watcher-page-content-warning-choice.temper-web-phrase.ts"
import { watcherPageContentWatcherCaption } from "akasha/temper/web/phrase/pages/watcher-page-content-watcher-caption.temper-web-phrase.ts"
import { watcherPageContentWatcherDownload } from "akasha/temper/web/phrase/pages/watcher-page-content-watcher-download.temper-web-phrase.ts"
import { watcherPageContentWatcherFile } from "akasha/temper/web/phrase/pages/watcher-page-content-watcher-file.temper-web-phrase.ts"
import { watcherPageContentWatcherHeading } from "akasha/temper/web/phrase/pages/watcher-page-content-watcher-heading.temper-web-phrase.ts"
import { watcherPageContentWindowsName } from "akasha/temper/web/phrase/pages/watcher-page-content-windows-name.temper-web-phrase.ts"
import { watcherPageContentWindowsNeed } from "akasha/temper/web/phrase/pages/watcher-page-content-windows-need.temper-web-phrase.ts"
import { FolderDown, MonitorDown } from "lucide-react"
import { createElement, Fragment, type ReactNode } from "react"

const SETUP_STEPS = "list-decimal space-y-3 pl-5 text-sm/relaxed text-secondary"
const REQUIREMENTS = "space-y-3 text-sm/relaxed text-secondary"
const SLOT = /(\{\w+\})/

function filledWith(text: string, nodes: Readonly<Record<string, ReactNode>>): ReactNode {
  const pieces = text.split(SLOT).map((piece) => {
    const name = piece.startsWith("{") && piece.endsWith("}") ? piece.slice(1, -1) : null
    return name !== null && name in nodes ? nodes[name] : piece
  })
  return createElement(Fragment, null, ...pieces)
}

function Strong({ children }: { children: ReactNode }) {
  return <strong className="text-primary">{children}</strong>
}

export function WatcherPageContent({
  sync,
  build,
  run,
}: {
  sync: WatcherSyncSummary | null
  build: WatcherBuildSummary | null
  run: WatcherRunSummary | null
}) {
  const surface = useSurface()
  const phrase = usePhrase()
  const describe = usePhraseDescription()
  const path = `rounded ${surfaceClass(surface + 1)} px-1.5 py-0.5 text-xs`
  const ttcName = <Strong>{phrase(watcherPageContentTtcName.slug)}</Strong>

  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{phrase(watcherPageContentHeading.slug)}</PageTitle>
      </PageLayout.Header>

      <PageLayout.Content>
        <div className="flex max-w-panel flex-col gap-6">
          {sync !== null && <WatcherSyncStatusCard sync={sync} />}

          {}
          {run !== null && <WatcherRunStatusCard run={run} />}

          {}
          {build !== null && <WatcherBuildStatusCard build={build} />}

          {}
          <Card>
            <CardContent className="flex flex-col gap-4">
              <Text variant="prose">{phrase(watcherPageContentIntro.slug)}</Text>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="flex flex-col gap-3">
              <Heading as="h2">{phrase(watcherPageContentNeedsHeading.slug)}</Heading>
              <ul className={REQUIREMENTS}>
                <li>
                  {filledWith(describe(watcherPageContentAddonsNeed.slug), {
                    name: <Strong>{phrase(watcherPageContentAddonsName.slug)}</Strong>,
                    characters: <Strong>{phrase(watcherPageContentCharactersAddon.slug)}</Strong>,
                    items: <Strong>{phrase(watcherPageContentItemsAddon.slug)}</Strong>,
                  })}
                </li>
                <li>{filledWith(describe(watcherPageContentTtcNeed.slug), { name: ttcName })}</li>
                <li>
                  {filledWith(phrase(watcherPageContentWindowsNeed.slug), {
                    name: <Strong>{phrase(watcherPageContentWindowsName.slug)}</Strong>,
                  })}
                </li>
              </ul>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="flex flex-col gap-3">
              <Heading as="h2">{phrase(watcherPageContentAddonsHeading.slug)}</Heading>
              <Button asChild variant="accent" className="w-fit">
                <a href="/api/addons/download" download>
                  <FolderDown className="h-4 w-4" />
                  {phrase(watcherPageContentAddonsDownload.slug)}
                </a>
              </Button>
              <ol className={SETUP_STEPS}>
                <li>
                  {filledWith(describe(watcherPageContentStepExtract.slug), {
                    path: <code className={path}>{phrase(watcherPageContentAddonsPath.slug)}</code>,
                    oneDrivePath: (
                      <code className={path}>{phrase(watcherPageContentOnedrivePath.slug)}</code>
                    ),
                  })}
                </li>
                <li>{filledWith(phrase(watcherPageContentStepTtc.slug), { name: ttcName })}</li>
                <li>
                  {filledWith(describe(watcherPageContentStepEnable.slug), {
                    menu: <Strong>{phrase(watcherPageContentMenu.slug)}</Strong>,
                    outOfDate: <Strong>{phrase(watcherPageContentOutOfDate.slug)}</Strong>,
                  })}
                </li>
                <li>{phrase(watcherPageContentStepLogin.slug)}</li>
              </ol>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="flex flex-col gap-3">
              <Heading as="h2">{phrase(watcherPageContentWatcherHeading.slug)}</Heading>
              <Button asChild variant="accent" className="w-fit">
                <a href="/api/watcher/download" download>
                  <MonitorDown className="h-4 w-4" />
                  {phrase(watcherPageContentWatcherDownload.slug)}
                </a>
              </Button>
              <Text variant="caption">{phrase(watcherPageContentWatcherCaption.slug)}</Text>
              <ol className={SETUP_STEPS}>
                <li>
                  {filledWith(phrase(watcherPageContentStepRun.slug), {
                    file: <Strong>{phrase(watcherPageContentWatcherFile.slug)}</Strong>,
                  })}
                </li>
                <li>
                  {filledWith(phrase(watcherPageContentStepWarning.slug), {
                    choice: <Strong>{phrase(watcherPageContentWarningChoice.slug)}</Strong>,
                  })}
                </li>
                <li>{phrase(watcherPageContentStepInstalls.slug)}</li>
                <li>{phrase(watcherPageContentStepBrowser.slug)}</li>
                <li>{phrase(watcherPageContentStepCheck.slug)}</li>
              </ol>
            </CardContent>
          </Card>

          {}
          <Card>
            <CardContent className="flex flex-col gap-2">
              <Heading as="h2">{phrase(watcherPageContentManualHeading.slug)}</Heading>
              <Text variant="prose">
                {filledWith(describe(watcherPageContentManual.slug), {
                  link: (
                    <LayoutLink href="/import" className="text-accent hover:underline">
                      {phrase(watcherPageContentManualLink.slug)}
                    </LayoutLink>
                  ),
                })}
              </Text>
            </CardContent>
          </Card>
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
