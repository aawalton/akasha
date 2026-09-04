import { expect, test } from "bun:test"
import { FILE_TYPES, type FileType } from "../watcher-file-type/watcher-file-type.module.code.ts"
import { TARGET_OPERATIONS } from "../watcher-run-observing/watcher-run-observing.module.code.ts"
import type { SyncOperation } from "../watcher-run-outcome/watcher-run-outcome.module.code.ts"
import { hashContent } from "../watcher-self-write-guard/watcher-self-write-guard.module.code.ts"
import type {
  StableRead,
  StatSnapshot,
} from "../watcher-stable-read/watcher-stable-read.module.code.ts"
import { initialFileState } from "../watcher-state/watcher-state.module.code.ts"
import {
  ALREADY_RUNNING,
  CHANGED_SINCE_STABLE_READ,
  DEBOUNCE_MS,
  type DispatchAnswer,
  type DispatchAsk,
  FILE_NOT_FOUND,
  LOOKS_TRUNCATED,
  makeDispatchHandler,
  NEVER_STABILIZED,
  sideFileKeysFor,
} from "./watcher-dispatch-handling.module.code.ts"

const PATH = "/game/TemperInventory.lua"
const CONTENT = "TemperInventoryData = {}"
const SNAPSHOT: StatSnapshot = { size: 24, mtimeMs: 1_700_000_000_000 }
const STABLE: StableRead = { content: CONTENT, snapshot: SNAPSHOT }

const CONFIG_PATHS = {
  inventoryConfigPath: "/addons/TemperInventory/TemperInventoryConfig.lua",
  charactersConfigPath: "/addons/TemperCharacters/TemperCharactersConfig.lua",
  companionsConfigPath: "/addons/TemperCompanions/TemperCompanionsConfig.lua",
}

function answerOf(over: Partial<DispatchAnswer> = {}): DispatchAnswer {
  return {
    ok: true,
    operations: [],
    writeBack: null,
    inventoryConfigSideFileHash: null,
    charactersConfigSideFileHash: null,
    companionsConfigSideFileHash: null,
    ...over,
  }
}

interface RigOptions {
  readonly fileType?: FileType
  readonly stable?: StableRead | null
  readonly answer?: DispatchAnswer
  readonly present?: boolean
  readonly unchanged?: boolean
  readonly throws?: string
}

function rig(options: RigOptions = {}) {
  const fileState = initialFileState()
  const notes: string[] = []
  const failures: string[] = []
  const queued: Array<() => Promise<void>> = []
  const asks: DispatchAsk[] = []
  const reported: Array<readonly SyncOperation[]> = []
  const written: Array<{ path: string; content: string }> = []
  let clock = 1_000_000
  let drained = 0

  const handler = makeDispatchHandler({
    name: "Inventory",
    fileType: options.fileType ?? "inventory",
    sourcePathOf: () => PATH,
    fileState,
    serverUrl: "https://server.example",
    token: "a-token",
    configPaths: CONFIG_PATHS,
    enqueue: (run) => {
      queued.push(run)
      return undefined
    },
    checkForUpdate: async () => {},
    dispatch: async (ask) => {
      asks.push(ask)
      if (options.throws !== undefined) throw new Error(options.throws)
      return options.answer ?? answerOf()
    },
    report: async (operations) => {
      reported.push(operations)
    },
    seams: {
      now: () => clock,
      filePresent: () => options.present ?? true,
      readWhenStable: async () => (options.stable === undefined ? STABLE : options.stable),
      fileUnchanged: () => options.unchanged ?? true,
      writeBackTo: (path, content) => {
        written.push({ path, content })
        return undefined
      },
      note: (message) => {
        notes.push(message)
        return undefined
      },
      noteFailure: (message) => {
        failures.push(message)
        return undefined
      },
    },
  })

  async function drain(): Promise<void> {
    while (drained < queued.length) {
      const run = queued[drained]
      drained += 1
      if (run !== undefined) await run()
    }
  }

  return {
    handler,
    fileState,
    notes,
    failures,
    queued,
    asks,
    reported,
    written,
    drain,
    advance: (ms: number) => {
      clock += ms
    },
  }
}

test("the first change is queued", () => {
  const r = rig()
  r.handler()
  expect(r.queued).toHaveLength(1)
})

test("a second change inside the debounce is dropped", async () => {
  const r = rig()
  r.handler()
  await r.drain()
  r.advance(DEBOUNCE_MS - 1)
  r.handler()
  expect(r.queued).toHaveLength(1)
})

test("a change once the debounce has elapsed is queued", async () => {
  const r = rig()
  r.handler()
  await r.drain()
  r.advance(DEBOUNCE_MS)
  r.handler()
  expect(r.queued).toHaveLength(2)
})

test("a change while a run is in progress is dropped", () => {
  const r = rig()
  r.handler()
  r.advance(DEBOUNCE_MS * 10)
  r.handler()
  expect(r.queued).toHaveLength(1)
  expect(r.notes).toEqual([`Inventory ${ALREADY_RUNNING}`])
})

test("the debounce is measured from the clock handed in", () => {
  const r = rig()
  r.handler()
  expect(r.fileState.lastRunTime).toBe(1_000_000)
})

test("a drained run leaves the file no longer running", async () => {
  const r = rig()
  r.handler()
  expect(r.fileState.running).toBe(true)
  await r.drain()
  expect(r.fileState.running).toBe(false)
})

test("a file that never settles is reported as skipped", async () => {
  const r = rig({ stable: null, present: true })
  r.handler()
  await r.drain()
  expect(r.notes).toEqual([`Inventory skipped — ${NEVER_STABILIZED}: ${PATH}`])
  expect(r.reported[0]?.map((o) => o.state)).toEqual(["skipped", "skipped", "skipped"])
  expect(r.reported[0]?.[0]?.detail).toBe(NEVER_STABILIZED)
  expect(r.asks).toHaveLength(0)
})

test("a file absent from disk is reported as not found", async () => {
  const r = rig({ stable: null, present: false })
  r.handler()
  await r.drain()
  expect(r.notes).toEqual([`Inventory skipped — ${FILE_NOT_FOUND}: ${PATH}`])
  expect(r.reported[0]?.[0]?.state).toBe("file_not_found")
  expect(r.reported[0]?.[0]?.detail).toBeUndefined()
})

test("content the watcher wrote back itself is dropped with no report", async () => {
  const r = rig()
  r.fileState.lastWriteBackContentHash = hashContent(CONTENT)
  r.handler()
  await r.drain()
  expect(r.asks).toHaveLength(0)
  expect(r.reported).toHaveLength(0)
  expect(r.notes).toHaveLength(0)
})

test("content with no closing brace is reported as a parse failure", async () => {
  const r = rig({ stable: { content: "TemperInventoryData = {", snapshot: SNAPSHOT } })
  r.handler()
  await r.drain()
  expect(r.notes).toEqual([`Inventory skipped — ${LOOKS_TRUNCATED}`])
  expect(r.reported[0]?.[0]?.state).toBe("parse_failed")
  expect(r.reported[0]?.[0]?.detail).toBe(LOOKS_TRUNCATED)
})

test("the ask carries the path, the modification time and the side file config path", async () => {
  const r = rig()
  r.handler()
  await r.drain()
  expect(r.asks[0]).toEqual({
    fileType: "inventory",
    content: CONTENT,
    token: "a-token",
    serverUrl: "https://server.example",
    sourcePath: PATH,
    sourceMtimeMs: SNAPSHOT.mtimeMs,
    inventoryConfigPath: CONFIG_PATHS.inventoryConfigPath,
  })
})

test("a kind of file with no side file is asked with no config path", async () => {
  const r = rig({ fileType: "sales" })
  r.handler()
  await r.drain()
  expect(Object.keys(r.asks[0] ?? {}).sort()).toEqual([
    "content",
    "fileType",
    "serverUrl",
    "sourceMtimeMs",
    "sourcePath",
    "token",
  ])
})

test("a side file hash the dispatch answers is remembered", async () => {
  const r = rig({ answer: answerOf({ inventoryConfigSideFileHash: "side-hash" }) })
  r.handler()
  await r.drain()
  expect(r.fileState.lastInventoryConfigWriteBackHash).toBe("side-hash")
})

test("a side file hash answered as nothing leaves what was remembered", async () => {
  const r = rig()
  r.fileState.lastInventoryConfigWriteBackHash = "earlier"
  r.handler()
  await r.drain()
  expect(r.fileState.lastInventoryConfigWriteBackHash).toBe("earlier")
})

test("a write-back is written and its hash remembered", async () => {
  const r = rig({ answer: answerOf({ writeBack: "new = {}" }) })
  r.handler()
  await r.drain()
  expect(r.written).toEqual([{ path: PATH, content: "new = {}" }])
  expect(r.fileState.lastWriteBackContentHash).toBe(hashContent("new = {}"))
  expect(r.notes.at(-1)).toBe("Inventory file updated with server write-back")
})

test("a write-back is refused where the file changed after the stable read", async () => {
  const r = rig({ answer: answerOf({ writeBack: "new = {}" }), unchanged: false })
  r.handler()
  await r.drain()
  expect(r.written).toHaveLength(0)
  expect(r.notes.at(-1)).toBe(`Inventory write-back skipped — ${CHANGED_SINCE_STABLE_READ}`)
  expect(r.fileState.lastWriteBackContentHash).toBeNull()
})

test("a dispatch that is not ok is logged with its summary and its error", async () => {
  const operations: readonly SyncOperation[] = [
    { kind: "import", name: "inventory", path: PATH, state: "upload_failed", ranAt: "now" },
  ]
  const r = rig({ answer: answerOf({ ok: false, operations, error: "server said no" }) })
  r.handler()
  await r.drain()
  expect(r.failures).toEqual(["Inventory: inventory upload_failed — server said no"])
  expect(r.written).toHaveLength(0)
})

test("a throw inside the run is logged and leaves the file no longer running", async () => {
  const r = rig({ throws: "boom" })
  r.handler()
  await r.drain()
  expect(r.failures).toEqual(["Inventory error: boom"])
  expect(r.fileState.running).toBe(false)
})

test("every side file the operation targets name has its keys named here", () => {
  for (const fileType of FILE_TYPES) {
    const target = TARGET_OPERATIONS[fileType]
    const keys = sideFileKeysFor(fileType)
    expect(keys === undefined).toBe(!("sideFile" in target))
  }
})

test("the side file keys of a kind of file are those of its own side file", () => {
  expect(sideFileKeysFor("characters")).toEqual({
    configPath: "charactersConfigPath",
    answerHash: "charactersConfigSideFileHash",
    remembered: "lastCharactersConfigWriteBackHash",
  })
})
