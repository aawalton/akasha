import { codeRoot } from "./code-root.ts"
import { operationalError } from "./exit.ts"
import {
  altool,
  apps,
  ascClient,
  buildInputs,
  buildSerialization,
  buildStamp,
  cutFingerprints,
  deployScript,
  foundation,
  gitTreeHash,
  host,
  ssh,
  testflightPoll,
  wwwBuild,
} from "./mobile-code.ts"
import type { MobileApp } from "@alanwalton/mobile-cli/lib/apps"
import type { CutFingerprint } from "@alanwalton/mobile-cli/lib/cut-fingerprint"

function elapsedSince(from: number): string {
  const seconds = Math.round((Date.now() - from) / 1000)
  if (seconds < 60) return `${seconds}s`
  return `${Math.floor(seconds / 60)}m${String(seconds % 60).padStart(2, "0")}s`
}

export async function runTestflightCut(opts: {
  readonly app: MobileApp
  readonly configuration: string
  readonly buildNumber: number | undefined
  readonly sync: boolean
  readonly wait: boolean
  readonly noUpload: boolean
  readonly password: string
  readonly ref: string
}): Promise<void> {
  const { app, configuration, buildNumber, sync, wait, noUpload, password, ref } = opts
  const startedAt = Date.now()

  const {
    fetchInternalBuildState,
    fetchLatestBuild,
    fetchMaxBuildVersion,
    mintAscJwt,
    resolveAppId,
  } = await ascClient()
  const { MACBOOK } = await host()
  const { rsyncToHost, runSshResult } = await ssh()
  const {
    readNativeShellApsEnv,
    readNativeShellHealthkitEnv,
    readNativeShellKokoroTtsEnv,
    readNativeShellRingCredentialEnv,
    readNativeShellWidgetEnv,
  } = await foundation()
  const { computeBuildInputTreeHash, fetchOrigin, resolveRef, resolveRepoRoot } =
    await gitTreeHash()
  const { buildInputSources } = await buildInputs()
  const { shellRepoRoot } = await apps()
  const { buildTestflightDeployScript } = await deployScript()
  const { buildWwwFromMainTip } = await wwwBuild()
  const { ALTOOL_MARKERS, testflightFailureError } = await altool()
  const { STAMP_GATE_OK } = await buildStamp()
  const { parseAssignedBuildNumber } = await buildSerialization()
  const { recordCutFingerprint } = await cutFingerprints()
  const {
    describeProcessingFailure,
    POLL_INTERVAL_MS,
    POLL_TIMEOUT_MS,
    pollBuildUntilTerminal,
    pollUntilTesterVisible,
    VISIBILITY_TIMEOUT_MS,
    visibilityFailureFor,
  } = await testflightPoll()

  let appId: string | undefined
  let ascFloor = 0
  try {
    const jwt = await mintAscJwt()
    appId = await resolveAppId(app.bundleId, jwt)
    ascFloor = await fetchMaxBuildVersion(appId, jwt)
  } catch (err) {
    if (wait) throw err
    process.stdout.write(
      `⚠ could not read the App Store Connect build floor (${
        err instanceof Error ? err.message : String(err)
      }); relying on the durable mac counter\n`
    )
  }

  process.stdout.write(
    `${noUpload ? "Dry-run archive+export of" : "Cutting"} ${app.slug} (${app.bundleId}) ${configuration} TestFlight build (${
      buildNumber === undefined ? "auto-claimed number" : `build ${buildNumber}`
    }, asc floor ${ascFloor}, sync=${sync}${
      noUpload ? ", no-upload" : ""
    }) via ${MACBOOK.user}@${MACBOOK.host}…\n`
  )

  let mainSha: string | undefined
  if (sync && app.wwwStageScript !== null) {
    const stagingRel = app.macWwwStagingRel
    if (stagingRel === null) {
      throw operationalError(
        `${app.slug} names a www stage script and no \`mac-www-staging-rel\`, so its page says nothing about where on the MacBook the build is staged`
      )
    }
    process.stdout.write("Building www on the workstation from the origin/main tip…\n")
    const wwwAt = Date.now()
    const built = await buildWwwFromMainTip({ app, ref })
    mainSha = built.mainSha
    process.stdout.write(
      `Staging www (main ${mainSha.slice(0, 12)}) → ${MACBOOK.user}@${MACBOOK.host}:~/${stagingRel}…\n`
    )
    await rsyncToHost(MACBOOK, built.wwwDir, stagingRel)
    process.stdout.write(`  www built and staged in ${elapsedSince(wwwAt)}\n`)
  }

  const codeRepoRoot = resolveRepoRoot(codeRoot())
  if (mainSha === undefined) {
    fetchOrigin(codeRepoRoot)
    mainSha = resolveRef(codeRepoRoot, ref)
  }

  const shellRoot = resolveRepoRoot(shellRepoRoot(app))
  fetchOrigin(shellRoot)
  const cutCommit = resolveRef(shellRoot, ref)
  process.stdout.write(
    `Cut ships the shell at ${cutCommit.slice(0, 12)} over ${ref} at ${mainSha.slice(0, 12)}; binaries must carry the shell commit.\n`
  )

  const script = buildTestflightDeployScript({
    app,
    configuration,
    sync,
    buildNumber,
    ascFloor,
    password,
    noUpload,
    nativeShellWidget: readNativeShellWidgetEnv(),
    nativeShellAps: readNativeShellApsEnv(),
    nativeShellHealthkit: readNativeShellHealthkitEnv(),
    nativeShellRingCredential: readNativeShellRingCredentialEnv(),
    nativeShellKokoroTts: readNativeShellKokoroTtsEnv(),
    cutCommit,
  })
  const macAt = Date.now()
  const { stdout: out, code } = await runSshResult(MACBOOK, script, { stream: true })
  const macTook = elapsedSince(macAt)

  const successMarker = noUpload ? "MOBILE_DEPLOY_TESTFLIGHT_DRYRUN_OK" : ALTOOL_MARKERS.uploadOk
  const required = noUpload
    ? [STAMP_GATE_OK, ALTOOL_MARKERS.validateOk, successMarker]
    : [STAMP_GATE_OK, successMarker]
  const ok =
    code === 0 &&
    out.includes("** ARCHIVE SUCCEEDED **") &&
    required.every((marker) => out.includes(marker))
  if (!ok) {
    throw testflightFailureError(out)
  }
  process.stdout.write(`\n  macbook checkout to exported .ipa took ${macTook}\n`)

  if (noUpload) {
    const dryRunNumber = parseAssignedBuildNumber(out)
    process.stdout.write(
      `\n✓ ${configuration} archive + export + APP STORE VALIDATION passed (build ${
        dryRunNumber ?? "?"
      }, signed .ipa validated by Apple) — upload SKIPPED (--no-upload). No upload slot consumed.\n`
    )
    process.stdout.write(`  whole run: ${elapsedSince(startedAt)}\n`)
    return
  }

  const assignedBuildNumber = parseAssignedBuildNumber(out)
  if (assignedBuildNumber === undefined) {
    throw operationalError(
      "TestFlight upload succeeded but the remote script emitted no MOBILE_DEPLOY_TESTFLIGHT_BUILD_NUMBER marker — cannot confirm the claimed build number"
    )
  }
  process.stdout.write(
    `\n✓ ${configuration} build ${assignedBuildNumber} uploaded to App Store Connect / TestFlight\n`
  )

  try {
    const fingerprint: CutFingerprint = {
      buildNumber: assignedBuildNumber,
      mainSha,
      shellSha: cutCommit,
      buildInputTreeHash: computeBuildInputTreeHash(
        buildInputSources(
          app,
          { root: codeRepoRoot, ref: mainSha },
          { root: shellRoot, ref: cutCommit }
        )
      ),
      cutAt: new Date().toISOString(),
    }
    await recordCutFingerprint(app.slug, fingerprint)
    process.stdout.write(
      `✓ recorded cut fingerprint (build ${assignedBuildNumber}, main ${cutCommit.slice(0, 12)})\n`
    )
  } catch (err) {
    process.stdout.write(
      `⚠ cut fingerprint NOT recorded (${
        err instanceof Error ? err.message : String(err)
      }); the upload still succeeded — \`ops mobile cut-status\` will read stale until re-recorded\n`
    )
  }

  if (wait) {
    if (appId === undefined) {
      throw operationalError(
        "internal: App Store Connect app id unresolved for the --wait poll"
      )
    }
    const resolvedAppId = appId
    const pollJwt = await mintAscJwt()
    const targetVersion = String(assignedBuildNumber)
    process.stdout.write("Polling App Store Connect for build processing…\n")
    const outcome = await pollBuildUntilTerminal({
      fetchLatest: () => fetchLatestBuild(resolvedAppId, pollJwt),
      isTarget: (build) => build.version === targetVersion,
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      now: () => Date.now(),
      intervalMs: POLL_INTERVAL_MS,
      timeoutMs: POLL_TIMEOUT_MS,
      onTick: (message) => process.stdout.write(`  ${message}\n`),
    })
    if (outcome.kind === "failed") {
      throw operationalError(describeProcessingFailure(outcome.failure))
    }
    if (outcome.kind === "timeout") {
      throw operationalError(
        `Build still processing after ${POLL_TIMEOUT_MS / 60_000} minutes (last state: ${
          outcome.lastState ?? "not yet visible"
        }). The upload succeeded — check App Store Connect → TestFlight, or re-run \`ops mobile testflight-status --wait\` to keep waiting.`
      )
    }
    process.stdout.write(`\n✓ build ${outcome.build.version} VALID — checking tester visibility…\n`)

    const validBuild = outcome.build
    const visibility = await pollUntilTesterVisible({
      fetchState: () => fetchInternalBuildState(validBuild.id, pollJwt),
      sleep: (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
      now: () => Date.now(),
      intervalMs: POLL_INTERVAL_MS,
      timeoutMs: VISIBILITY_TIMEOUT_MS,
      onTick: (message) => process.stdout.write(`  ${message}\n`),
    })
    if (visibility.kind !== "visible") {
      const lastState = visibility.kind === "blocked" ? visibility.state : visibility.lastState
      throw operationalError(
        describeProcessingFailure(visibilityFailureFor(validBuild, lastState))
      )
    }
    process.stdout.write(
      `\n✓ build ${validBuild.version} VALID and tester-visible (${visibility.state}), ready to install\n`
    )
  }
  process.stdout.write(`  whole run: ${elapsedSince(startedAt)}\n`)
}
