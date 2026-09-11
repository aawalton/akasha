import { expect, test } from "bun:test"
import { optionalEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { relayed } from "akasha/utils/run/run-relaying/run-relaying.module.code.ts"
import { NO_CODE } from "akasha/utils/run/running/running.module.code.ts"

test("a code other than zero is answered by the server as data", () => {
  const done = relayed(["sh", "-c", "printf out; printf err 1>&2; exit 3"])
  expect(done.code).toBe(3)
  expect(done.signal).toBeNull()
  expect(new TextDecoder().decode(done.out)).toBe("out")
  expect(done.err).toBe("err")
})

test("bytes no reader could read as text come back whole from the server", () => {
  expect([...relayed(["printf", "\\377\\376"]).out]).toEqual([255, 254])
})

test("a process the server starts runs where the caller says", () => {
  expect(new TextDecoder().decode(relayed(["pwd"], { cwd: "/usr" }).out)).toBe("/usr\n")
})

test("an environment stated replaces the environment the server was given", () => {
  const done = relayed(["printenv", "AKASHA_RELAY_PROBE"], {
    env: { PATH: optionalEnv("PATH"), AKASHA_RELAY_PROBE: "here" },
  })
  expect(new TextDecoder().decode(done.out)).toBe("here\n")
})

test("an entry stated as undefined means the name is unset rather than dropped", () => {
  const done = relayed(["sh", "-c", "printenv AKASHA_RELAY_PROBE; printf gone=$?"], {
    env: { PATH: optionalEnv("PATH"), AKASHA_RELAY_PROBE: undefined },
  })
  expect(new TextDecoder().decode(done.out)).toBe("gone=1")
})

test("a run past the time the caller gave it is answered as died on a signal", () => {
  const done = relayed(["sh", "-c", "sleep 30"], { timeout: 300 })
  expect(done.code).toBe(NO_CODE)
  expect(done.signal).not.toBeNull()
})

test("a run past its processor ceiling is answered as died on a signal", () => {
  const done = relayed(["sh", "-c", "while :; do :; done"], { cpuCeiling: 1 })
  expect(done.signal).toBe("SIGKILL")
  expect(done.cpuSeconds).toBeLessThan(2)
})

test("the seconds answered are the run's own rather than the server's", () => {
  const idle = relayed(["true"]).cpuSeconds
  const busy = relayed(["bun", "-e", "let x = 0; for (let i = 0; i < 1e8; i++) x += i"]).cpuSeconds
  expect(idle).toBeLessThan(0.05)
  expect(busy).toBeGreaterThan(idle)
})
