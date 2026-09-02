
export const summary = "File the cut fingerprint for a TestFlight build that is already at Apple. The second caller for a filing that failed during the cut itself — the deploy prints this exact call when its own filing does not land"

import type { CommandHelp } from "../../ops/surface.ts"
import { APP_FLAG } from "../../lib/mobile-vocabulary.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { apps, cutFingerprints } from "../../lib/mobile-code.ts"
import type { CutFingerprint } from "@akasha/mobile-cli/cut-fingerprint"

export const help: CommandHelp = {
  flags: [
    APP_FLAG,
    {
      name: "--build-number",
      argLabel: "<n>",
      valueShape: "token",
      description:
        "The build number App Store Connect assigned. This is the number the failed cut printed, never a guess — a wrong one files a fingerprint against a build that is not the one at Apple.",
    },
    {
      name: "--main-sha",
      argLabel: "<sha>",
      valueShape: "token",
      description: "The code-repo commit the cut was taken at.",
    },
    {
      name: "--shell-sha",
      argLabel: "<sha>",
      valueShape: "token",
      description: "The shell-repo commit the cut was taken at. Omit where the cut named none.",
    },
    {
      name: "--build-input-tree-hash",
      argLabel: "<hash>",
      valueShape: "token",
      description:
        "The build-input closure hash the cut computed. Omit only where the cut printed none: a fingerprint without one reads as predating the basis and leaves a cut owed.",
    },
    {
      name: "--cut-at",
      argLabel: "<iso8601>",
      valueShape: "token",
      description:
        "When the cut was taken, as the cut printed it. Defaults to now, which is wrong for any filing that is not immediate.",
    },
  ],
  exits: [
    { code: 0, meaning: "the fingerprint is filed and committed" },
    {
      code: 2,
      meaning: "a flag is missing or unreadable — nothing was filed",
    },
    {
      code: 3,
      meaning:
        "the page would not be written or the commit did not take — nothing was filed, and the call can be run again",
    },
  ],
  examples: [
    "ops mobile cut-record --app alanwalton --build-number 199 --main-sha abc123 --shell-sha def456 --build-input-tree-hash 0f1e2d --cut-at 2026-09-02T04:15:00.000Z",
  ],
}

export default async function mobileCutRecord(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const { resolveApp } = await apps()
  const app = resolveApp(parsed.requireString("--app"))

  const buildNumber = parsed.nonNegativeInt("--build-number")
  if (buildNumber === undefined || buildNumber < 1) {
    throw inputError(
      "--build-number names the build App Store Connect assigned, and it is a whole number of at least 1"
    )
  }

  const cutAt = parsed.string("--cut-at") ?? new Date().toISOString()
  if (Number.isNaN(Date.parse(cutAt))) {
    throw inputError(`--cut-at ${JSON.stringify(cutAt)} is no instant this can read`)
  }

  const fingerprint: CutFingerprint = {
    buildNumber,
    mainSha: parsed.requireString("--main-sha"),
    shellSha: parsed.string("--shell-sha") ?? null,
    buildInputTreeHash: parsed.string("--build-input-tree-hash") ?? null,
    cutAt,
  }

  const { readLatestCutFingerprint, recordCutFingerprint } = await cutFingerprints()
  const last = await readLatestCutFingerprint(app.slug)
  if (last !== null && last.buildNumber === buildNumber) {
    process.stdout.write(
      `✓ ${app.slug} build ${buildNumber} already carries a fingerprint (cutAt ${last.cutAt}); nothing was written\n`
    )
    return
  }

  await recordCutFingerprint(app.slug, fingerprint)
  process.stdout.write(
    `✓ filed the cut fingerprint for ${app.slug} build ${buildNumber} (main ${fingerprint.mainSha.slice(
      0,
      12
    )}, cutAt ${cutAt})\n`
  )
}
