import { afterEach, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { addonsDir, addonsFile, esoLiveDir, savedVarsDir, savedVarsFile } from "./eso-paths-resolve"

const LINUX_HOME = "/home/walton"
const WIN_PROFILE = "C:/Users/aawal"

const ONEDRIVE_LIVE = `${WIN_PROFILE}/OneDrive/Documents/Elder Scrolls Online/live`
const PLAIN_LIVE = `${WIN_PROFILE}/Documents/Elder Scrolls Online/live`

const win = { platform: "win32" as const, env: { USERPROFILE: WIN_PROFILE } }
const linux = { platform: "linux" as const, env: { HOME: LINUX_HOME } }

function predicateFor(present: readonly string[]) {
  const probed: string[] = []
  return {
    probed,
    exists: (path: string) => {
      probed.push(path)
      return present.includes(path)
    },
  }
}

describe("win32 candidate choice (injected predicate)", () => {
  test("prefers the OneDrive-redirected tree when it exists", () => {
    const { exists } = predicateFor([ONEDRIVE_LIVE])
    expect(esoLiveDir({ ...win, exists })).toBe(ONEDRIVE_LIVE)
  })

  test("falls through to plain Documents when OneDrive is absent", () => {
    const { exists, probed } = predicateFor([PLAIN_LIVE])
    expect(esoLiveDir({ ...win, exists })).toBe(PLAIN_LIVE)
    expect(probed).toEqual([ONEDRIVE_LIVE, PLAIN_LIVE])
  })

  test("OneDrive wins when BOTH exist — the order is the contract", () => {
    const { exists } = predicateFor([ONEDRIVE_LIVE, PLAIN_LIVE])
    expect(esoLiveDir({ ...win, exists })).toBe(ONEDRIVE_LIVE)
  })

  test("throws when neither exists, naming every candidate it probed", () => {
    const { exists } = predicateFor([])
    let message = ""
    try {
      esoLiveDir({ ...win, exists })
    } catch (error) {
      message = error instanceof Error ? error.message : String(error)
    }
    expect(message).toContain(ONEDRIVE_LIVE)
    expect(message).toContain(PLAIN_LIVE)
    expect(message).toContain("ESO_LIVE_DIR")
  })

  test("never returns a candidate it could not confirm", () => {
    const { exists } = predicateFor([])
    expect(() => esoLiveDir({ ...win, exists })).toThrow()
  })
})

describe("single candidate short-circuits without touching the filesystem", () => {
  test("linux returns its one candidate and never probes", () => {
    const { exists, probed } = predicateFor([])
    expect(esoLiveDir({ ...linux, exists })).toBe(
      `${LINUX_HOME}/.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live`
    )
    expect(probed).toEqual([])
  })

  test("an ESO_LIVE_DIR override wins on win32 without probing", () => {
    const { exists, probed } = predicateFor([])
    const override = "/mnt/games/eso/live"
    expect(
      esoLiveDir({
        platform: "win32",
        env: { USERPROFILE: WIN_PROFILE, ESO_LIVE_DIR: override },
        exists,
      })
    ).toBe(override)
    expect(probed).toEqual([])
  })
})

describe("probe against a real filesystem (default predicate)", () => {
  let root = ""

  afterEach(() => {
    if (root !== "") rmSync(root, { recursive: true, force: true })
    root = ""
  })

  function profile(): { readonly platform: "win32"; readonly env: Record<string, string> } {
    root = mkdtempSync(join(tmpdir(), "eso-paths-resolve-"))
    return { platform: "win32", env: { USERPROFILE: root } }
  }

  test("picks the real OneDrive tree when it is the one on disk", () => {
    const opts = profile()
    const expected = join(root, "OneDrive/Documents/Elder Scrolls Online/live")
    mkdirSync(expected, { recursive: true })
    expect(esoLiveDir(opts)).toBe(`${root}/OneDrive/Documents/Elder Scrolls Online/live`)
  })

  test("picks the real plain-Documents tree when OneDrive is not on disk", () => {
    const opts = profile()
    mkdirSync(join(root, "Documents/Elder Scrolls Online/live"), { recursive: true })
    expect(esoLiveDir(opts)).toBe(`${root}/Documents/Elder Scrolls Online/live`)
  })

  test("throws when the profile has neither tree", () => {
    const opts = profile()
    expect(() => esoLiveDir(opts)).toThrow(/Elder Scrolls Online/)
  })

  test("a FILE named live is not accepted as the tree", () => {
    const opts = profile()
    mkdirSync(join(root, "Documents/Elder Scrolls Online"), { recursive: true })
    writeFileSync(join(root, "Documents/Elder Scrolls Online/live"), "not a directory")
    expect(() => esoLiveDir(opts)).toThrow()
  })
})

describe("savedVars + addons derive from the resolved live dir", () => {
  test("every accessor composes off the probed answer, not a guess", () => {
    const { exists } = predicateFor([ONEDRIVE_LIVE])
    const opts = { ...win, exists }
    expect(savedVarsDir(opts)).toBe(`${ONEDRIVE_LIVE}/SavedVariables`)
    expect(savedVarsFile("TemperInventory.lua", opts)).toBe(
      `${ONEDRIVE_LIVE}/SavedVariables/TemperInventory.lua`
    )
    expect(addonsDir(opts)).toBe(`${ONEDRIVE_LIVE}/AddOns`)
    expect(addonsFile("TamrielTradeCentre/PriceTableNA.lua", opts)).toBe(
      `${ONEDRIVE_LIVE}/AddOns/TamrielTradeCentre/PriceTableNA.lua`
    )
  })

  test("the derived accessors inherit the loud failure", () => {
    const { exists } = predicateFor([])
    expect(() => addonsDir({ ...win, exists })).toThrow(/ESO_LIVE_DIR/)
  })
})
