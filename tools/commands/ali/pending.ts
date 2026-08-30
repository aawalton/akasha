export const summary = "Preview the books repo's not-yet-landed Learn points, threshold-relative: today's Learn stoplight + progress to the next wallpaper/level"

import { readdir } from "node:fs/promises"
import { homedir } from "node:os"
import { join } from "node:path"
import type { CommandHelp } from "../../ops/surface.ts"
import {
  buildPendingReport,
  type PendingReport,
} from "../../../alan/persona/pending-report/pending-report.ts"
import { FAITH_LEARN_DAILY_LADDER } from "../../../readouts/ring/ladder/ladder.ts"
import { stageForLevel } from "../../lib/akasha-closeness.ts"
import { booksRoot } from "../../lib/book-of-everything-root.ts"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--json",
      description: "Emit the pending report as single-line JSON instead of the prose summary",
    },
  ],
  exits: [
    { code: 0, meaning: "pending report computed and printed" },
    { code: 3, meaning: "operational error — git missing or a git command failed" },
  ],
  examples: ["ops ali pending", "ops ali pending --json"],
}

interface NetBytesPoints {
  readonly LEARN_BOOKS_PREFIX: string
  readonly resolveLandedBase: (repoRoot: string) => Promise<string>
  readonly readPendingNetBytes: (
    repoRoot: string,
    pathPrefixes: string,
    base?: string
  ) => Promise<number>
  readonly readNetBytesCumulative: (
    repoRoot: string,
    pathPrefixes: string,
    ref?: string
  ) => Promise<number>
}

function isEnoent(e: unknown): boolean {
  return typeof e === "object" && e !== null && "code" in e && e.code === "ENOENT"
}

async function readWallpaperCount(): Promise<number> {
  const dir = join(homedir(), "Pictures", "Wallpapers", "Personas", "Ali")
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    return entries.filter((entry) => entry.isFile()).length
  } catch (e) {
    if (isEnoent(e)) return 0
    throw e
  }
}

const fmt = (n: number): string => n.toLocaleString("en-US")
const pct = (n: number): string => `${n.toFixed(1)}%`

const AKASHA_ROOT = new URL("../../..", import.meta.url).pathname

function renderProse(r: PendingReport): string {
  const lines: string[] = [`Pending: ${fmt(r.pendingPoints)} points not yet landed (Learn).`]

  if (r.pendingPoints === 0) {
    lines.push("Today's Learn stoplight from pending: nothing staged.")
  } else {
    const toNext =
      r.nextTier !== null && r.pointsToNextTier !== null
        ? ` ${fmt(r.pointsToNextTier)} more → ${r.nextTier.toUpperCase()}.`
        : " (top tier)."
    lines.push(`Today's Learn stoplight from pending: ${r.dailyTier.toUpperCase()}.${toNext}`)
  }

  lines.push(
    `Relationship: level ${r.currentLevel} (${stageForLevel(AKASHA_ROOT, r.currentLevel)}), ${pct(r.currentPercentProgress)} ` +
      `into the level. Landing this → level ${r.projectedLevel} (${pct(r.projectedPercentProgress)}).`
  )
  lines.push(
    `Next wallpaper: ${fmt(r.currentNextWallpaperDeficit)} points away — ` +
      `landing this leaves ${fmt(r.projectedNextWallpaperDeficit)}.`
  )
  return `${lines.join("\n")}\n`
}

export default async function aliPending(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const netBytes: NetBytesPoints = await import("../../lib/daily-tracking/net-bytes-points.ts")

  let report: PendingReport
  try {
    const repoRoot = booksRoot()
    const base = await netBytes.resolveLandedBase(repoRoot)
    const [pendingPoints, landedPoints, wallpaperCount] = await Promise.all([
      netBytes.readPendingNetBytes(repoRoot, netBytes.LEARN_BOOKS_PREFIX, base),
      netBytes.readNetBytesCumulative(repoRoot, netBytes.LEARN_BOOKS_PREFIX, base),
      readWallpaperCount(),
    ])
    report = buildPendingReport({
      pendingPoints,
      landedPoints,
      wallpaperCount,
      ladder: FAITH_LEARN_DAILY_LADDER,
    })
  } catch (e) {
    throw operationalError(e instanceof Error ? e.message : String(e))
  }

  process.stdout.write(json ? `${JSON.stringify(report)}\n` : renderProse(report))
}
