import { expect, mock, test } from "bun:test"

const SETTLED = "settled"
const WORKING_ON = "working on"
const RAN: string[] = []
const NEVER: Promise<number> = new Promise(() => {})

const worker = await import("akasha/temper/watcher/watcher-running/watcher-running.module.code.ts")

mock.module("akasha/temper/watcher/watcher-running/watcher-running.module.code.ts", () => ({
  ...worker,
  runWatcherWorker: () => {
    RAN.push("worker")
    return NEVER
  },
}))

const running = await import(
  "akasha/temper/watcher/service-workstations/temper-watcher.service-workstation.running.code.ts"
)

function outcomeOf(run: Promise<never>, ms: number): Promise<string> {
  return Promise.race([
    run.then(() => SETTLED),
    new Promise<string>((say) => {
      setTimeout(() => say(WORKING_ON), ms)
    }),
  ])
}

test("the run is a function taking nothing, which is how the service runner calls it", () => {
  expect(typeof running.runService).toBe("function")
  expect(running.runService.length).toBe(0)
})

test("the run is the only way into this file, so the service has one entry", () => {
  expect(Object.keys(running)).toEqual(["runService"])
})

test("a run starts the running module's own worker rather than a worker started again here", async () => {
  RAN.length = 0
  await expect(outcomeOf(running.runService(), 25)).resolves.toBe(WORKING_ON)
  expect(RAN).toEqual(["worker"])
})

test("a run does not answer while the worker is up, so the runner's process stays the service", async () => {
  RAN.length = 0
  await expect(outcomeOf(running.runService(), 100)).resolves.toBe(WORKING_ON)
})

test("a worker that could not be started is carried out rather than swallowed, so a second watcher is refused by name", async () => {
  mock.module("akasha/temper/watcher/watcher-running/watcher-running.module.code.ts", () => ({
    ...worker,
    runWatcherWorker: () => {
      throw new Error("a watcher worker is already running as pid 1234")
    },
  }))
  await expect(running.runService()).rejects.toThrow("a watcher worker is already running")
})
