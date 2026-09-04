import { describe, expect, test } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import {
  CONFIG_FILE_MODE,
  type ConfigStore,
  configPathIn,
  diskConfigStore,
  getConfigPath,
  loadConfig,
  readConfigKey,
  removeConfigKey,
  SESSION_STORAGE_KEY,
  saveConfig,
  sessionFileStore,
  writeConfigKey,
} from "./watcher-session-file.module.code.ts"

const SCRATCH_AT = "/var/tmp"
const SERVER = "https://tempereso.com"

function fakeStore(seed?: string) {
  const dir = `${SCRATCH_AT}/watcher-session-file-nowhere`
  const files = new Map<string, string>()
  const made: string[] = []
  if (seed !== undefined) {
    files.set(configPathIn(dir), seed)
    made.push(dir)
  }
  const store: ConfigStore = {
    dir: () => dir,
    exists: (path) => files.has(path) || made.includes(path),
    readText: (path) => files.get(path) ?? "",
    makeDir: (path) => {
      made.push(path)
      return
    },
    writeText: (path, body) => {
      files.set(path, body)
      return
    },
  }
  return { dir, store, files, made, bytes: () => files.get(configPathIn(dir)) }
}

describe("what the legacy module was observed to produce", () => {
  test("the session key is the one already written into config files", () => {
    expect(SESSION_STORAGE_KEY).toBe("temper-watcher-session")
  })

  test("the config file sits directly under the config directory", () => {
    const { store, dir } = fakeStore()
    expect(getConfigPath(store)).toBe(`${dir}/config.json`)
  })

  test("a config file that is not there reads as no config", () => {
    expect(loadConfig(SERVER, fakeStore().store)).toBeNull()
  })

  test("a first save writes two spaces of indent and no trailing newline", () => {
    const f = fakeStore()
    saveConfig({ [SESSION_STORAGE_KEY]: "sess-1" }, f.store)
    expect(f.bytes()).toBe('{\n  "temper-watcher-session": "sess-1"\n}')
  })

  test("a later save merges into what the file already held", () => {
    const f = fakeStore('{\n  "temper-watcher-session": "sess-1"\n}')
    saveConfig({ serverUrl: "https://other.test" }, f.store)
    expect(f.bytes()).toBe(
      '{\n  "temper-watcher-session": "sess-1",\n  "serverUrl": "https://other.test"\n}'
    )
  })

  test("a read fills in the server address the file left out", () => {
    const f = fakeStore('{"temper-watcher-session":"sess-1"}')
    expect(loadConfig(SERVER, f.store)).toEqual({
      "temper-watcher-session": "sess-1",
      serverUrl: SERVER,
    })
  })

  test("a read always carries the session key even where the file holds none", () => {
    const f = fakeStore('{"extra":1}')
    expect(Object.keys(loadConfig(SERVER, f.store) ?? {})).toEqual([
      "temper-watcher-session",
      "serverUrl",
    ])
  })

  test("a key the watcher does not know is left out of a read", () => {
    const f = fakeStore('{"extra":1,"nested":{"a":2}}')
    expect(loadConfig(SERVER, f.store)).toEqual({
      "temper-watcher-session": undefined,
      serverUrl: SERVER,
    })
  })

  test("a key the watcher does not know is kept on a write", () => {
    const f = fakeStore('{"extra":1,"nested":{"a":2}}')
    saveConfig({ serverUrl: "https://z.test" }, f.store)
    expect(f.bytes()).toBe(
      '{\n  "extra": 1,\n  "nested": {\n    "a": 2\n  },\n  "serverUrl": "https://z.test"\n}'
    )
  })

  test.each([
    ["text that is no json", "not json at all"],
    ["an empty file", ""],
    ["a json array", "[]"],
    ["a server address that is no string", '{"serverUrl":5}'],
  ])("%s reads as no config", (_name, body) => {
    expect(loadConfig(SERVER, fakeStore(body).store)).toBeNull()
  })

  test("a save over a file that will not parse drops what would not parse", () => {
    const f = fakeStore("not json at all")
    saveConfig({ [SESSION_STORAGE_KEY]: "sess-2" }, f.store)
    expect(f.bytes()).toBe('{\n  "temper-watcher-session": "sess-2"\n}')
  })
})

describe("what this recreation was written to mean", () => {
  test("the directory is made only where the directory is not there", () => {
    const bare = fakeStore()
    saveConfig({ serverUrl: SERVER }, bare.store)
    expect(bare.made).toEqual([bare.dir])

    const seeded = fakeStore("{}")
    saveConfig({ serverUrl: SERVER }, seeded.store)
    expect(seeded.made).toEqual([seeded.dir])
  })

  test("no read or write here reaches a path the caller did not name", () => {
    const f = fakeStore()
    saveConfig({ [SESSION_STORAGE_KEY]: "s" }, f.store)
    expect([...f.files.keys()]).toEqual([configPathIn(f.dir)])
  })

  test("a key held as a string is answered", () => {
    const f = fakeStore('{"temper-watcher-session":"sess-1"}')
    expect(readConfigKey(SESSION_STORAGE_KEY, f.store)).toBe("sess-1")
  })

  test("a key the file does not hold is answered as nothing", () => {
    expect(readConfigKey(SESSION_STORAGE_KEY, fakeStore("{}").store)).toBeNull()
    expect(readConfigKey(SESSION_STORAGE_KEY, fakeStore().store)).toBeNull()
  })

  test("a key held as something other than a string is answered as nothing", () => {
    const f = fakeStore('{"extra":7}')
    expect(readConfigKey("extra", f.store)).toBeNull()
  })

  test("a key written by itself lands beside the keys already held", () => {
    const f = fakeStore('{"serverUrl":"https://z.test"}')
    writeConfigKey(SESSION_STORAGE_KEY, "sess-9", f.store)
    expect(f.bytes()).toBe(
      '{\n  "serverUrl": "https://z.test",\n  "temper-watcher-session": "sess-9"\n}'
    )
  })

  test("a key taken away leaves every other key where it was", () => {
    const f = fakeStore('{"temper-watcher-session":"sess-1","serverUrl":"https://z.test"}')
    removeConfigKey(SESSION_STORAGE_KEY, f.store)
    expect(f.bytes()).toBe('{\n  "serverUrl": "https://z.test"\n}')
  })

  test("taking away a key the file does not hold writes nothing", () => {
    const f = fakeStore('{"serverUrl":"https://z.test"}')
    removeConfigKey(SESSION_STORAGE_KEY, f.store)
    expect(f.bytes()).toBe('{"serverUrl":"https://z.test"}')
  })

  test("taking a key from a config file that is not there makes no file", () => {
    const f = fakeStore()
    removeConfigKey(SESSION_STORAGE_KEY, f.store)
    expect([...f.files.keys()]).toEqual([])
    expect(f.made).toEqual([])
  })

  test("the keyed store gets and sets and removes through the same file", () => {
    const f = fakeStore()
    const keyed = sessionFileStore(f.store)
    expect(keyed.getItem(SESSION_STORAGE_KEY)).toBeNull()
    keyed.setItem(SESSION_STORAGE_KEY, '{"access_token":"a"}')
    expect(keyed.getItem(SESSION_STORAGE_KEY)).toBe('{"access_token":"a"}')
    keyed.removeItem(SESSION_STORAGE_KEY)
    expect(keyed.getItem(SESSION_STORAGE_KEY)).toBeNull()
    expect(f.bytes()).toBe("{}")
  })
})

describe("the store the watcher uses when the caller hands in none", () => {
  test("a config file lands readable by its owner alone", () => {
    const dir = mkdtempSync(`${SCRATCH_AT}/watcher-session-file-`)
    try {
      const store = diskConfigStore({ platform: "linux", env: { WATCHER_CONFIG_DIR: dir } })
      expect(getConfigPath(store)).toBe(`${dir}/config.json`)
      expect(loadConfig(SERVER, store)).toBeNull()

      saveConfig({ [SESSION_STORAGE_KEY]: "sess-1" }, store)
      const path = getConfigPath(store)
      expect(readFileSync(path, "utf-8")).toBe('{\n  "temper-watcher-session": "sess-1"\n}')
      expect(statSync(path).mode & 0o777).toBe(CONFIG_FILE_MODE)
      expect(loadConfig(SERVER, store)).toEqual({
        "temper-watcher-session": "sess-1",
        serverUrl: SERVER,
      })
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test("a config directory that is not there yet is made on the first save", () => {
    const parent = mkdtempSync(`${SCRATCH_AT}/watcher-session-file-`)
    const dir = `${parent}/deeper/still`
    try {
      const store = diskConfigStore({ platform: "linux", env: { WATCHER_CONFIG_DIR: dir } })
      expect(existsSync(dir)).toBe(false)
      saveConfig({ serverUrl: SERVER }, store)
      expect(readFileSync(getConfigPath(store), "utf-8")).toBe(
        '{\n  "serverUrl": "https://tempereso.com"\n}'
      )
    } finally {
      rmSync(parent, { recursive: true, force: true })
    }
  })

  test("a config file left half written by hand reads as no config", () => {
    const dir = mkdtempSync(`${SCRATCH_AT}/watcher-session-file-`)
    try {
      const store = diskConfigStore({ platform: "linux", env: { WATCHER_CONFIG_DIR: dir } })
      writeFileSync(configPathIn(dir), '{"temper-watcher-session":')
      expect(loadConfig(SERVER, store)).toBeNull()
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
