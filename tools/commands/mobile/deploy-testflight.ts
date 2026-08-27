
export const summary = "Cut a signed distribution build on the macbook and ship it to TestFlight via ASC over ssh (Path B). --wait blocks until the build finishes processing"

import type { CommandHelp } from "../../ops/surface.ts"
import { APP_FLAG, KEYCHAIN_PASSWORD_ENV } from "../../lib/mobile-vocabulary.ts"
import { inputError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { apps, foundation, localCutLock } from "../../lib/mobile-code.ts"
import { runTestflightCut } from "../../lib/mobile-testflight-cut.ts"

export const help: CommandHelp = {
  flags: [
    APP_FLAG,
    {
      name: "--configuration",
      argLabel: "<name>",
      valueShape: "token",
      default: "Release",
      choices: ["Debug", "Release"],
      description: "Xcode build configuration (default: Release — TestFlight ships Release)",
    },
    {
      name: "--build-number",
      argLabel: "<n>",
      valueShape: "token",
      description:
        "Override the auto-increment: pin CFBundleVersion via CURRENT_PROJECT_VERSION and advance the durable mac counter to at least n. Omit to auto-claim the next number under the build mutex (max(durable counter, App Store Connect floor) + 1). TestFlight requires a unique build number per upload.",
    },
    {
      name: "--ref",
      argLabel: "<rev>",
      valueShape: "token",
      default: "origin/main",
      description:
        "Which revision to compile. The build makes its own checkout at this revision on the macbook, so any revision that repo can resolve is buildable. REFUSED unless --no-upload for anything but origin/main: TestFlight is what reaches a phone, and only what has landed may reach one.",
    },
    {
      name: "--no-sync",
      description:
        "Skip `npm run ios:sync` (cap sync + native seam) before archiving — fast incremental rebuild. Sync runs by default so the build reflects current www/config.",
    },
    {
      name: "--no-upload",
      description:
        "Dry run — archive + export the signed .ipa on the mac (proving the full signing path), then run `xcrun altool --validate-app` to VALIDATE it against App Store Connect, but SKIP the upload, so it consumes no App Store Connect daily upload slot. Validation is the point: it reaches Apple's validator — the only authority on Info.plist/entitlement rules, which keys on the ENTITLEMENTS a build carries, not on which APIs its code calls — so a dry run now shows the App Store rejections it exists to prevent (e.g. a missing purpose string) rather than being blind to them. ACCEPTED COST: this makes --no-upload require network + working ASC credentials, where it was previously offline-capable. An unreachable validation is reported INCOMPLETE (exit 4), NEVER as a pass. Emits MOBILE_DEPLOY_TESTFLIGHT_DRYRUN_OK on success; incompatible with --wait (nothing is uploaded to poll).",
    },
    {
      name: "--wait",
      description:
        "After UPLOAD SUCCEEDED, poll the App Store Connect API (every 30s, up to 30 minutes) until the uploaded build finishes processing, THEN until it is tester-visible (buildBetaDetail internalBuildState READY_FOR_BETA_TESTING/IN_BETA_TESTING, up to 10 more minutes). Identifies the build by the auto-claimed (or `--build-number`-pinned) number the remote script emits. Exits 0 only on VALID + tester-visible; fails loud with a typed final-line JSON marker on FAILED/INVALID or a processed-but-undistributed build (e.g. Missing Compliance) — VALID alone never reads as ready-to-install. Without --wait the command returns as soon as the upload is accepted (processing still pending).",
    },
  ],
  envVars: [
    {
      name: KEYCHAIN_PASSWORD_ENV,
      required: true,
      description:
        "macbook login-keychain password (unlocks the keychain for headless codesigning)",
    },
  ],
  exits: [
    { code: 1, meaning: "input error: bad --build-number, or keychain password env not set" },
    {
      code: 3,
      meaning:
        "operational error: workstation www build / rsync, or ssh/archive/export/validate/upload against the macbook, failed. A classified signing failure (ASC_PERMISSION_DENIED | CONCURRENT_BUILD_MUTATION | SIGNING_KEYCHAIN_ERROR) or a classified App Store rejection (MISSING_PURPOSE_STRING | APP_STORE_VALIDATION_REJECTED, the latter carrying Apple's own error code and description) prints a typed, human-readable remediation naming the exact fix.",
    },
    {
      code: 4,
      meaning:
        "VALIDATION_UNREACHABLE — altool exited without a verdict from Apple (no error code, no VERIFY FAILED banner): network failure, bad/expired ASC key, or an ASC outage. The build is UNVALIDATED, which is NOT the same as valid. Distinct from 3 so 'could not check' can never be read as 'checked and fine'.",
    },
  ],
  examples: [
    "ops mobile deploy-testflight",
    "ops mobile deploy-testflight --wait",
    "ops mobile deploy-testflight --build-number 42",
    "ops mobile deploy-testflight --no-sync --configuration Release",
    "ops mobile deploy-testflight --app atlas --no-upload",
    "ops mobile deploy-testflight --ref origin/change-19458 --no-upload",
  ],
}

export default async function mobileDeployTestflight(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const { resolveApp } = await apps()
  const app = resolveApp(parsed.requireString("--app"))
  const configuration = parsed.requireString("--configuration")
  const buildNumber = parsed.nonNegativeInt("--build-number")
  if (buildNumber !== undefined && buildNumber < 1) {
    throw inputError("--build-number must be a positive integer")
  }
  const sync = !parsed.boolean("--no-sync")
  const wait = parsed.boolean("--wait")
  const noUpload = parsed.boolean("--no-upload")
  if (noUpload && wait) {
    throw inputError("--no-upload skips the upload, so there is nothing to --wait on")
  }
  const ref = parsed.requireString("--ref")
  if (ref !== "origin/main" && !noUpload) {
    throw inputError(
      `--ref ${ref} builds something other than origin/main, so it may not upload — add --no-upload, or land it first`
    )
  }

  const { readKeychainPassword } = await foundation()
  const { acquireLocalCutLock, releaseLocalCutLock } = await localCutLock()

  const password = readKeychainPassword()
  const selfPid = process.pid
  acquireLocalCutLock(Date.now(), selfPid)
  try {
    await runTestflightCut({ app, configuration, buildNumber, sync, wait, noUpload, password, ref })
  } finally {
    releaseLocalCutLock(selfPid)
  }
}
