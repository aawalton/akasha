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
  WatcherRunOperation,
  WatcherRunSummary,
} from "akasha/temper/web/modules/watcher-run-status/watcher-run-status.module.code.ts"
import { watcherRunStatusCardFilesMissing } from "akasha/temper/web/phrase/pages/watcher-run-status-card-files-missing.temper-web-phrase.ts"
import { watcherRunStatusCardFilesMissingMany } from "akasha/temper/web/phrase/pages/watcher-run-status-card-files-missing-many.temper-web-phrase.ts"
import { watcherRunStatusCardFilesMissingOne } from "akasha/temper/web/phrase/pages/watcher-run-status-card-files-missing-one.temper-web-phrase.ts"
import { watcherRunStatusCardNameList } from "akasha/temper/web/phrase/pages/watcher-run-status-card-name-list.temper-web-phrase.ts"
import { watcherRunStatusCardNeverReported } from "akasha/temper/web/phrase/pages/watcher-run-status-card-never-reported.temper-web-phrase.ts"
import { watcherRunStatusCardNothingReadable } from "akasha/temper/web/phrase/pages/watcher-run-status-card-nothing-readable.temper-web-phrase.ts"
import { watcherRunStatusCardParseFailing } from "akasha/temper/web/phrase/pages/watcher-run-status-card-parse-failing.temper-web-phrase.ts"
import { watcherRunStatusCardParseFailingMany } from "akasha/temper/web/phrase/pages/watcher-run-status-card-parse-failing-many.temper-web-phrase.ts"
import { watcherRunStatusCardParseFailingOne } from "akasha/temper/web/phrase/pages/watcher-run-status-card-parse-failing-one.temper-web-phrase.ts"
import { watcherRunStatusCardRecorded } from "akasha/temper/web/phrase/pages/watcher-run-status-card-recorded.temper-web-phrase.ts"
import { watcherRunStatusCardUploadFailing } from "akasha/temper/web/phrase/pages/watcher-run-status-card-upload-failing.temper-web-phrase.ts"
import { watcherRunStatusCardUploadFailingMany } from "akasha/temper/web/phrase/pages/watcher-run-status-card-upload-failing-many.temper-web-phrase.ts"
import { watcherRunStatusCardUploadFailingOne } from "akasha/temper/web/phrase/pages/watcher-run-status-card-upload-failing-one.temper-web-phrase.ts"
import { watcherRunStatusCardWorking } from "akasha/temper/web/phrase/pages/watcher-run-status-card-working.temper-web-phrase.ts"
import { AlertTriangle, CheckCircle2, CircleDashed, FileQuestion, HelpCircle } from "lucide-react"

type Presentation = {
  icon: typeof CheckCircle2
  tone: string
  title: string
  body: string
}

type Worded = { slug: string }

function nameList(operations: readonly WatcherRunOperation[], phrase: Phrase): string {
  const names = operations.map((op) => op.name)
  if (names.length <= 1) return names[0] ?? ""
  return phrase(watcherRunStatusCardNameList.slug, {
    names: names.slice(0, -1).join(", "),
    last: names[names.length - 1] ?? "",
  })
}

function firstDetail(operations: readonly WatcherRunOperation[], phrase: Phrase): string {
  const detail = operations.find((op) => op.detail !== null)?.detail
  return detail == null ? "" : ` ${phrase(watcherRunStatusCardRecorded.slug, { detail })}`
}

function present(
  run: WatcherRunSummary,
  phrase: Phrase,
  describe: Phrase,
  phrases: WebPhrases | null
): Presentation {
  const count = run.decidingOperations.length
  const fills = {
    ago: ago(run.reportedAt, phrases),
    count,
    failing: nameList(run.decidingOperations, phrase),
    recorded: firstDetail(run.decidingOperations, phrase),
  }
  const worded = (
    icon: typeof CheckCircle2,
    tone: string,
    title: Worded,
    body: Worded
  ): Presentation => ({
    icon,
    tone,
    title: phrase(title.slug, fills),
    body: describe(body.slug, fills),
  })
  const counted = (one: Worded, many: Worded): Worded => (count === 1 ? one : many)

  switch (run.verdict) {
    case "working":
      return worded(
        CheckCircle2,
        "text-green",
        watcherRunStatusCardWorking,
        watcherRunStatusCardWorking
      )
    case "files-missing":
      return worded(
        FileQuestion,
        "text-orange",
        counted(watcherRunStatusCardFilesMissingOne, watcherRunStatusCardFilesMissingMany),
        watcherRunStatusCardFilesMissing
      )
    case "parse-failing":
      return worded(
        AlertTriangle,
        "text-orange",
        counted(watcherRunStatusCardParseFailingOne, watcherRunStatusCardParseFailingMany),
        watcherRunStatusCardParseFailing
      )
    case "upload-failing":
      return worded(
        AlertTriangle,
        "text-orange",
        counted(watcherRunStatusCardUploadFailingOne, watcherRunStatusCardUploadFailingMany),
        watcherRunStatusCardUploadFailing
      )
    case "never-reported":
      return worded(
        CircleDashed,
        "text-tertiary",
        watcherRunStatusCardNeverReported,
        watcherRunStatusCardNeverReported
      )
    case "nothing-readable":
      return worded(
        HelpCircle,
        "text-tertiary",
        watcherRunStatusCardNothingReadable,
        watcherRunStatusCardNothingReadable
      )
    default:
      return assertNever(run.verdict)
  }
}

export function WatcherRunStatusCard({ run }: { run: WatcherRunSummary }) {
  const phrase = usePhrase()
  const describe = usePhraseDescription()
  const phrases = useWebPhrases()
  const { icon: Icon, tone, title, body } = present(run, phrase, describe, phrases)

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
      </CardContent>
    </Card>
  )
}
