import { expect, test } from "bun:test"
import { closeSync } from "node:fs"
import { bytes } from "../running/running.module.code.ts"
import {
  framed,
  piped,
  relayed,
  SERVING_MARKER,
  spentRelaying,
  unframed,
  written,
} from "./run-relaying.module.code.ts"

const HERE = `${import.meta.dir}/run-relaying.module.code.ts`

test("a run relayed to the server is answered with the code and the bytes it left", () => {
  const done = relayed(["sh", "-c", "printf hello"])
  expect(done.code).toBe(0)
  expect(done.signal).toBeNull()
  expect(new TextDecoder().decode(done.out)).toBe("hello")
  expect(done.err).toBe("")
})

test("what a caller hands in reaches the process the server starts", () => {
  const done = relayed(["cat"], { stdin: new TextEncoder().encode("handed in") })
  expect(new TextDecoder().decode(done.out)).toBe("handed in")
})

test("what a relayed run burned is added to the seconds this module has spent elsewhere", () => {
  const before = spentRelaying()
  const done = relayed(["sh", "-c", "i=0; while [ $i -lt 400000 ]; do i=$((i+1)); done"])

  expect(done.code).toBe(0)
  expect(done.cpuSeconds).toBeGreaterThan(0)
  expect(spentRelaying() - before).toBeCloseTo(done.cpuSeconds, 6)
})

test("a program on no path raises in the caller rather than being answered", () => {
  expect(() => relayed(["no-such-program-on-any-path"])).toThrow(/no-such-program-on-any-path/)
})

test("a run raising in the server leaves the channel fit for the run after it", () => {
  expect(() => relayed(["no-such-program-on-any-path"])).toThrow()
  expect(relayed(["true"]).code).toBe(0)
})

test("every byte value goes over the channel and comes back the same", () => {
  const sent = new Uint8Array(4 * 1024 * 1024)
  for (let i = 0; i < sent.length; i += 1) sent[i] = i % 256
  const done = relayed(["cat"], { stdin: sent })
  expect(done.out.length).toBe(sent.length)
  expect(Bun.SHA256.hash(done.out, "hex")).toBe(Bun.SHA256.hash(sent, "hex"))
})

test("a server torn away mid-run is answered as a lost channel rather than a run", () => {
  expect(relayed(["true"]).code).toBe(0)
  const done = relayed(["sh", "-c", "kill -KILL $PPID; sleep 30"])
  expect(done.code).toBe(-1)
  expect(done.signal).toBeNull()
  expect(done.out.length).toBe(0)
  expect(done.err).toMatch(/^runner channel lost: /)
})

test("the run after a lost channel is answered by a server started again", () => {
  expect(relayed(["sh", "-c", "kill -KILL $PPID"]).err).toMatch(/^runner channel lost: /)
  expect(new TextDecoder().decode(relayed(["sh", "-c", "printf again"]).out)).toBe("again")
})

test("a process already marked as the server starts no server of its own", () => {
  const source = `import { relayed } from ${JSON.stringify(HERE)}; relayed(["true"])`
  const done = bytes(["bun", "-e", source], { env: { ...process.env, [SERVING_MARKER]: "1" } })
  expect(done.code).not.toBe(0)
  expect(done.err).toContain(`a process under ${SERVING_MARKER} starts no server of its own`)
})

test("a frame written whole is read back as the head and the two runs of bytes it was", () => {
  const [read, write] = piped()
  written(write, framed({ any: "head" }, new Uint8Array([255, 0, 254]), new Uint8Array([1])))
  const frame = unframed(read)
  expect(frame.head).toEqual({ any: "head" })
  expect([...frame.first]).toEqual([255, 0, 254])
  expect([...frame.second]).toEqual([1])
  closeSync(write)
  closeSync(read)
})

test("a frame ending early raises rather than being answered as a frame that arrived", () => {
  const [read, write] = piped()
  const whole = framed({ any: "head" }, new TextEncoder().encode("abcd"), new Uint8Array())
  written(write, whole.slice(0, whole.length - 2))
  closeSync(write)
  expect(() => unframed(read)).toThrow(/the channel ended/)
  closeSync(read)
})
