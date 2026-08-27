
export const summary = "Report whether an intentional TestFlight cut is OWED (origin/main is ahead of the last shipped cut) or devices are CURRENT. On-demand, read-only, exit-0 always — a signal you query, never a blocking CI gate"

import type { CommandHelp } from "../../ops/surface.ts"
import { codeRoot } from "../../lib/code-root.ts"
import { APP_FLAG } from "../../lib/mobile-vocabulary.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { apps, buildInputs, cutFingerprints, gitTreeHash } from "../../lib/mobile-code.ts"
import type { CurrentTreeState } from "@alanwalton/mobile-cli/lib/cut-fingerprint"

export const help: CommandHelp = {
  flags: [
    APP_FLAG,
    {
      name: "--json",
      description:
        "Emit a single JSON object (app, owed, buildInputChanged, predatesBasis, currentMainSha, lastCut, commitsSinceLastCut) instead of the human summary.",
    },
  ],
  exits: [
    {
      code: 0,
      meaning:
        "always — reports OWED or CURRENT as a fact. An owed cut is an expected state, never a failure. Only genuine tool errors (an unreachable page query service, git failures) propagate.",
    },
  ],
  examples: ["ops mobile cut-status", "ops mobile cut-status --json"],
}

export default async function mobileCutStatus(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const { resolveApp } = await apps()
  const app = resolveApp(parsed.requireString("--app"))
  const json = parsed.boolean("--json")

  const { computeBuildInputTreeHash, countCommitsBetween, fetchOrigin, resolveRef, resolveRepoRoot } =
    await gitTreeHash()
  const { compareCutStatus, readLatestCutFingerprint } = await cutFingerprints()

  const { shellRepoRoot } = await apps()
  const { buildInputSources } = await buildInputs()

  const repoRoot = resolveRepoRoot(codeRoot())
  fetchOrigin(repoRoot)
  const mainSha = resolveRef(repoRoot, "origin/main")

  const shellRoot = resolveRepoRoot(shellRepoRoot(app))
  fetchOrigin(shellRoot)

  const current: CurrentTreeState = {
    mainSha,
    buildInputTreeHash: computeBuildInputTreeHash(
      buildInputSources(
        app,
        { root: repoRoot, ref: "origin/main" },
        { root: shellRoot, ref: "origin/main" }
      )
    ),
  }

  const last = await readLatestCutFingerprint(app.slug)
  const status = compareCutStatus(last, current)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        owed: status.owed,
        buildInputChanged: status.buildInputChanged,
        predatesBasis: status.predatesBasis,
        app: app.slug,
        currentMainSha: mainSha,
        lastCut: status.lastCut,
        commitsSinceLastCut: last
          ? countCommitsBetween(repoRoot, last.mainSha, "origin/main")
          : null,
      })}\n`
    )
    return
  }

  const shortSha = (sha: string): string => sha.slice(0, 12)

  if (last === null) {
    process.stdout.write(
      `⚠ No TestFlight cut on record for ${app.slug} — an intentional cut is OWED (devices carry no build from this fingerprint era).\n`
    )
    return
  }

  if (status.owed) {
    const commits = countCommitsBetween(repoRoot, last.mainSha, "origin/main")
    process.stdout.write(
      `⚠ CUT OWED (${app.slug}) — origin/main is ahead of the last shipped cut.\n`
    )
    process.stdout.write(
      `  last cut = build ${last.buildNumber}, mainSha ${shortSha(last.mainSha)}, cutAt ${last.cutAt}\n`
    )
    process.stdout.write(`  commits since last cut: ${commits}\n`)
    if (status.predatesBasis) {
      process.stdout.write(
        "  reason: last cut predates the corrected build-input-closure basis (#15271) — its fingerprint carries no comparable hash, so devices cannot be certified current until a fresh cut records one.\n"
      )
    } else {
      process.stdout.write("  build inputs changed since last cut: yes\n")
    }
    return
  }

  process.stdout.write(
    `✓ Devices current (${app.slug}) — last cut (build ${last.buildNumber}, mainSha ${shortSha(last.mainSha)}) matches origin/main; no cut owed.\n`
  )
}
