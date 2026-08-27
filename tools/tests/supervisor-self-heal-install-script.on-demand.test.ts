
import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { hold } from "../lib/digest-harness.ts"
import { SINGLE_FLIGHT_INSTALL_SCRIPT } from "../lib/supervisor-self-heal-install.ts"

const STUB_BUN = `#!/usr/bin/env bash
ctrl="$CTRL"
if [ "$1" = "install" ]; then
  c=$(cat "$ctrl/install-count" 2>/dev/null || echo 0)
  echo $((c+1)) > "$ctrl/install-count"
  exit 0
fi
c=$(cat "$ctrl/verify-count" 2>/dev/null || echo 0)
c=$((c+1))
echo "$c" > "$ctrl/verify-count"
plan=$(cat "$ctrl/verify-plan" 2>/dev/null || echo 0)
code=$(echo "$plan" | awk -v n="$c" '{print $n}')
[ -z "$code" ] && code=0
exit "$code"
`

type RunResult = {
  exitCode: number
  sentinelWritten: boolean
  installCount: number
  verifyCount: number
}

let dir: string

beforeEach(() => {
  dir = mkdtempSync("/var/tmp/supervisor-self-heal-install-script-")
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

function countFile(name: string): number {
  const path = join(dir, name)
  return existsSync(path) ? Number(readFileSync(path, "utf-8").trim()) : 0
}

async function runScript(opts: {
  verifyPlan: string
  preexistingSentinel: boolean
}): Promise<RunResult> {
  const binDir = join(dir, "bin")
  mkdirSync(binDir, { recursive: true })
  const stub = join(binDir, "bun")
  writeFileSync(stub, STUB_BUN)
  chmodSync(stub, 0o755)
  writeFileSync(join(dir, "verify-plan"), opts.verifyPlan)
  const sentinel = join(dir, "v.done")
  if (opts.preexistingSentinel) writeFileSync(sentinel, "")
  const proc = Bun.spawn({
    cmd: ["bash", "-c", SINGLE_FLIGHT_INSTALL_SCRIPT, "bash", sentinel],
    cwd: dir,
    env: { PATH: `${binDir}:/usr/bin:/bin`, CTRL: dir },
    stdout: "pipe",
    stderr: "pipe",
  })
  const exitCode = await proc.exited
  return {
    exitCode,
    sentinelWritten: existsSync(sentinel),
    installCount: countFile("install-count"),
    verifyCount: countFile("verify-count"),
  }
}

describe("SINGLE_FLIGHT_INSTALL_SCRIPT", () => {
  it("writes the sentinel when install + first verify both succeed", async () => {
    const r = await runScript({ verifyPlan: "0", preexistingSentinel: false })
    expect(r.exitCode).toBe(0)
    expect(r.sentinelWritten).toBe(true)
    expect(r.installCount).toBe(1)
    expect(r.verifyCount).toBe(1)
  })

  it("repairs with a second install when the first verify fails, then writes the sentinel", async () => {
    const r = await runScript({ verifyPlan: "1 0", preexistingSentinel: false })
    expect(r.exitCode).toBe(0)
    expect(r.sentinelWritten).toBe(true)
    expect(r.installCount).toBe(2)
    expect(r.verifyCount).toBe(2)
  })

  it("does NOT write the sentinel when the install stays incomplete after repair", async () => {
    const r = await runScript({ verifyPlan: "1 1", preexistingSentinel: false })
    expect(r.exitCode).not.toBe(0)
    expect(r.sentinelWritten).toBe(false)
    expect(r.installCount).toBe(2)
    expect(r.verifyCount).toBe(2)
  })

  it("skips install entirely when the sentinel already exists", async () => {
    const r = await runScript({ verifyPlan: "0", preexistingSentinel: true })
    expect(r.exitCode).toBe(0)
    expect(r.sentinelWritten).toBe(true)
    expect(r.installCount).toBe(0)
    expect(r.verifyCount).toBe(0)
  })
})

interface Vector {
  readonly label: string
  readonly standing: Record<string, unknown>
  readonly observe: () => Promise<Record<string, unknown>>
}

const VECTORS: readonly Vector[] = [
  {
    label: "writes the sentinel when install and first verify both succeed",
    standing: { exitCode: 0, sentinelWritten: true, installCount: 1, verifyCount: 1 },
    observe: async () => ({ ...(await runScript({ verifyPlan: "0", preexistingSentinel: false })) }),
  },
  {
    label: "repairs with a second install when the first verify fails",
    standing: { exitCode: 0, sentinelWritten: true, installCount: 2, verifyCount: 2 },
    observe: async () => ({
      ...(await runScript({ verifyPlan: "1 0", preexistingSentinel: false })),
    }),
  },
  {
    label: "withholds the sentinel when the install stays incomplete after repair",
    standing: { exitedNonZero: true, sentinelWritten: false, installCount: 2, verifyCount: 2 },
    observe: async () => {
      const r = await runScript({ verifyPlan: "1 1", preexistingSentinel: false })
      return { ...r, exitedNonZero: r.exitCode !== 0 }
    },
  },
  {
    label: "skips the install entirely when the sentinel already exists",
    standing: { exitCode: 0, sentinelWritten: true, installCount: 0, verifyCount: 0 },
    observe: async () => ({ ...(await runScript({ verifyPlan: "0", preexistingSentinel: true })) }),
  },
]

function project(
  observed: Record<string, unknown>,
  standing: Record<string, unknown>
): Record<string, unknown> {
  const kept: Record<string, unknown> = {}
  for (const key of Object.keys(standing)) {
    if (!(key in observed)) {
      throw new Error(`the ported arm answered nothing for \`${key}\`, so there is nothing to hold`)
    }
    kept[key] = observed[key]
  }
  return kept
}

describe("held against the code repository by digest", () => {
  for (const vector of VECTORS) {
    it(
      vector.label,
      async () => {
        const ported = project(await vector.observe(), vector.standing)
        const verdict = hold(vector.label, vector.standing, ported)
        expect(verdict.ported).toBe(verdict.standing)
        expect(verdict.matches).toBe(true)
      },
      30000
    )
  }
})
