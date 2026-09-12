import { expect, test } from "bun:test"
import { existsSync, mkdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { relayed, SERVING_MARKER } from "akasha/utils/run/run-relaying/run-relaying.module.code.ts"
import {
  bytes,
  delegatedAt,
  madePid,
  NO_CODE,
  ran,
  said,
  shown,
  spawnedHere,
} from "akasha/utils/run/running/running.module.code.ts"

const CODE = `${import.meta.dir}/running.module.code.ts`

const COSTLY = ["sh", "-c", "i=0; while [ $i -lt 20000 ]; do i=$((i+1)); done"]

const CLEAN = { ...process.env, [SERVING_MARKER]: undefined }

const MARKED = { ...process.env, [SERVING_MARKER]: "1" }

const WHERE = ["sh", "-c", `printf %s "$${SERVING_MARKER}"`]

const SEEING = `
function servers() {
  const own = String(process.pid)
  let seen = 0
  for (const name of readdirSync("/proc")) {
    let stat = ""
    let cmd = ""
    try {
      stat = readFileSync("/proc/" + name + "/stat", "utf8")
      cmd = readFileSync("/proc/" + name + "/cmdline", "utf8")
    } catch {
      continue
    }
    const after = stat.slice(stat.lastIndexOf(")") + 2).split(" ")
    if (after[1] === own && cmd.includes("run-serving")) seen += 1
  }
  console.log("servers " + String(seen))
}
`

const AFTER_COSTLY =
  `bytes(${JSON.stringify(COSTLY)})\n` +
  'const done = bytes(["printf", "hi"])\n' +
  'console.log("said " + new TextDecoder().decode(done.out) + " " + String(done.code))\n'

function childSaying(body: string, env: Record<string, string | undefined> = CLEAN): string {
  const source =
    'import { readdirSync, readFileSync } from "node:fs"\n' +
    `import { bytes } from ${JSON.stringify(CODE)}\n${SEEING}\n${body}servers()\n`
  return said(["bun", "-e", source], { env }).trim()
}

test("a command exiting zero is answered as zero and what it printed", () => {
  expect(ran(["sh", "-c", "printf hello"])).toMatchObject({
    code: 0,
    signal: null,
    out: "hello",
    err: "",
  })
})

test("a command exiting other than zero is answered rather than thrown", () => {
  expect(ran(["false"])).toMatchObject({ code: 1, signal: null, out: "", err: "" })
})

test("what a command says on each stream is kept apart", () => {
  expect(ran(["sh", "-c", "printf out; printf err 1>&2; exit 3"])).toMatchObject({
    code: 3,
    signal: null,
    out: "out",
    err: "err",
  })
})

test("a process ending on a signal is answered as that signal beside no code of its own", () => {
  const done = ran(["sh", "-c", "kill -SEGV $$"])
  expect(done.code).toBe(NO_CODE)
  expect(done.signal).toBe("SIGSEGV")
})

test("processes dying on different signals are told apart rather than collapsed", () => {
  expect(ran(["sh", "-c", "kill -KILL $$"]).signal).toBe("SIGKILL")
  expect(ran(["sh", "-c", "kill -ABRT $$"]).signal).toBe("SIGABRT")
})

test("a process exiting a code of its own names no signal", () => {
  expect(ran(["false"]).signal).toBeNull()
})

test("bytes carries the signal the process died on as text does", () => {
  expect(bytes(["sh", "-c", "kill -KILL $$"]).signal).toBe("SIGKILL")
})

test("what a process said is a throw naming the signal where a signal ended it", () => {
  expect(() => said(["sh", "-c", "kill -KILL $$"])).toThrow(/`sh` died on SIGKILL/)
})

test("what a process said comes back where it exited zero", () => {
  expect(said(["sh", "-c", "printf hello"])).toBe("hello")
})

test("what a process said is a throw naming the command and the code and the error stream", () => {
  expect(() => said(["sh", "-c", "printf nope 1>&2; exit 7"])).toThrow(/`sh` exited 7 — nope/)
})

test("a process runs where the caller says", () => {
  expect(ran(["pwd"], { cwd: "/usr" }).out).toBe("/usr\n")
})

test("a process is given the environment the caller states", () => {
  expect(
    ran(["printenv", "AKASHA_RUNNING_PROBE"], { env: { AKASHA_RUNNING_PROBE: "here" } })
  ).toMatchObject({ code: 0, signal: null, out: "here\n", err: "" })
})

test("a process is answered with the processor seconds that process and its own children spent", () => {
  const idle = ran(["true"]).cpuSeconds
  const busy = ran(["bun", "-e", "let x = 0; for (let i = 0; i < 1e8; i++) x += i"]).cpuSeconds
  expect(idle).toBeLessThan(busy)
})

test("a process is answered with the peak memory that process reached", () => {
  const small = ran(["true"]).peakBytes
  const large = ran(["bun", "-e", "new Uint8Array(400e6).fill(1)"]).peakBytes
  expect(small).toBeGreaterThan(0)
  expect(large - small).toBeGreaterThan(300e6)
})

test("a process run after a bigger one is answered its own peak rather than the bigger one", () => {
  const large = ran(["bun", "-e", "new Uint8Array(400e6).fill(1)"]).peakBytes
  const small = ran(["true"]).peakBytes
  expect(large).toBeGreaterThan(300e6)
  expect(small).toBeLessThan(large / 4)
})

test("two processes of the same shape are each answered a peak of that process's own", () => {
  const one = ran(["bun", "-e", "new Uint8Array(300e6).fill(1)"]).peakBytes
  const two = ran(["bun", "-e", "new Uint8Array(60e6).fill(1)"]).peakBytes
  expect(one).not.toBe(two)
  expect(one - two).toBeGreaterThan(200e6)
})

test("a caller is answered whether the peak answered was measured", () => {
  expect(ran(["true"]).peakMeasured).toBe(true)
  expect(spawnedHere(["true"]).peakMeasured).toBe(true)
})

test("a program no path names raises rather than being answered", () => {
  expect(() => spawnedHere(["no-such-program-on-any-path"])).toThrow(/no-such-program/)
})

test("the run that made a group is named in the group's name", () => {
  expect(madePid("akasha-1234-5678")).toBe(1234)
  expect(madePid("akasha-call-1234")).toBeNull()
  expect(madePid("akasha-1234")).toBeNull()
  expect(madePid("agent")).toBeNull()
})

test("a group left where the run that made it is gone is taken away before a group is made", () => {
  const own = (readFileSync("/proc/self/cgroup", "utf8").trim().split(":").at(-1) ?? "").trim()
  const parent = delegatedAt(own)
  expect(parent).not.toBeNull()
  const gone = ran(["sh", "-c", "printf %s $$"]).out
  const left = join(String(parent), `akasha-${gone}-1`)
  mkdirSync(left)
  expect(existsSync(left)).toBe(true)
  ran(["true"])
  expect(existsSync(left)).toBe(false)
})

test("a run relayed is answered the peak a run made here is answered", () => {
  const argv = ["bun", "-e", "new Uint8Array(200e6).fill(1)"]
  const here = spawnedHere(argv).peakBytes
  const there = relayed(argv).peakBytes
  expect(Math.abs(there - here)).toBeLessThan(here / 2)
})

test("a run relayed says its peak was measured as a run made here does", () => {
  expect(relayed(["true"]).peakMeasured).toBe(spawnedHere(["true"]).peakMeasured)
})

test("a process given a ceiling is ended at that many processor seconds", () => {
  const done = ran(["sh", "-c", "while :; do :; done"], { cpuCeiling: 1 })
  expect(done.signal).toBe("SIGKILL")
  expect(done.cpuSeconds).toBeLessThan(2)
})

test("a process given no ceiling runs to its own end", () => {
  expect(ran(["true"]).signal).toBeNull()
})

test("a process inside one given a ceiling states a ceiling above its own", () => {
  const at = `${import.meta.dir}/running.module.code.ts`
  const inner =
    `import { ran } from ${JSON.stringify(at)}; ` +
    'const done = ran(["true"], { cpuCeiling: 300 }); console.log(done.code, done.signal)'
  expect(ran(["bun", "-e", inner], { cpuCeiling: 30 }).out.trim()).toBe("0 null")
})

test("a ceiling bounds a process and everything that process starts, together", () => {
  const inner = 'Bun.spawnSync(["sh", "-c", "while :; do :; done"])'
  const done = ran(["bun", "-e", inner], { cpuCeiling: 1 })
  expect(done.signal).toBe("SIGKILL")
  expect(done.cpuSeconds).toBeLessThan(3)
})

test("a delegated ancestor is the one a budget is made under", () => {
  expect(delegatedAt("/nowhere/akasha-probe")).toBeNull()
  const own = (readFileSync("/proc/self/cgroup", "utf8").trim().split(":").at(-1) ?? "").trim()
  const at = delegatedAt(own)
  expect(at).not.toBeNull()
  const control = readFileSync(`${String(at)}/cgroup.subtree_control`, "utf8")
  expect(control).toContain("cpu")
  expect(control).toContain("memory")
})

test("the seconds answered carry what a process's own children spent", () => {
  const inner = "Bun.spawnSync(['bun', '-e', 'let x = 0; for (let i = 0; i < 1e8; i++) x += i'])"
  expect(ran(["bun", "-e", inner]).cpuSeconds).toBeGreaterThan(0.1)
})

test("the seconds answered carry a child the run never reaped, bounded or not", () => {
  const inner =
    "const child = Bun.spawn(['bun', '-e', 'let x = 0; for (let i = 0; i < 3e8; i++) x += i'])\n" +
    "child.unref()\n" +
    "Bun.sleepSync(2000)\n"
  expect(ran(["bun", "-e", inner]).cpuSeconds).toBeGreaterThan(0.2)
  expect(ran(["bun", "-e", inner], { cpuCeiling: 30 }).cpuSeconds).toBeGreaterThan(0.2)
})

test("what a caller hands in reaches the process", () => {
  expect(ran(["cat"], { stdin: new TextEncoder().encode("handed in") }).out).toBe("handed in")
})

test("an environment a caller widens carries what it was widened from", () => {
  expect(
    ran(["printenv", "AKASHA_RUNNING_PROBE"], {
      env: { ...process.env, AKASHA_RUNNING_PROBE: "here" },
    }).out
  ).toBe("here\n")
})

test("what a process says on its output stream comes back as the bytes it wrote", () => {
  const done = bytes(["printf", "hi"])
  expect(done.code).toBe(0)
  expect([...done.out]).toEqual([104, 105])
})

test("bytes a reader could not read as text come back whole", () => {
  const done = bytes(["printf", "\\377\\376"])
  expect([...done.out]).toEqual([255, 254])
})

test("a process run to be watched writes to the streams its caller was given", () => {
  const at = `${import.meta.dir}/running.module.code.ts`
  const done = ran([
    "bun",
    "-e",
    `import { shown } from ${JSON.stringify(at)}; shown(["sh", "-c", "printf seen; printf heard 1>&2"])`,
  ])
  expect(done.out).toBe("seen")
  expect(done.err).toBe("heard")
})

test("a process run to be watched throws where it exits other than zero", () => {
  expect(() => shown(["false"])).toThrow(/`false` exited 1/)
})

test("a process run to be watched throws naming the signal where a signal ended it", () => {
  expect(() => shown(["sh", "-c", "kill -KILL $$"])).toThrow(/`sh` died on SIGKILL/)
})

test("a run measured to cost no more than a run should leaves the runs after it here", () => {
  expect(childSaying('bytes(["true"])\nbytes(["true"])\nbytes(["true"])\n')).toBe("servers 0")
})

test("a run measured to cost more than a run should sends the runs after it to a server", () => {
  expect(childSaying(AFTER_COSTLY)).toBe("said hi 0\nservers 1")
})

test("a run relayed is answered as the same run made here is", () => {
  const runs = [
    ["sh", "-c", "printf out; printf err 1>&2; exit 3"],
    ["sh", "-c", "kill -KILL $$"],
    ["printf", "\\377\\376"],
  ]
  for (const argv of runs) {
    const here = spawnedHere(argv)
    const there = relayed(argv)
    expect(there.code).toBe(here.code)
    expect(there.signal).toBe(here.signal)
    expect([...there.out]).toEqual([...here.out])
    expect(there.err).toBe(here.err)
  }
})

test("a run under a ceiling is never the run the roads are measured by", () => {
  const body =
    `bytes(${JSON.stringify(COSTLY)}, { cpuCeiling: 30 })\n` + 'bytes(["true"])\nbytes(["true"])\n'
  expect(childSaying(body)).toBe("servers 0")
})

test("a process marked as the server itself makes every run here and starts no server", () => {
  expect(childSaying(AFTER_COSTLY, MARKED)).toBe("said hi 0\nservers 0")
})

test("a run the server raises on is raised rather than made a second time here", () => {
  const body =
    `bytes(${JSON.stringify(COSTLY)})\n` +
    'try { bytes(["no-such-program-on-any-path"]) } catch { console.log("raised") }\n' +
    `const done = bytes(${JSON.stringify(WHERE)})\n` +
    'console.log("where " + new TextDecoder().decode(done.out))\n'
  expect(childSaying(body)).toBe("raised\nwhere 1\nservers 1")
})

test("a raise the server sends back says the run may already have been made", () => {
  const body =
    `bytes(${JSON.stringify(COSTLY)})\n` +
    'try { bytes(["no-such-program-on-any-path"]) } catch (raised) {\n' +
    '  console.log("why " + String(raised.message.includes("may already have been made")))\n' +
    "}\n"
  expect(childSaying(body)).toBe("why true\nservers 1")
})
