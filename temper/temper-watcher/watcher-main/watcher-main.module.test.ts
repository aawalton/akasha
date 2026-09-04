import { expect, test } from "bun:test"
import type { DispatchHandlerArgs } from "../watcher-dispatch-handling/watcher-dispatch-handling.module.code.ts"
import { FILE_TYPES } from "../watcher-file-type/watcher-file-type.module.code.ts"
import {
  type ExitWanted,
  fatalLine,
  startWatcher,
  syncInventoryAtStart,
  tryUpdate,
  watchedLabel,
} from "./watcher-main.module.code.ts"
import {
  answerOf,
  attemptOf,
  CAPTURED_BASENAMES,
  CONFIG,
  checksInTurn,
  counted,
  dispatched,
  downloading,
  LEGACY_LABELS,
  LIVE,
  lines,
  options,
  SOURCE_KEY_FOR_TEST,
  sessionOf,
  sourceUpdateTo,
  startWith,
  syncOf,
  updating,
} from "./watcher-main.module.test-fixtures.ts"

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
  const outcome = await tryUpdate(
    attemptOf(said, {
      updating: updating({ kind: "check-failed", reason: "http-error", detail: "HTTP 500" }),
    })
  )
  expect(outcome).toEqual({ kind: "carry-on" })
  expect(said.error).toEqual(["Update check failed (http-error): HTTP 500"])
})

test("being up to date says nothing", async () => {
  const said = lines()
  expect(await tryUpdate(attemptOf(said))).toEqual({ kind: "carry-on" })
  expect(said.info).toEqual([])
})

test("a source update that advanced asks to exit rather than exiting", async () => {
  const said = lines()
  const outcome = await tryUpdate(
    attemptOf(said, {
      fromSource: true,
      updating: sourceUpdateTo("fedcba9876543210", true, "advanced"),
    })
  )
  expect(outcome).toEqual({ kind: "exit", code: 75, reason: "source-update-advanced" })
  expect(said.info).toEqual([
    "Source update 01234567 → fedcba98; asking to exit for systemd respawn.",
  ])
})

test("a source update that did not advance is carried on from", async () => {
  const said = lines()
  const outcome = await tryUpdate(
    attemptOf(said, {
      fromSource: true,
      updating: sourceUpdateTo("fedcba9876543210", false, "no-ff-diverged"),
    })
  )
  expect(outcome).toEqual({ kind: "carry-on" })
  expect(said.info).toEqual(["Source update to fedcba98 not applied (no-ff-diverged)."])
})

test("a built worker downloads the update", async () => {
  const said = lines()
  let asked = ""
  const outcome = await tryUpdate(
    attemptOf(said, {
      updating: downloading("9.9.9", (url) => {
        asked = url
        return Promise.resolve()
      }),
    })
  )
  expect(outcome).toEqual({ kind: "carry-on" })
  expect(said.info).toEqual(["Update available: 9.9.9. Downloading..."])
  expect(asked).toBe("https://server.test")
})

test("an update that throws while being applied leaves the worker running", async () => {
  const said = lines()
  const outcome = await tryUpdate(
    attemptOf(said, {
      updating: downloading("9.9.9", () => Promise.reject(new Error("disk full"))),
    })
  )
  expect(outcome).toEqual({ kind: "carry-on" })
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

test("a truncated inventory is skipped", async () => {
  const said = lines()
  await syncInventoryAtStart(
    syncOf(said, [], {
      readWhenStable: () =>
        Promise.resolve({ content: "{ oops", snapshot: { size: 6, mtimeMs: 5 } }),
    })
  )
  expect(said.info[1]).toBe("Inventory sync skipped — content looks truncated (no closing brace)")
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
    dispatch: dispatched({ writeBack: "{ back }", inventoryConfigSideFileHash: "side-hash" }),
  })
  await syncInventoryAtStart(sync)
  expect(written).toEqual(["{ back }"])
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
      dispatch: dispatched({ writeBack: "{ back }" }),
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
  const { said, start } = await startWith({ isThere: (p) => p !== CONFIG.temperSalesPath })
  expect(start.kind === "watching" && start.watching).toHaveLength(6)
  expect(said.info).toContain(
    `Warning: TemperSales.lua not found at ${CONFIG.temperSalesPath}, skipping`
  )
})

test("no file to watch asks to exit rather than exiting", async () => {
  const { said, start } = await startWith({ isThere: () => false })
  expect(start).toEqual({ kind: "exit", code: 1, reason: "nothing-to-watch" })
  expect(said.error).toEqual(["No files found to watch. Asking to exit."])
})

test("a session that will not be set asks to exit rather than exiting", async () => {
  const { said, start } = await startWith({
    openSession: sessionOf([answerOf(null)], { message: "bad token" }),
  })
  expect(start).toEqual({ kind: "exit", code: 1, reason: "set-session-failed" })
  expect(said.error).toEqual(["setSession failed: bad token"])
})

test("a session still carrying no user after authentication asks to exit", async () => {
  const { said, start } = await startWith({
    openSession: sessionOf([answerOf(null)]),
  })
  expect(start).toEqual({ kind: "exit", code: 1, reason: "authentication-failed" })
  expect(said.error).toEqual(["Authentication failed: no session"])
})

test("a session with no user starts authentication", async () => {
  const { said } = await startWith({
    openSession: sessionOf([answerOf(null), answerOf({ id: "u2" })]),
  })
  expect(said.info[1]).toBe("No valid session (no session). Starting authentication...")
  expect(said.info[2]).toBe("Authentication successful!")
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

test("a source update at startup asks to exit before anything is watched", async () => {
  const said = lines()
  const watched: string[] = []
  const start = await startWatcher(
    options(said, {
      sourceRuntime: () => true,
      watch: (p) => {
        watched.push(p)
        return () => undefined
      },
      updating: sourceUpdateTo("fedcba9876543210", true, "advanced"),
    })
  )
  expect(start).toEqual({ kind: "exit", code: 75, reason: "source-update-advanced" })
  expect(watched).toEqual([])
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

test("a valid session is reported by the email it carries", async () => {
  const { said } = await startWith()
  expect(said.info).toContain("Session validated (alan@example.test)")
})

test("a valid session carrying no email is reported by its user id", async () => {
  const { said } = await startWith({
    openSession: sessionOf([answerOf({ id: "u1", email: null })]),
  })
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

test("an hourly check wanting an exit tells the caller rather than exiting", async () => {
  const said = lines()
  const wanted: ExitWanted[] = []
  const hourly: (() => undefined)[] = []
  await startWatcher(
    options(said, {
      sourceRuntime: () => true,
      repeatEvery: (ms, run) => {
        expect(ms).toBe(3_600_000)
        hourly.push(run)
        return () => undefined
      },
      updating: checksInTurn(
        [{ kind: "up-to-date" }, { kind: "update-available", version: "fedcba9876543210" }],
        { performSourceUpdate: () => ({ advanced: true, reason: "advanced" }) }
      ),
      onExitWanted: (w) => {
        wanted.push(w)
        return undefined
      },
    })
  )
  const run = hourly[0]
  if (run === undefined) throw new Error("no hourly check was set")
  expect(wanted).toEqual([])
  run()
  await Promise.resolve()
  await Promise.resolve()
  await Promise.resolve()
  expect(wanted).toEqual([{ kind: "exit", code: 75, reason: "source-update-advanced" }])
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
