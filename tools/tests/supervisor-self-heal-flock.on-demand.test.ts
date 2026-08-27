
import { beforeEach, afterEach, describe, expect, it } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { hold } from "../lib/digest-harness.ts"
import { SINGLE_FLIGHT_FLOCK_SH } from "../lib/supervisor-self-heal-install.ts"

let dir: string

beforeEach(() => {
  dir = mkdtempSync("/var/tmp/supervisor-self-heal-flock-")
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

function runWrapper(lock: string, ceiling: string, child: readonly string[]) {
  return Bun.spawn({
    cmd: ["sh", "-c", SINGLE_FLIGHT_FLOCK_SH, "supervisor-self-heal-flock", lock, ceiling, ...child],
    stdout: "pipe",
    stderr: "pipe",
  })
}

async function until(predicate: () => boolean, whatFor: string): Promise<void> {
  for (let i = 0; i < 300; i++) {
    if (predicate()) return
    await new Promise((r) => setTimeout(r, 50))
  }
  throw new Error(`waited 15s for ${whatFor} and it never happened`)
}

function flockOptionSets(program: string): string[][] {
  const asked: string[][] = []
  for (const line of program.split("\n")) {
    const invocation = line.trim()
    if (!invocation.startsWith("flock") && !invocation.startsWith("until flock")) continue
    asked.push(invocation.split(" ").filter((word) => word.startsWith("-")))
  }
  return asked
}

const holdUntilReleased = (held: string, release: string) =>
  `echo held > ${held}; while [ ! -e ${release} ]; do sleep 0.1; done`

const writeAround = (tag: string, log: string) =>
  `echo ${tag}-start >> ${log}; sleep 1; echo ${tag}-end >> ${log}`

describe("SINGLE_FLIGHT_FLOCK_SH", () => {
  it("asks flock for no option BusyBox lacks — `-x -n`, never `-w`", () => {
    expect(SINGLE_FLIGHT_FLOCK_SH).toContain("flock -x -n 9")
    for (const asked of flockOptionSets(SINGLE_FLIGHT_FLOCK_SH)) {
      expect(asked).toEqual(["-x", "-n"])
    }
  })

  it("takes the free lock, execs the install, and hands back its exit code", async () => {
    const proc = runWrapper(join(dir, "l.lock"), "600", ["sh", "-c", "echo ran; exit 7"])
    const [stdout, code] = await Promise.all([new Response(proc.stdout).text(), proc.exited])
    expect(stdout.trim()).toBe("ran")
    expect(code).toBe(7)
  }, 30000)

  it("is single-flight — a second supervisor waits rather than installing beside the first", async () => {
    const lock = join(dir, "l.lock")
    const log = join(dir, "order.txt")

    const first = runWrapper(lock, "600", ["sh", "-c", writeAround("A", log)])
    await until(
      () => existsSync(log) && readFileSync(log, "utf8").includes("A-start"),
      "the first supervisor to take the lock"
    )
    const second = runWrapper(lock, "600", ["sh", "-c", writeAround("B", log)])
    expect(await Promise.all([first.exited, second.exited])).toEqual([0, 0])

    expect(readFileSync(log, "utf8").trim().split("\n")).toEqual([
      "A-start",
      "A-end",
      "B-start",
      "B-end",
    ])
  }, 60000)

  it("gives up at its ceiling without installing, so the caller reports a failure", async () => {
    const lock = join(dir, "l.lock")
    const held = join(dir, "held.txt")
    const release = join(dir, "release.txt")
    const ranAnyway = join(dir, "should-not-exist.txt")

    const holder = runWrapper(lock, "600", ["sh", "-c", holdUntilReleased(held, release)])
    await until(() => existsSync(held), "the holder to take the lock")

    const waited = runWrapper(lock, "1", ["sh", "-c", `touch ${ranAnyway}`])
    const [stderr, code] = await Promise.all([new Response(waited.stderr).text(), waited.exited])

    expect(code).toBe(1)
    expect(stderr).toContain(lock)
    expect(stderr).toContain("was not run")
    expect(existsSync(ranAnyway)).toBe(false)

    writeFileSync(release, "")
    expect(await holder.exited).toBe(0)
  }, 60000)
})

interface Vector {
  readonly label: string
  readonly standing: Record<string, unknown>
  readonly observe: () => Promise<Record<string, unknown>>
  readonly timeout: number
}

const VECTORS: readonly Vector[] = [
  {
    label: "asks flock for `-x -n` and nothing BusyBox lacks",
    standing: { containsFlockXN9: true, optionSets: [["-x", "-n"]] },
    observe: async () => ({
      containsFlockXN9: SINGLE_FLIGHT_FLOCK_SH.includes("flock -x -n 9"),
      optionSets: flockOptionSets(SINGLE_FLIGHT_FLOCK_SH),
    }),
    timeout: 5000,
  },
  {
    label: "takes the free lock, execs, and hands back the child's exit code",
    standing: { stdout: "ran", code: 7 },
    observe: async () => {
      const proc = runWrapper(join(dir, "d.lock"), "600", ["sh", "-c", "echo ran; exit 7"])
      const [stdout, code] = await Promise.all([new Response(proc.stdout).text(), proc.exited])
      return { stdout: stdout.trim(), code }
    },
    timeout: 30000,
  },
  {
    label: "is single-flight — the second run waits rather than running beside the first",
    standing: { exits: [0, 0], order: ["A-start", "A-end", "B-start", "B-end"] },
    observe: async () => {
      const lock = join(dir, "d.lock")
      const log = join(dir, "d-order.txt")
      const first = runWrapper(lock, "600", ["sh", "-c", writeAround("A", log)])
      await until(
        () => existsSync(log) && readFileSync(log, "utf8").includes("A-start"),
        "the first supervisor to take the lock"
      )
      const second = runWrapper(lock, "600", ["sh", "-c", writeAround("B", log)])
      const exits = await Promise.all([first.exited, second.exited])
      return { exits, order: readFileSync(log, "utf8").trim().split("\n") }
    },
    timeout: 60000,
  },
  {
    label: "gives up at its ceiling without running the install",
    standing: { code: 1, namesLock: true, saysNotRun: true, ranAnyway: false },
    observe: async () => {
      const lock = join(dir, "d.lock")
      const held = join(dir, "d-held.txt")
      const release = join(dir, "d-release.txt")
      const ranAnyway = join(dir, "d-should-not-exist.txt")
      const holder = runWrapper(lock, "600", ["sh", "-c", holdUntilReleased(held, release)])
      await until(() => existsSync(held), "the holder to take the lock")
      const waited = runWrapper(lock, "1", ["sh", "-c", `touch ${ranAnyway}`])
      const [stderr, code] = await Promise.all([new Response(waited.stderr).text(), waited.exited])
      writeFileSync(release, "")
      await holder.exited
      return {
        code,
        namesLock: stderr.includes(lock),
        saysNotRun: stderr.includes("was not run"),
        ranAnyway: existsSync(ranAnyway),
      }
    },
    timeout: 60000,
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
      vector.timeout
    )
  }
})
