import { beforeAll, describe, expect, it } from "bun:test"
import { buildDeviceDeployScript, help } from "../commands/mobile/deploy-device.ts"
import { apps, foundation } from "../lib/mobile-code.ts"
import type { Apps, Foundation } from "../lib/mobile-code.ts"
import type { MobileApp } from "@alanwalton/mobile-cli/lib/apps"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`
const SECRET = "p@ss'w\"ord with spaces"

let appsModule: Apps
let foundationModule: Foundation
let app: MobileApp

beforeAll(async () => {
  appsModule = await apps()
  foundationModule = await foundation()
  app = appsModule.resolveApp()
})

function script(over: { readonly configuration?: string; readonly sync?: boolean } = {}): string {
  return buildDeviceDeployScript({
    app,
    configuration: over.configuration ?? "Debug",
    device: app.defaultDeviceUdid ?? "00000000-000000000000000A",
    sync: over.sync ?? true,
    password: SECRET,
    appsModule,
    foundationModule,
  })
}

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "mobile", "deploy-device", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("buildDeviceDeployScript — the runbook the help describes, in order", () => {
  it("unlocks, regenerates, builds, verifies the signature, then installs", () => {
    const s = script()
    const stages = [
      foundationModule.buildKeychainUnlock(SECRET),
      "npm run ios:sync",
      "xcodebuild",
      "codesign -dv",
      "xcrun devicectl device install app",
      "MOBILE_DEPLOY_DEVICE_OK",
    ]
    let cursor = -1
    for (const stage of stages) {
      const at = s.indexOf(stage)
      expect(at).toBeGreaterThan(cursor)
      cursor = at
    }
  })

  it("builds against the resolved app's own team, bundle id and device", () => {
    const s = script()
    expect(s).toContain(`-destination "platform=iOS,id=${app.defaultDeviceUdid ?? ""}"`)
    expect(s).toContain(`DEVELOPMENT_TEAM=${app.developmentTeam}`)
    expect(s).toContain("CODE_SIGN_STYLE=Automatic")
    expect(s).toContain(`Identifier=${app.bundleId}`)
    expect(s).toContain(`TeamIdentifier=${app.developmentTeam}`)
  })

  it("--no-sync omits the native regen and still builds", () => {
    const s = script({ sync: false })
    expect(s).not.toContain("npm run ios:sync")
    expect(s).toContain("xcodebuild")
  })

  it.each([["Debug"], ["Release"]])(
    "%s threads into both the build args and the product path",
    (configuration) => {
      const s = script({ configuration })
      expect(s).toContain(`-configuration ${configuration}`)
      expect(s).toContain(`${configuration}-iphoneos/App.app`)
    }
  )
})

describe("buildDeviceDeployScript — the embedded keychain secret", () => {
  it("is embedded only as the shared unlock builder writes it, and is never echoed", () => {
    const s = script()
    expect(s).toContain(foundationModule.buildKeychainUnlock(SECRET))
    expect(s).toContain("unset KEYCHAIN_PW")
    expect(s).not.toContain('echo "$KEYCHAIN_PW"')
    expect(s).not.toContain("echo $KEYCHAIN_PW")
  })

  it("never enables `set -x`, which would print every expansion of it", () => {
    expect(script()).not.toContain("set -x")
  })
})

describe("buildDeviceDeployScript — the native regen it seeds", () => {
  it("opts the HealthKit seam out by default, before the sync that reads it", () => {
    const held = process.env.NATIVE_SHELL_HEALTHKIT
    delete process.env.NATIVE_SHELL_HEALTHKIT
    try {
      const s = script()
      expect(s).toContain("export NATIVE_SHELL_HEALTHKIT='0'")
      expect(s.indexOf("export NATIVE_SHELL_HEALTHKIT=")).toBeLessThan(s.indexOf("npm run ios:sync"))
    } finally {
      if (held !== undefined) process.env.NATIVE_SHELL_HEALTHKIT = held
    }
  })
})

describe("ops mobile deploy-device — help surface", () => {
  it("declares the required keychain env var and the four flags", () => {
    expect(
      help.envVars?.some((e) => e.name === "MACBOOK_KEYCHAIN_PASSWORD" && e.required === true)
    ).toBe(true)
    expect((help.flags ?? []).map((f) => f.name)).toEqual([
      "--app",
      "--configuration",
      "--device",
      "--no-sync",
    ])
  })
})

describe("ops mobile deploy-device — the device a build may be installed to", () => {
  it.each([
    ["a shell-injection string", '0; rm -rf /"'],
    ["a value below the UDID length", "abc"],
    ["a value carrying a path separator", "0000813/000434AA22FA001C"],
  ])("%s is refused before anything is built, exit 1", async (_case, device) => {
    const result = await runCli(["--device", device])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--device")
    expect(result.stdout).toBe("")
  })
})
