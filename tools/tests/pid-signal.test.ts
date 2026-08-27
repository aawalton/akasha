import { describe, expect, it } from "bun:test"
import { pidAliveOrRefuse } from "../lib/pid-signal.ts"

describe("pidAliveOrRefuse", () => {
  it("reads the pid of the process asking as alive", () => {
    expect(pidAliveOrRefuse(process.pid)).toBe(true)
  })

  it("reads a pid past the kernel's pid_max ceiling as dead", () => {
    expect(pidAliveOrRefuse(2_147_483_647)).toBe(false)
  })
})
