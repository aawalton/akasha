"use client"

import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import {
  Card,
  CardContent,
} from "akasha/design/interface/primitive/modules/card/card.module.code.tsx"
import { Heading } from "akasha/design/interface/primitive/modules/heading/heading.module.code.tsx"
import { Text } from "akasha/design/interface/primitive/modules/text-body/text-body.module.code.tsx"
import { ago } from "akasha/temper/web/modules/format-time-ago/format-time-ago.module.code.ts"
import {
  type Phrase,
  usePhrase,
  usePhraseDescription,
  useWebPhrases,
  type WebPhrases,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import type {
  WatcherSyncSourceCounts,
  WatcherSyncSummary,
} from "akasha/temper/web/modules/watcher-sync-status/watcher-sync-status.module.code.ts"
import { watcherSyncStatusCardCaptured } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-captured.temper-web-phrase.ts"
import { watcherSyncStatusCardCharacterCountMany } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-character-count-many.temper-web-phrase.ts"
import { watcherSyncStatusCardCharacterCountOne } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-character-count-one.temper-web-phrase.ts"
import { watcherSyncStatusCardCharacters } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-characters.temper-web-phrase.ts"
import { watcherSyncStatusCardConnectedNoData } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-connected-no-data.temper-web-phrase.ts"
import { watcherSyncStatusCardConnectedStaleData } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-connected-stale-data.temper-web-phrase.ts"
import { watcherSyncStatusCardDataDate } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-data-date.temper-web-phrase.ts"
import { watcherSyncStatusCardDataWithoutWatcher } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-data-without-watcher.temper-web-phrase.ts"
import { watcherSyncStatusCardInventory } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-inventory.temper-web-phrase.ts"
import { watcherSyncStatusCardLastReceived } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-last-received.temper-web-phrase.ts"
import { watcherSyncStatusCardNoCapture } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-no-capture.temper-web-phrase.ts"
import { watcherSyncStatusCardNoCharacters } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-no-characters.temper-web-phrase.ts"
import { watcherSyncStatusCardNoneReceived } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-none-received.temper-web-phrase.ts"
import { watcherSyncStatusCardNotConnected } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-not-connected.temper-web-phrase.ts"
import { watcherSyncStatusCardReceived } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-received.temper-web-phrase.ts"
import { watcherSyncStatusCardSyncing } from "akasha/temper/web/phrase/pages/watcher-sync-status-card-syncing.temper-web-phrase.ts"
import { AlertTriangle, CheckCircle2, CircleDashed, Clock, FileUp } from "lucide-react"

type Presentation = {
  icon: typeof CheckCircle2
  tone: string
  wording: { slug: string }
}

function present(sync: WatcherSyncSummary): Presentation {
  switch (sync.verdict) {
    case "not-connected":
      return {
        icon: CircleDashed,
        tone: "text-tertiary",
        wording: watcherSyncStatusCardNotConnected,
      }
    case "connected-no-data":
      return {
        icon: AlertTriangle,
        tone: "text-orange",
        wording: watcherSyncStatusCardConnectedNoData,
      }
    case "data-without-watcher":
      return {
        icon: FileUp,
        tone: "text-secondary",
        wording: watcherSyncStatusCardDataWithoutWatcher,
      }
    case "connected-stale-data":
      return {
        icon: Clock,
        tone: "text-secondary",
        wording: watcherSyncStatusCardConnectedStaleData,
      }
    case "syncing":
      return presentSyncing(sync)
    default:
      return assertNever(sync.verdict)
  }
}

function dataDateSentence(
  sync: WatcherSyncSummary,
  phrase: Phrase,
  phrases: WebPhrases | null
): string {
  return sync.dataCapturedAt === null
    ? ""
    : ` ${phrase(watcherSyncStatusCardDataDate.slug, { capturedAgo: ago(sync.dataCapturedAt, phrases) })}`
}

function presentSyncing(sync: WatcherSyncSummary): Presentation {
  if (sync.dataCapturedAt === null) {
    return { icon: CircleDashed, tone: "text-secondary", wording: watcherSyncStatusCardNoCapture }
  }

  if (sync.characters.count === 0) {
    return {
      icon: CircleDashed,
      tone: "text-secondary",
      wording: watcherSyncStatusCardNoCharacters,
    }
  }

  return { icon: CheckCircle2, tone: "text-green", wording: watcherSyncStatusCardSyncing }
}

function sourceDetail(
  source: WatcherSyncSourceCounts,
  countLabel: ((count: number) => string) | null,
  phrase: Phrase,
  phrases: WebPhrases | null
): string {
  if (source.count === 0) return phrase(watcherSyncStatusCardNoneReceived.slug)

  const parts = [
    ...(countLabel === null ? [] : [countLabel(source.count)]),
    ...(source.capturedAt === null
      ? []
      : [phrase(watcherSyncStatusCardCaptured.slug, { ago: ago(source.capturedAt, phrases) })]),
    ...(source.lastContactAt === null
      ? []
      : [
          phrase(watcherSyncStatusCardLastReceived.slug, {
            ago: ago(source.lastContactAt, phrases),
          }),
        ]),
  ]

  return parts.length === 0 ? phrase(watcherSyncStatusCardReceived.slug) : parts.join(" · ")
}

function SourceRow({
  label,
  source,
  countLabel,
}: {
  label: string
  source: WatcherSyncSourceCounts
  countLabel: ((count: number) => string) | null
}) {
  const phrase = usePhrase()
  const phrases = useWebPhrases()
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <span className="text-secondary">{label}</span>
      <span className={source.count === 0 ? "text-tertiary" : "text-primary"}>
        {sourceDetail(source, countLabel, phrase, phrases)}
      </span>
    </div>
  )
}

export function WatcherSyncStatusCard({ sync }: { sync: WatcherSyncSummary }) {
  const phrase = usePhrase()
  const describe = usePhraseDescription()
  const phrases = useWebPhrases()
  const { icon: Icon, tone, wording } = present(sync)
  const fills = {
    connectedAgo: ago(sync.connectedAt, phrases),
    contactAgo: ago(sync.lastContactAt, phrases),
    capturedAgo: ago(sync.dataCapturedAt, phrases),
    dataDate: dataDateSentence(sync, phrase, phrases),
  }
  const title = phrase(wording.slug, fills)
  const body = describe(wording.slug, fills)

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Icon className={`h-5 w-5 shrink-0 translate-y-0.5 ${tone}`} aria-hidden />
          <div className="flex flex-col gap-1">
            <Heading as="h2">{title}</Heading>
            <Text variant="prose">{body}</Text>
          </div>
        </div>

        {}
        <div className="flex flex-col gap-1 border-border border-t pt-3">
          <SourceRow
            label={phrase(watcherSyncStatusCardCharacters.slug)}
            source={sync.characters}
            countLabel={(n) =>
              phrase(
                n === 1
                  ? watcherSyncStatusCardCharacterCountOne.slug
                  : watcherSyncStatusCardCharacterCountMany.slug,
                { count: n }
              )
            }
          />
          <SourceRow
            label={phrase(watcherSyncStatusCardInventory.slug)}
            source={sync.inventory}
            countLabel={null}
          />
        </div>
      </CardContent>
    </Card>
  )
}
