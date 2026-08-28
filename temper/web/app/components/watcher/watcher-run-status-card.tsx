"use client"

import { Card, CardContent, Heading, Text } from "@shared/design-system"
import { assertNever } from "@shared/utils-narrow/assert-never"
import { AlertTriangle, CheckCircle2, CircleDashed, FileQuestion, HelpCircle } from "lucide-react"
import { formatRelativeTime } from "@/components/utils/format-relative-time"
import type { WatcherRunOperation, WatcherRunSummary } from "@/lib/watcher-run-status"

type Presentation = {
  icon: typeof CheckCircle2
  tone: string
  title: string
  body: string
}

function ago(iso: string | null): string {
  return iso === null ? "" : ` ${formatRelativeTime(iso)}`
}

function nameList(operations: readonly WatcherRunOperation[]): string {
  const names = operations.map((op) => op.name)
  if (names.length <= 1) return names[0] ?? ""
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`
}

function firstDetail(operations: readonly WatcherRunOperation[]): string {
  const detail = operations.find((op) => op.detail !== null)?.detail
  return detail == null ? "" : ` Temper recorded: ${detail}`
}

function present(run: WatcherRunSummary): Presentation {
  const failing = nameList(run.decidingOperations)
  const count = run.decidingOperations.length

  switch (run.verdict) {
    case "working":
      return {
        icon: CheckCircle2,
        tone: "text-green",
        title: `Everything the Watcher tried succeeded${ago(run.reportedAt)}`,
        body: `The Watcher read the add-on files it looks for and delivered all ${count} of them. This describes that run, not this moment — it reports each time it does work, so the line above will age while nothing is wrong.`,
      }
    case "files-missing":
      return {
        icon: FileQuestion,
        tone: "text-orange",
        title: `The Watcher could not find ${count === 1 ? "a file" : `${count} files`} it reads${ago(run.reportedAt)}`,
        body: `It found nothing to read for ${failing}. That is what an add-on that is not installed, is not ticked on in game, or was extracted into the wrong Documents folder looks like from here — if your Documents folder syncs to OneDrive, the real add-ons folder is the one under OneDrive. Nothing from ${failing} can sync until those files exist.${firstDetail(run.decidingOperations)}`,
      }
    case "parse-failing":
      return {
        icon: AlertTriangle,
        tone: "text-orange",
        title: `The Watcher could not read ${count === 1 ? "a file" : `${count} files`}${ago(run.reportedAt)}`,
        body: `The file for ${failing} exists and the Watcher could not make sense of it. That is more likely our bug than anything you did — the add-on may be writing a shape Temper does not expect, or the file was captured mid-write. Please tell us.${firstDetail(run.decidingOperations)}`,
      }
    case "upload-failing":
      return {
        icon: AlertTriangle,
        tone: "text-orange",
        title: `The Watcher could not deliver ${count === 1 ? "an upload" : `${count} uploads`}${ago(run.reportedAt)}`,
        body: `It read the data for ${failing} and could not get it to Temper, so the failure sits between your Watcher and us rather than in your add-ons. It retries on its next run. If this keeps showing, it is ours to fix.${firstDetail(run.decidingOperations)}`,
      }
    case "never-reported":
      return {
        icon: CircleDashed,
        tone: "text-tertiary",
        title: "The Watcher has not reported a sync run",
        body: "Temper has no account of what the Watcher tried, so it cannot say whether anything is working. A Watcher reports after it does its first work, so if you have just linked, this is expected — reload this page in a few minutes. If it still says this later, the Watcher is not running on your computer, whatever the link told you.",
      }
    case "nothing-readable":
      return {
        icon: HelpCircle,
        tone: "text-tertiary",
        title: "Temper cannot tell what the Watcher's last run did",
        body: "A report arrived, but nothing in it says what happened — either the Watcher had no work to do, or it is an older build that reports less than Temper now reads. Neither means it is broken, and neither confirms it is working.",
      }
    default:
      return assertNever(run.verdict)
  }
}

export function WatcherRunStatusCard({ run }: { run: WatcherRunSummary }) {
  const { icon: Icon, tone, title, body } = present(run)

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
