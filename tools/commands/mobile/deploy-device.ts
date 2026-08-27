
export const summary = "Build a Debug dev build on the macbook and install it to the connected iPhone over ssh (Path A, proven)"

import type { CommandHelp } from "../../ops/surface.ts"
import { APP_FLAG, KEYCHAIN_PASSWORD_ENV } from "../../lib/mobile-vocabulary.ts"
import { inputError, operationalError } from "../../lib/exit.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { apps, foundation, host, ssh } from "../../lib/mobile-code.ts"
import type { Apps, Foundation } from "../../lib/mobile-code.ts"
import type { MobileApp } from "@alanwalton/mobile-cli/lib/apps"

export const help: CommandHelp = {
  flags: [
    APP_FLAG,
    {
      name: "--configuration",
      argLabel: "<name>",
      valueShape: "token",
      default: "Debug",
      choices: ["Debug", "Release"],
      description: "Xcode build configuration (default: Debug — the proven dev-install path)",
    },
    {
      name: "--device",
      argLabel: "<udid>",
      valueShape: "token",
      description:
        "Target device hardware UDID. Defaults to the UDID registered for the resolved --app, and is REQUIRED for an app that has none — a build cannot be installed to a device nobody named.",
    },
    {
      name: "--no-sync",
      description:
        "Skip `npm run ios:sync` (cap sync + native seam) before building — fast incremental rebuild. Sync runs by default so the build reflects current www/config.",
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
    { code: 1, meaning: "input error: bad --device, or keychain password env not set" },
    { code: 3, meaning: "operational error: ssh/build/install against the macbook failed" },
  ],
  examples: [
    "ops mobile deploy-device",
    "ops mobile deploy-device --no-sync",
    "ops mobile deploy-device --configuration Release --device 00008130-000434AA22FA001C",
  ],
}

async function validateDevice(device: string): Promise<string> {
  if (!/^[0-9A-Za-z-]{8,}$/.test(device)) {
    throw inputError(
      `--device must be a device UDID (hex/uuid form); got ${JSON.stringify(device)}`
    )
  }
  return device
}

export function buildDeviceDeployScript(opts: {
  readonly app: MobileApp
  readonly configuration: string
  readonly device: string
  readonly sync: boolean
  readonly password: string
  readonly appsModule: Apps
  readonly foundationModule: Foundation
}): string {
  const { iosAppDir, nativeShellDir } = opts.appsModule
  const {
    CHECKOUT_ROOT,
    SCRIPT_HEADER,
    ascAuthArgs,
    buildKeychainUnlock,
    buildNativeSync,
    buildRunCheckout,
    readNativeShellApsEnv,
    readNativeShellHealthkitEnv,
  } = opts.foundationModule

  const appPath = `${iosAppDir(opts.app, CHECKOUT_ROOT)}/build/Build/Products/${opts.configuration}-iphoneos/App.app`
  const xcodebuild = [
    "xcodebuild",
    "-project App.xcodeproj",
    "-scheme App",
    `-configuration ${opts.configuration}`,
    `-destination "platform=iOS,id=${opts.device}"`,
    "-derivedDataPath build",
    ...ascAuthArgs(),
    `DEVELOPMENT_TEAM=${opts.app.developmentTeam}`,
    "CODE_SIGN_STYLE=Automatic",
    "build",
  ].join(" ")

  const sections: string[] = [
    SCRIPT_HEADER,
    buildKeychainUnlock(opts.password),
    buildRunCheckout("origin/main"),
  ]
  if (opts.sync) {
    sections.push(
      buildNativeSync({
        app: opts.app,
        nativeShellDir: nativeShellDir(opts.app, CHECKOUT_ROOT),
        nativeShellAps: readNativeShellApsEnv() ?? "0",
        nativeShellHealthkit: readNativeShellHealthkitEnv() ?? "0",
      })
    )
  }
  sections.push(
    `cd ${iosAppDir(opts.app, CHECKOUT_ROOT)}`,
    xcodebuild,
    `APP=${appPath}`,
    'CODESIGN_OUT=$(codesign -dv "$APP" 2>&1)',
    'echo "$CODESIGN_OUT"',
    `echo "$CODESIGN_OUT" | grep -q "Identifier=${opts.app.bundleId}"`,
    `echo "$CODESIGN_OUT" | grep -q "TeamIdentifier=${opts.app.developmentTeam}"`,
    `xcrun devicectl device install app --device ${opts.device} "$APP"`,
    'echo "MOBILE_DEPLOY_DEVICE_OK"'
  )
  return sections.join("\n")
}

export default async function mobileDeployDevice(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const appsModule = await apps()
  const app = appsModule.resolveApp(parsed.requireString("--app"))
  const configuration = parsed.requireString("--configuration")
  const requestedDevice = parsed.string("--device") ?? app.defaultDeviceUdid
  if (requestedDevice === null || requestedDevice === undefined) {
    throw inputError(
      `${app.slug} has no registered device UDID — pass --device <udid> to say which iPhone to install to`
    )
  }
  const device = await validateDevice(requestedDevice)
  const sync = !parsed.boolean("--no-sync")

  const foundationModule = await foundation()
  const password = foundationModule.readKeychainPassword()
  const { MACBOOK } = await host()
  const { runSshCapture } = await ssh()

  process.stdout.write(
    `Deploying ${configuration} build to device ${device} (sync=${sync}) via ${MACBOOK.user}@${MACBOOK.host}…\n`
  )

  const script = buildDeviceDeployScript({
    app,
    configuration,
    device,
    sync,
    password,
    appsModule,
    foundationModule,
  })
  const out = await runSshCapture(MACBOOK, script, { stream: true })

  if (!out.includes("** BUILD SUCCEEDED **")) {
    throw operationalError("xcodebuild did not report '** BUILD SUCCEEDED **'")
  }
  if (!out.includes("MOBILE_DEPLOY_DEVICE_OK")) {
    throw operationalError("device install did not complete (missing completion sentinel)")
  }
  process.stdout.write(`\n✓ ${configuration} build installed to device ${device}\n`)
}
