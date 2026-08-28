"use client"

import { Card, CardContent } from "@shared/design-primitives/components/card"
import { Heading } from "@shared/design-primitives/components/heading"
import { Text } from "@shared/design-primitives/components/text"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { AlertTriangle, CheckCircle2, CircleDashed, HelpCircle, Wrench } from "lucide-react"
import { formatRelativeTime } from "@/components/utils/format-relative-time"
import type { WatcherBuildSummary } from "@/lib/watcher-build-status"

type Presentation = {
  icon: typeof CheckCircle2
  tone: string
  title: string
  body: string
}

function ago(iso: string | null): string {
  return iso === null ? "" : ` ${formatRelativeTime(iso)}`
}

function present(build: WatcherBuildSummary): Presentation {
  switch (build.verdict) {
    case "current":
      return {
        icon: CheckCircle2,
        tone: "text-green",
        title: `Watcher was up to date${ago(build.reportedAt)}`,
        body: "The last time your Watcher reported in, it was running the build Temper currently serves. It updates itself, so it should stay that way — but this line describes that moment, not right now.",
      }
    case "stale":
      return {
        icon: AlertTriangle,
        tone: "text-orange",
        title: `Watcher is running an older build${ago(build.reportedAt)}`,
        body: "Your Watcher last reported a different build than the one Temper now serves. It is meant to update itself automatically, so this usually means its update check cannot reach Temper. Restarting the Watcher makes it check again; if this persists, tell us — the cause is on our side more often than yours.",
      }
    case "never-reported":
      return {
        icon: CircleDashed,
        tone: "text-tertiary",
        title: "Watcher has not reported its version",
        body: "Temper has never received a run report from this Watcher, so it cannot tell which build you are on. Either the Watcher has not completed a sync yet, or it predates version reporting and cannot say what it is running. Neither means it is broken — but neither confirms it is working.",
      }
    case "source-build":
      return {
        icon: Wrench,
        tone: "text-secondary",
        title: `Watcher is running from source${ago(build.reportedAt)}`,
        body: "This Watcher reports itself as a development build rather than a released one, so Temper cannot compare it to what it serves. That is expected when the Watcher runs from source. From a downloaded Watcher it would mean the build was stamped wrong — worth telling us about.",
      }
    case "target-unknown":
      return {
        icon: HelpCircle,
        tone: "text-tertiary",
        title: "Temper cannot tell which build it is serving",
        body: "Temper could not read its own current Watcher version, so it has nothing to compare yours against. This is a problem on Temper's side, not with your install, and it means Watcher updates are probably not being served to anyone right now.",
      }
    default:
      return assertNever(build.verdict)
  }
}

export function WatcherBuildStatusCard({ build }: { build: WatcherBuildSummary }) {
  const { icon: Icon, tone, title, body } = present(build)

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
