import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { bytes, delegatedAt, NO_CODE, ran, said, shown } from "./running.module.code.ts"

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
  expect(readFileSync(`${String(at)}/cgroup.subtree_control`, "utf8")).toContain("cpu")
})

test("the seconds answered carry what a process's own children spent", () => {
  const inner = "Bun.spawnSync(['bun', '-e', 'let x = 0; for (let i = 0; i < 1e8; i++) x += i'])"
  expect(ran(["bun", "-e", inner]).cpuSeconds).toBeGreaterThan(0.1)
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
