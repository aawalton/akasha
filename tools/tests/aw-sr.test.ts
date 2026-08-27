
import { afterAll, describe, expect, it } from "bun:test"
import { chmod, mkdir, mkdtemp, rm, unlink } from "node:fs/promises"
import { basename, dirname, join } from "node:path"
import { bash } from "./aw-run.ts"
import type { AliasEntry } from "../aw/init/alias-snapshot.ts"
import { generateBashInit } from "../aw/init/bash.ts"
import { SEAT_COMMAND_REL } from "../aw/init/state-seat.ts"

function captureText(raw: unknown): string {
  if (typeof raw !== "string") throw new Error("capture file did not read as text")
  return raw
}

const SCRATCH_ROOT = "/var/tmp"

const FIXTURE_ACCOUNTS: readonly AliasEntry[] = [
  { account: "aawalton", aliasIndex: 1 },
  { account: "alanwalton", aliasIndex: 2 },
]

const tmpFile = join(SCRATCH_ROOT, `aw-sr-test-${Date.now()}.sh`)
await Bun.write(tmpFile, generateBashInit(FIXTURE_ACCOUNTS))

afterAll(async () => {
  await unlink(tmpFile).catch(() => {})
})

const RESOLVED_ID = "aid-resumed"
const LAUNCHING_ID = "aid-launcher"

interface Row {
  readonly role?: string
  readonly domain?: string
  readonly persona?: string
  readonly resumes?: null
  readonly seatCommand?: "present" | "refusing"
  readonly liveTmux?: boolean
  readonly panesDead?: boolean
}

interface SrRun {
  readonly home: string
  readonly launched: string
  readonly opsCalls: string
  readonly tmuxCalls: string
  readonly stderr: string
  readonly exitCode: number
}

async function runSr(row: Row = {}): Promise<SrRun> {
  const home = await mkdtemp(join(SCRATCH_ROOT, "sr-seat-"))
  try {
    const bin = join(home, "bin")
    const capture = join(home, "captured")
    const opsCapture = join(home, "ops-calls")
    const tmuxCapture = join(home, "tmux-calls")
    await mkdir(bin, { recursive: true })
    await mkdir(join(home, "repos"), { recursive: true })
    await Bun.write(capture, "")
    await Bun.write(opsCapture, "")
    await Bun.write(tmuxCapture, "")
    await Bun.write(
      join(bin, "ops"),
      [
        "#!/usr/bin/env bash",
        `printf '%s\\n' "$*" >> ${JSON.stringify(opsCapture)}`,
        'if [ "$1" = "seat" ] && [ "$2" = "resume" ]; then',
        ...(row.resumes === null
          ? ["  exit 0"]
          : [`  printf '%s\\t%s\\n' ${JSON.stringify(RESOLVED_ID)} "sid-1"`]),
        "fi",
        'if [ "$1" = "seat" ] && [ "$2" = "whoami" ]; then',
        '  _who="$AGENT_ID"',
        '  [ "$3" = "--agent-id" ] && _who="$4"',
        `  if [ "$_who" != ${JSON.stringify(RESOLVED_ID)} ]; then`,
        `    printf 'id=%s\\nname=other\\nrole=%s\\ndomain=%s\\npersona=%s\\n' "$_who" ` +
          '"wrong-role" "wrong-domain" "wrong-persona"',
        "    exit 0",
        "  fi",
        `  printf 'id=%s\\nname=aria\\nrole=%s\\ndomain=%s\\npersona=%s\\n' "$_who" ${JSON.stringify(
          row.role ?? "awen-turn-gate"
        )} ${JSON.stringify(row.domain ?? "ttrpgs")} ${JSON.stringify(row.persona ?? "aria")}`,
        "fi",
        "exit 0",
        "",
      ].join("\n")
    )
    if (row.liveTmux === true) {
      await Bun.write(
        join(bin, "tmux"),
        [
          "#!/usr/bin/env bash",
          `printf '%s\\n' "$*" >> ${JSON.stringify(tmuxCapture)}`,
          `_gone=${JSON.stringify(join(home, "tmux-gone"))}`,
          'if [ "$1" = "kill-session" ]; then',
          '  : > "$_gone"',
          "  exit 0",
          "fi",
          'if [ "$1" = "has-session" ]; then',
          '  [ -e "$_gone" ] && exit 1',
          "  exit 0",
          "fi",
          'if [ "$1" = "list-panes" ]; then',
          `  printf '%s\\n' ${row.panesDead === true ? "1" : "0"}`,
          "  exit 0",
          "fi",
          "exit 0",
          "",
        ].join("\n")
      )
      await chmod(join(bin, "tmux"), 0o755)
      await Bun.write(
        join(bin, "systemd-run"),
        [
          "#!/usr/bin/env bash",
          'while [ "$#" -gt 0 ]; do',
          '  case "$1" in',
          "    --*) shift ;;",
          "    *) break ;;",
          "  esac",
          "done",
          'exec "$@"',
          "",
        ].join("\n")
      )
      await chmod(join(bin, "systemd-run"), 0o755)
    }
    if (row.seatCommand !== undefined) {
      await mkdir(join(home, "repos", "instructions", dirname(SEAT_COMMAND_REL)), { recursive: true })
      await Bun.write(join(home, "repos", "instructions", SEAT_COMMAND_REL), "// stub\n")
    }
    await Bun.write(
      join(bin, "bun"),
      [
        "#!/usr/bin/env bash",
        '_payload=""',
        `case "$*" in *${basename(SEAT_COMMAND_REL)}*) _payload=$(cat) ;; esac`,
        `printf '%s\\n' "$*\${_payload:+ $_payload}" >> ${JSON.stringify(capture)}`,
        ...(row.seatCommand === "refusing"
          ? [`case "$*" in *${basename(SEAT_COMMAND_REL)}*) exit 1 ;; esac`]
          : []),
        "",
      ].join("\n")
    )
    await chmod(join(bin, "ops"), 0o755)
    await chmod(join(bin, "bun"), 0o755)

    const invocation = row.liveTmux === true ? "sr aria" : "sr aria --no-tmux"
    const result = await bash(
      `export HOME=${JSON.stringify(home)}
       export PATH=${JSON.stringify(bin)}:"$PATH"
       export AGENT_ID=${JSON.stringify(LAUNCHING_ID)}
       unset INSTRUCTIONS_ROOT
       source ${JSON.stringify(tmpFile)}
       ${invocation}`
    )
    const read = async (path: string): Promise<string> => {
      const raw = await Bun.file(path).text()
      return captureText(raw)
    }
    return {
      home,
      launched: await read(capture),
      opsCalls: await read(opsCapture),
      tmuxCalls: await read(tmuxCapture),
      stderr: result.stderr,
      exitCode: result.exitCode,
    }
  } finally {
    await rm(home, { recursive: true, force: true })
  }
}

describe("sr() states the identity its row carries", () => {
  it("states all three slots in ONE call against the id the resume resolved", async () => {
    const { launched, stderr, exitCode } = await runSr({ seatCommand: "present" })
    expect(exitCode).toBe(0)
    expect(launched).toContain(
      `tools/seat-call.ts {"agent":"${RESOLVED_ID}","persona":"aria","domain":"ttrpgs",` +
        `"role":"awen-turn-gate","principal":"alan"}`
    )
    expect(stderr).not.toContain("seat not stated")
  })

  it("reads the triple from the row it resumed", async () => {
    const { opsCalls } = await runSr({ seatCommand: "present" })
    expect(opsCalls).toContain(`seat whoami --agent-id ${RESOLVED_ID}`)
  })

  it("never states the launching shell's own identity", async () => {
    const { launched } = await runSr({ seatCommand: "present" })
    expect(launched).not.toContain(LAUNCHING_ID)
    expect(launched).not.toContain("wrong-persona")
  })

  it("resumes unchanged, naming every slot in one line, when the seat command refuses", async () => {
    const { launched, stderr, exitCode } = await runSr({ seatCommand: "refusing" })
    expect(exitCode).toBe(0)
    expect(launched).toContain(`-r --agent-id ${RESOLVED_ID} --session-id sid-1`)
    expect(stderr).toContain("persona 'aria', domain 'ttrpgs', role 'awen-turn-gate'")
    expect(stderr.split("\n").filter((line) => line.includes("seat not stated"))).toHaveLength(1)
  })

  it("states nothing for an attribute the row does not carry, and asks for the default", async () => {
    const { launched, stderr } = await runSr({
      seatCommand: "present",
      role: "null",
      domain: "null",
      persona: "vera",
    })
    expect(launched).toContain(
      `tools/seat-call.ts {"agent":"${RESOLVED_ID}","persona":"vera","principal":"alan"}`
    )
    expect(launched).toContain(
      `tools/seat-call.ts {"agent":"${RESOLVED_ID}","default":true,"mode":"interactive"}`
    )
    expect(launched).not.toContain('"role"')
    expect(launched).not.toContain('"domain"')
    expect(stderr).not.toContain("seat not stated")
  })

  it("says nothing when the tree carries no seat command", async () => {
    const { launched, stderr, exitCode } = await runSr({})
    expect(exitCode).toBe(0)
    expect(launched).toContain("--session-id sid-1")
    expect(launched).not.toContain(SEAT_COMMAND_REL)
    expect(stderr).not.toContain("seat not stated")
  })

  it("states nothing when the name resolves no session", async () => {
    const { launched, stderr, exitCode } = await runSr({ resumes: null, seatCommand: "present" })
    expect(exitCode).toBe(1)
    expect(stderr).toContain("no resumable session")
    expect(launched).toBe("")
  })
})

describe("sr() attaches to a seat that is still live rather than resuming it", () => {
  it("attaches and returns, touching neither the row nor the transcript", async () => {
    const { launched, opsCalls, tmuxCalls, exitCode } = await runSr({
      seatCommand: "present",
      liveTmux: true,
    })
    expect(exitCode).toBe(0)
    expect(tmuxCalls).toContain("has-session -t =aria")
    expect(tmuxCalls).toContain("attach-session -t =aria")
    expect(opsCalls).toBe("")
    expect(launched).toBe("")
  })
})

describe("sr() resumes a seat whose session holds nothing but a dead pane", () => {
  const overDead = (): Promise<SrRun> =>
    runSr({ seatCommand: "present", liveTmux: true, panesDead: true })

  it("stops the dead session rather than attaching to it", async () => {
    const { tmuxCalls, exitCode } = await overDead()
    expect(exitCode).toBe(0)
    expect(tmuxCalls).toContain("kill-session -t =aria")
    expect(tmuxCalls).toContain("new-session -d -s aria")
  })

  it("resumes the row the dead session was holding, rather than starting a fresh seat", async () => {
    const { opsCalls, tmuxCalls } = await overDead()
    expect(opsCalls).toContain("seat resume aria --start-mode interactive")
    expect(tmuxCalls).toContain(`-r --agent-id ${RESOLVED_ID} --session-id sid-1`)
  })

  it("starts that session in ~/repos rather than where the launcher stood", async () => {
    const { home, tmuxCalls } = await overDead()
    expect(tmuxCalls).toContain(`new-session -d -s aria -c ${home}/repos`)
  })
})
