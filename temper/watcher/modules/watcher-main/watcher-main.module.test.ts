import { expect, test } from "bun:test"
import type { DispatchHandlerArgs } from "akasha/temper/watcher/modules/watcher-dispatch-handling/watcher-dispatch-handling.module.code.ts"
import { FILE_TYPES } from "akasha/temper/watcher/modules/watcher-file-type/watcher-file-type.module.code.ts"
import {
  fatalLine,
  startWatcher,
  syncInventoryAtStart,
  tryUpdate,
  watchedLabel,
} from "akasha/temper/watcher/modules/watcher-main/watcher-main.module.code.ts"
import {
  answerOf,
  attemptOf,
  CAPTURED_BASENAMES,
  CONFIG,
  counted,
  dispatched,
  downloading,
  LEGACY_LABELS,
  LIVE,
  lines,
  options,
  SOURCE_KEY_FOR_TEST,
  sessionOf,
  startWith,
  syncOf,
  updating,
} from "akasha/temper/watcher/modules/watcher-main/watcher-main.module.test-fixtures.ts"

test("every watched file name is the base name the legacy config built", () => {
  const built = FILE_TYPES.map((t) => CONFIG[SOURCE_KEY_FOR_TEST[t]])
  expect(built.map((p) => p.slice(p.lastIndexOf("/") + 1))).toEqual([...CAPTURED_BASENAMES])
})

test("the label of each captured base name is the name the legacy handler was given", () => {
  expect(CAPTURED_BASENAMES.map(watchedLabel)).toEqual([...LEGACY_LABELS])
})

test("a name that is not a Temper lua file is its own label", () => {
  expect(watchedLabel("something-else.txt")).toBe("something-else.txt")
})

test("a fatal line carries the message and the stack", () => {
  const err = new Error("boom")
  err.stack = "STACK"
  expect(fatalLine("uncaught exception", err)).toBe(
    "FATAL uncaught exception — watcher exiting: boom\nSTACK"
  )
})

test("a fatal line with no stack says so", () => {
  const err = new Error("boom")
  err.stack = undefined
  expect(fatalLine("unhandled rejection", err)).toBe(
    "FATAL unhandled rejection — watcher exiting: boom\n(no stack)"
  )
})

test("a fatal line for something that is not an error is that thing", () => {
  expect(fatalLine("unhandled rejection", 7)).toBe("FATAL unhandled rejection — watcher exiting: 7")
})

test("a failed update check is logged and carried on from", async () => {
  const said = lines()
  await tryUpdate(
    attemptOf(said, {
      updating: updating({ kind: "check-failed", reason: "http-error", detail: "HTTP 500" }),
    })
  )
  expect(said.error).toEqual(["Update check failed (http-error): HTTP 500"])
})

test("being up to date says nothing", async () => {
  const said = lines()
  await tryUpdate(attemptOf(said))
  expect(said.info).toEqual([])
})

test("a built worker downloads the update", async () => {
  const said = lines()
  let asked = ""
  await tryUpdate(
    attemptOf(said, {
      updating: downloading("9.9.9", (url) => {
        asked = url
        return Promise.resolve()
      }),
    })
  )
  expect(said.info).toEqual(["Update available: 9.9.9. Downloading..."])
  expect(asked).toBe("https://server.test")
})

test("an update that throws while being applied leaves the worker running", async () => {
  const said = lines()
  await tryUpdate(
    attemptOf(said, {
      updating: downloading("9.9.9", () => Promise.reject(new Error("disk full"))),
    })
  )
  expect(said.error).toEqual(["Update apply failed: disk full"])
})

test("an inventory that never settled is skipped", async () => {
  const said = lines()
  await syncInventoryAtStart(syncOf(said, [], { readWhenStable: () => Promise.resolve(null) }))
  expect(said.info).toEqual([
    "Syncing inventory settings...",
    "Inventory sync skipped — file missing or never stabilized",
  ])
})

test("a broken inventory is synced anyway so a whole write-back can replace it", async () => {
  const said = lines()
  const written: string[] = []
  await syncInventoryAtStart(
    syncOf(said, written, {
      readWhenStable: () =>
        Promise.resolve({ content: "{ oops", snapshot: { size: 6, mtimeMs: 5 } }),
      dispatch: dispatched({ writeBack: "TemperItems = { back }" }),
    })
  )
  expect(said.info[1]).toBe(
    "Inventory file is broken — syncing anyway so a whole write-back can replace it"
  )
  expect(written).toEqual(["TemperItems = { back }"])
})

test("a write-back that is no whole saved-variables file is refused", async () => {
  const said = lines()
  const written: string[] = []
  await syncInventoryAtStart(
    syncOf(said, written, { dispatch: dispatched({ writeBack: '["sell"] = { }' }) })
  )
  expect(written).toEqual([])
  expect(said.error).toEqual([
    "Inventory sync write-back refused — it is no whole saved-variables file",
  ])
})

test("an inventory with nothing to write back is up to date", async () => {
  const said = lines()
  const written: string[] = []
  await syncInventoryAtStart(syncOf(said, written))
  expect(said.info[1]).toBe("Inventory settings up to date")
  expect(written).toEqual([])
})

test("a refused inventory dispatch is logged as a failure", async () => {
  const said = lines()
  await syncInventoryAtStart(
    syncOf(said, [], {
      dispatch: dispatched({ ok: false, error: "server said no" }),
    })
  )
  expect(said.error).toEqual(["Inventory sync failed: server said no"])
})

test("a write-back is applied and remembered by its hash", async () => {
  const said = lines()
  const written: string[] = []
  const sync = syncOf(said, written, {
    dispatch: dispatched({
      writeBack: "TemperItems = { back }",
      inventoryConfigSideFileHash: "side-hash",
    }),
  })
  await syncInventoryAtStart(sync)
  expect(written).toEqual(["TemperItems = { back }"])
  expect(said.info[1]).toBe("Inventory settings synced")
  expect(sync.fileState.lastInventoryConfigWriteBackHash).toBe("side-hash")
  expect(sync.fileState.lastWriteBackContentHash).toHaveLength(64)
})

test("a write-back for a file that changed since the stable read is skipped", async () => {
  const said = lines()
  const written: string[] = []
  await syncInventoryAtStart(
    syncOf(said, written, {
      stillMatches: () => false,
      dispatch: dispatched({ writeBack: "TemperItems = { back }" }),
    })
  )
  expect(written).toEqual([])
  expect(said.info[1]).toBe(
    "Inventory sync write-back skipped — file changed since the stable read"
  )
})

test("a throwing stable read leaves the worker running", async () => {
  const said = lines()
  await syncInventoryAtStart(
    syncOf(said, [], { readWhenStable: () => Promise.reject(new Error("EIO")) })
  )
  expect(said.error).toEqual(["Startup sync error: EIO"])
})

test("every kind of file the watcher knows is watched under its own name", async () => {
  const said = lines()
  const watched: string[] = []
  const named: string[] = []
  const start = await startWatcher(
    options(said, {
      watch: (p) => {
        watched.push(p)
        return () => undefined
      },
      makeDispatchHandler: (args: DispatchHandlerArgs) => {
        named.push(args.name)
        return () => undefined
      },
    })
  )
  expect(start.kind).toBe("watching")
  expect(watched).toHaveLength(FILE_TYPES.length)
  expect(named).toEqual([...LEGACY_LABELS])
  expect(said.info[0]).toBe("Temper SavedVariables Watcher vv-test starting")
  expect(said.info).toContain(`SavedVariables: ${LIVE}/SavedVariables`)
  expect(said.info).toContain(`AddOns: ${LIVE}/AddOns`)
  expect(said.info).toContain("Watching: TemperCatalog.lua")
  expect(said.info.at(-1)).toBe("Watching 7 file(s)")
})

test("a file that is not there is warned about and left unwatched", async () => {
  const { said, start } = await startWith({ isThere: (p) => p !== CONFIG.temperErrorsPath })
  expect(start.kind === "watching" && start.watching).toHaveLength(6)
  expect(said.info).toContain(
    `Warning: Temper.lua not found at ${CONFIG.temperErrorsPath}, skipping`
  )
})

test("no file to watch asks to exit rather than exiting", async () => {
  const { said, start } = await startWith({ isThere: () => false })
  expect(start).toEqual({ kind: "exit", code: 1, reason: "nothing-to-watch" })
  expect(said.error).toEqual(["No files found to watch. Asking to exit."])
})

test("a session naming no account asks to exit rather than signing anyone in", async () => {
  const { said, start } = await startWith({
    openSession: sessionOf([answerOf(null)]),
  })
  expect(start).toEqual({ kind: "exit", code: 1, reason: "no-valid-session" })
  expect(said.error).toEqual(["No valid session (no session)."])
})

test("a session refusing nothing and naming nobody asks to exit", async () => {
  const { said, start } = await startWith({
    openSession: sessionOf([{ data: { user: null }, error: null }]),
  })
  expect(start).toEqual({ kind: "exit", code: 1, reason: "no-valid-session" })
  expect(said.error).toEqual(["No valid session (no user)."])
})

test("a config that will not build asks to exit rather than exiting", async () => {
  const { said, start } = await startWith({
    buildConfig: () => {
      throw new Error("no live directory")
    },
  })
  expect(start).toEqual({ kind: "exit", code: 1, reason: "config-error" })
  expect(said.error).toEqual(["Config error: no live directory"])
})

test("a worker running from source asks the server for no version", async () => {
  const said = lines()
  let asked = 0
  const start = await startWatcher(
    options(said, {
      sourceRuntime: () => true,
      updating: updating(
        { kind: "update-available", version: "fedcba9876543210" },
        {
          checkForUpdate: () => {
            asked += 1
            return Promise.resolve({ kind: "up-to-date" })
          },
        }
      ),
    })
  )
  expect(start.kind).toBe("watching")
  expect(asked).toBe(0)
})

test("a worker running from source reports the head it is on", async () => {
  const { said } = await startWith({
    sourceRuntime: () => true,
    updating: updating({ kind: "up-to-date" }, { resolveSourceHeadSha: () => "headsha0" }),
  })
  expect(said.info[0]).toBe("Temper SavedVariables Watcher vheadsha0 starting")
})

test("a checkout git cannot read reports itself as dev", async () => {
  const { said } = await startWith({
    sourceRuntime: () => true,
    updating: updating({ kind: "up-to-date" }, { resolveSourceHeadSha: () => null }),
  })
  expect(said.info[0]).toBe("Temper SavedVariables Watcher vdev starting")
})

test("a valid session is reported by the account it names", async () => {
  const { said } = await startWith()
  expect(said.info).toContain("Session validated (u1)")
})

test("an update check inside the quiet window checks nothing", async () => {
  const probe = counted(lines(), () => 1_000_000)
  await probe.started
  expect(probe.checksSoFar()).toBe(1)
  await probe.handler().checkForUpdate()
  expect(probe.checksSoFar()).toBe(1)
})

test("an update check past the quiet window checks again", async () => {
  let clock = 1_000_000
  const probe = counted(lines(), () => clock)
  await probe.started
  clock += 60_000
  await probe.handler().checkForUpdate()
  expect(probe.checksSoFar()).toBe(2)
})

test("an hourly check is set for a built worker and for no worker running from source", async () => {
  const hourly: number[] = []
  const repeatEvery = (ms: number): (() => undefined) => {
    hourly.push(ms)
    return () => undefined
  }
  await startWatcher(options(lines(), { repeatEvery }))
  expect(hourly).toEqual([3_600_000])
  await startWatcher(options(lines(), { repeatEvery, sourceRuntime: () => true }))
  expect(hourly).toEqual([3_600_000])
})

test("a worker running from source checks for no update when a watched file changes", async () => {
  const probe = counted(lines(), () => 1_000_000, { sourceRuntime: () => true })
  await probe.started
  await probe.handler().checkForUpdate()
  expect(probe.checksSoFar()).toBe(0)
})

test("stopping unwatches every file and stops the hourly check", async () => {
  const said = lines()
  const unwatched: string[] = []
  let hourlyStopped = false
  const start = await startWatcher(
    options(said, {
      watch: (p) => () => {
        unwatched.push(p)
        return undefined
      },
      repeatEvery: () => () => {
        hourlyStopped = true
        return undefined
      },
    })
  )
  if (start.kind !== "watching") throw new Error("the watcher did not start")
  start.stop()
  expect(unwatched).toHaveLength(FILE_TYPES.length)
  expect(hourlyStopped).toBe(true)
  expect(said.info.at(-1)).toBe("Shutting down")
})

test("the inventory is synced at startup only where the inventory file is there", async () => {
  const said = lines()
  let reads = 0
  await startWatcher(
    options(said, {
      isThere: (p) => p !== CONFIG.inventoryPath,
      readWhenStable: () => {
        reads += 1
        return Promise.resolve(null)
      },
    })
  )
  expect(reads).toBe(0)
})

test("every handler is told the same token and server and its own path", async () => {
  const said = lines()
  const handed: DispatchHandlerArgs[] = []
  await startWatcher(
    options(said, {
      resolveToken: () => "wt_seen",
      makeDispatchHandler: (args: DispatchHandlerArgs) => {
        handed.push(args)
        return () => undefined
      },
    })
  )
  expect(handed.map((a) => a.token)).toEqual(Array(7).fill("wt_seen"))
  expect(handed.map((a) => a.serverUrl)).toEqual(Array(7).fill("https://server.test"))
  expect(handed.map((a) => a.sourcePathOf())).toEqual(
    FILE_TYPES.map((t) => CONFIG[SOURCE_KEY_FOR_TEST[t]])
  )
  expect(handed.map((a) => a.fileType)).toEqual([...FILE_TYPES])
})
