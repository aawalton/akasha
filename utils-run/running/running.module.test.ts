import { expect, test } from "bun:test"
import { bytes, NO_CODE, ran, said, shown } from "./running.module.code.ts"

test("a command exiting zero is answered as zero and what it printed", () => {
  expect(ran(["sh", "-c", "printf hello"])).toEqual({
    code: 0,
    signal: null,
    out: "hello",
    err: "",
  })
})

test("a command exiting other than zero is answered rather than thrown", () => {
  expect(ran(["false"])).toEqual({ code: 1, signal: null, out: "", err: "" })
})

test("what a command says on each stream is kept apart", () => {
  expect(ran(["sh", "-c", "printf out; printf err 1>&2; exit 3"])).toEqual({
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
  ).toEqual({ code: 0, signal: null, out: "here\n", err: "" })
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
