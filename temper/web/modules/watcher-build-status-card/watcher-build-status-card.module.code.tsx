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
  usePhrase,
  usePhraseDescription,
} from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import type { WatcherBuildSummary } from "akasha/temper/web/modules/watcher-build-status/watcher-build-status.module.code.ts"
import { watcherBuildStatusCardCurrent } from "akasha/temper/web/phrase/pages/watcher-build-status-card-current.temper-web-phrase.ts"
import { watcherBuildStatusCardNeverReported } from "akasha/temper/web/phrase/pages/watcher-build-status-card-never-reported.temper-web-phrase.ts"
import { watcherBuildStatusCardSourceBuild } from "akasha/temper/web/phrase/pages/watcher-build-status-card-source-build.temper-web-phrase.ts"
import { watcherBuildStatusCardStale } from "akasha/temper/web/phrase/pages/watcher-build-status-card-stale.temper-web-phrase.ts"
import { watcherBuildStatusCardTargetUnknown } from "akasha/temper/web/phrase/pages/watcher-build-status-card-target-unknown.temper-web-phrase.ts"
import { AlertTriangle, CheckCircle2, CircleDashed, HelpCircle, Wrench } from "lucide-react"

type Presentation = {
  icon: typeof CheckCircle2
  tone: string
  wording: { slug: string }
}

function present(build: WatcherBuildSummary): Presentation {
  switch (build.verdict) {
    case "current":
      return { icon: CheckCircle2, tone: "text-green", wording: watcherBuildStatusCardCurrent }
    case "stale":
      return { icon: AlertTriangle, tone: "text-orange", wording: watcherBuildStatusCardStale }
    case "never-reported":
      return {
        icon: CircleDashed,
        tone: "text-tertiary",
        wording: watcherBuildStatusCardNeverReported,
      }
    case "source-build":
      return { icon: Wrench, tone: "text-secondary", wording: watcherBuildStatusCardSourceBuild }
    case "target-unknown":
      return {
        icon: HelpCircle,
        tone: "text-tertiary",
        wording: watcherBuildStatusCardTargetUnknown,
      }
    default:
      return assertNever(build.verdict)
  }
}

export function WatcherBuildStatusCard({ build }: { build: WatcherBuildSummary }) {
  const phrase = usePhrase()
  const describe = usePhraseDescription()
  const { icon: Icon, tone, wording } = present(build)
  const title = phrase(wording.slug, { ago: ago(build.reportedAt) })
  const body = describe(wording.slug)

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
