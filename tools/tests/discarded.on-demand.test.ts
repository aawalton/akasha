
import { describe, expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolveRoots } from "../../repo/roots/roots"

function through(redirect: (out: string) => string): string {
  const dir = mkdtempSync(`${tmpdir()}/discarded-`)
  try {
    const probe = `${dir}/probe.ts`
    const out = `${dir}/out.txt`
    writeFileSync(
      probe,
      `import { discarded } from ${JSON.stringify(`${resolveRoots().akasha}/agent/discarded.ts`)}\n` +
        `process.stderr.write(String(discarded()))\n`
    )
    const ran = Bun.spawnSync(["bash", "-c", `bun ${probe} ${redirect(out)}`], {
      stdout: "pipe",
      stderr: "pipe",
    })
    const said = ran.stderr.toString().trim()
    if (said !== "") return said
    return existsSync(out) ? readFileSync(out, "utf8").trim() : ""
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe("what counts as an output that never reached its reader", () => {
  test("a pipe is a discard — the idiom that recorded whole files nobody received", () => {
    expect(through(() => "| cat")).toBe("a pipe")
  })

  test("/dev/null is a discard, as it already was", () => {
    expect(through(() => "> /dev/null")).toBe("/dev/null")
  })

  test("a file only the printing went to is a discard, the same run's errors going elsewhere", () => {
    expect(through((out) => `> ${out}`)).toBe("a file only this redirect opened")
  })

  test("the file a whole run goes to is not, that being what this harness hands each command it runs", () => {
    expect(through((out) => `> ${out} 2>&1`)).toBe("null")
  })
})

function shaped(pipeline: (probe: string, out: string) => string): string {
  const dir = mkdtempSync(`${tmpdir()}/discarded-shape-`)
  try {
    const probe = `${dir}/probe.ts`
    const verdict = `${dir}/verdict.txt`
    writeFileSync(
      probe,
      `import { writeFileSync } from "node:fs"\n` +
        `import { discarded } from ${JSON.stringify(`${resolveRoots().akasha}/agent/discarded.ts`)}\n` +
        `writeFileSync(${JSON.stringify(verdict)}, String(discarded()))\n`
    )
    Bun.spawnSync(["bash", "-c", pipeline(`bun ${probe}`, `${dir}/out.txt`)], { stdout: "pipe", stderr: "pipe" })
    return existsSync(verdict) ? readFileSync(verdict, "utf8").trim() : ""
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe("a redirect is one whatever channel the run's own errors ride on", () => {
  test("errors down a pipe: the body still lands where the reader is not", () => {
    expect(shaped((probe, out) => `{ ${probe} > ${out} ; } 2>&1 | cat`)).toBe("a file only this redirect opened")
  })

  test("errors thrown away: the body still lands where the reader is not", () => {
    expect(shaped((probe, out) => `${probe} > ${out} 2> /dev/null`)).toBe("a file only this redirect opened")
  })
})

const READER = "discarded-command-test"

const SUBJECT = `${resolveRoots().akasha}/agent/discarded.ts`

const OF_THE_BODY = "export function discarded()"

interface Ran {
  readonly err: string
  readonly code: number
  readonly file: string | null
  readonly recorded: boolean
}

const SEAT_PAGE = `${resolveRoots().akasha}/agent/seat/${READER}.seat.md`

const SEAT_RECORD = `${resolveRoots().akasha}/agent/seat/${READER}.seat.readings.uncommitted.attachment.json`

function seatStanding(): void {
  writeFileSync(SEAT_PAGE, `---\npage-type-slug: seat\nid: ${READER}\ntitle: "${READER}"\n---\n`, "utf8")
  rmSync(SEAT_RECORD, { force: true })
}

function readThrough(pipeline: (command: string, out: string) => string): Ran {
  const dir = mkdtempSync(`${tmpdir()}/discarded-command-`)
  seatStanding()
  try {
    const root = resolveRoots().akasha
    const out = `${dir}/out.txt`
    const command = `bun ${root}/tools/ops/cli.ts read --file-path ${SUBJECT}`
    const ran = Bun.spawnSync(["bash", "-c", pipeline(command, out)], {
      stdout: "pipe",
      stderr: "pipe",
      env: { ...process.env, HOME: dir, INSTRUCTIONS_ROOT: root, AGENT_ID: READER },
    })
    return {
      err: ran.stderr.toString(),
      code: ran.exitCode,
      file: existsSync(out) ? readFileSync(out, "utf8") : null,
      recorded: existsSync(SEAT_RECORD),
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
    rmSync(SEAT_PAGE, { force: true })
    rmSync(SEAT_RECORD, { force: true })
  }
}

describe("what the read command prints where its output is being thrown away", () => {
  test("the one line a `head -1` receives says so, and no body stands in front of it", () => {
    const ran = readThrough((command, out) => `${command} 2>&1 | head -1 > ${out}`)
    expect(ran.file).toContain("nothing was read")
    expect(ran.file).not.toContain(OF_THE_BODY)
    expect(ran.recorded).toBe(false)
  })

  test("`>/dev/null` is refused as well, and the exit says the read did not happen", () => {
    const ran = readThrough((command) => `${command} > /dev/null`)
    expect(ran.err).toContain("/dev/null")
    expect(ran.code).toBe(1)
    expect(ran.recorded).toBe(false)
  })

  test("a redirect into a file is refused, no body landing there and no reading recorded", () => {
    const ran = readThrough((command, out) => `${command} > ${out}`)
    expect(ran.code).toBe(1)
    expect(ran.file).not.toContain(OF_THE_BODY)
    expect(ran.recorded).toBe(false)
  })

  test("a run printing everything to one file receives the body, which is what the fleet reads through", () => {
    const ran = readThrough((command, out) => `${command} > ${out} 2>&1`)
    expect(ran.code).toBe(0)
    expect(ran.file).toContain(OF_THE_BODY)
    expect(ran.recorded).toBe(true)
  })
})
