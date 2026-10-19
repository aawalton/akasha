import { expect, test } from "bun:test"

const running = await import(
  "akasha/temper/eso/saved-variable/service-workstations/temper-memory-reading/temper-memory-reading.service-workstation.running.code.ts"
)

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})
