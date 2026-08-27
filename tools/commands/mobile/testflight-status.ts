
export const summary = "Report the latest TestFlight build's processing state via the ASC API (no ssh, no rebuild); --wait blocks until terminal"

import type { CommandHelp } from "../../ops/surface.ts"
import { APP_FLAG } from "../../lib/mobile-vocabulary.ts"
import { operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { apps, ascClient, testflightPoll } from "../../lib/mobile-code.ts"

export const help: CommandHelp = {
  flags: [
    APP_FLAG,
    {
      name: "--wait",
      description:
        "Block, polling every 30s (up to 30 minutes), until the latest build reaches a terminal state (VALID | FAILED | INVALID). Default: one-shot report.",
    },
  ],
  exits: [
    {
      code: 0,
      meaning:
        "VALID (ready to install); or, one-shot only, PROCESSING (still processing — reported, not an error)",
    },
    {
      code: 3,
      meaning:
        'operational: build FAILED/INVALID (emits a final stderr line of JSON {"marker":"deploy-testflight-processing-failure",…}); or ASC unreachable; or --wait hit the timeout with no terminal state',
    },
  ],
  examples: ["ops mobile testflight-status", "ops mobile testflight-status --wait"],
}

export default async function mobileTestflightStatus(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const { resolveApp } = await apps()
  const app = resolveApp(parsed.requireString("--app"))
  const wait = parsed.boolean("--wait")

  const { fetchLatestBuild, mintAscJwt, resolveAppId } = await ascClient()
  const {
    classifyProcessingState,
    describeProcessingFailure,
    POLL_INTERVAL_MS,
    POLL_TIMEOUT_MS,
    pollBuildUntilTerminal,
    processingFailureFor,
  } = await testflightPoll()

  const jwt = await mintAscJwt()
  const appId = await resolveAppId(app.bundleId, jwt)

  if (wait) {
    process.stdout.write(`Polling App Store Connect for the latest ${app.bundleId} build…\n`)
    const outcome = await pollBuildUntilTerminal({
      fetchLatest: () => fetchLatestBuild(appId, jwt),
      isTarget: () => true,
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      now: () => Date.now(),
      intervalMs: POLL_INTERVAL_MS,
      timeoutMs: POLL_TIMEOUT_MS,
      onTick: (message) => process.stdout.write(`  ${message}\n`),
    })
    if (outcome.kind === "valid") {
      process.stdout.write(`\n✓ build ${outcome.build.version} VALID, ready to install\n`)
      return
    }
    if (outcome.kind === "failed") {
      throw operationalError(describeProcessingFailure(outcome.failure))
    }
    throw operationalError(
      `No terminal build state after ${POLL_TIMEOUT_MS / 60_000} minutes (last state: ${
        outcome.lastState ?? "no build visible"
      }). The build is still processing — re-run \`ops mobile testflight-status --wait\` to keep waiting, or check App Store Connect → TestFlight.`
    )
  }

  const build = await fetchLatestBuild(appId, jwt)
  if (build === null) {
    process.stdout.write(`No ${app.bundleId} builds have been uploaded to App Store Connect yet.\n`)
    return
  }
  const classification = classifyProcessingState(build.processingState)
  if (classification === "failed") {
    throw operationalError(describeProcessingFailure(processingFailureFor(build)))
  }
  if (classification === "valid") {
    process.stdout.write(`✓ build ${build.version} VALID, ready to install\n`)
    return
  }
  process.stdout.write(
    `build ${build.version} is ${build.processingState} (still processing) — re-run with --wait to block until terminal.\n`
  )
}
