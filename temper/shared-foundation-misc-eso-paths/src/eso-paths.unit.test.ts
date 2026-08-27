import { describe, expect, test } from "bun:test"
import {
  addonUpstreamDir,
  esoLiveDirCandidates,
  esouiDir,
  esouiDocPath,
  esouiSourceDir,
  watcherConfigDir,
  watcherLogDir,
} from "./eso-paths"

const LINUX_HOME = "/home/walton"
const WIN_PROFILE = "C:/Users/aawal"

const linux = { platform: "linux" as const, env: { HOME: LINUX_HOME } }
const win = { platform: "win32" as const, env: { USERPROFILE: WIN_PROFILE } }

describe("esoLiveDirCandidates", () => {
  test("linux offers exactly one candidate — the Steam Proton prefix (appid 306130)", () => {
    expect(esoLiveDirCandidates(linux)).toEqual([
      `${LINUX_HOME}/.steam/steam/steamapps/compatdata/306130/pfx/drive_c/users/steamuser/Documents/Elder Scrolls Online/live`,
    ])
  })

  test("windows offers two candidates, OneDrive-redirected Documents FIRST", () => {
    expect(esoLiveDirCandidates(win)).toEqual([
      `${WIN_PROFILE}/OneDrive/Documents/Elder Scrolls Online/live`,
      `${WIN_PROFILE}/Documents/Elder Scrolls Online/live`,
    ])
  })

  test("the windows order matches the watcher tray's Rust probe: OneDrive is tried before plain Documents", () => {
    const [first, second] = esoLiveDirCandidates(win)
    expect(first).toContain("/OneDrive/")
    expect(second).not.toContain("/OneDrive/")
  })

  test("ESO_LIVE_DIR override collapses every platform to a single candidate", () => {
    const override = "/mnt/games/eso/live"
    expect(
      esoLiveDirCandidates({ platform: "linux", env: { HOME: LINUX_HOME, ESO_LIVE_DIR: override } })
    ).toEqual([override])
    expect(
      esoLiveDirCandidates({
        platform: "win32",
        env: { USERPROFILE: WIN_PROFILE, ESO_LIVE_DIR: override },
      })
    ).toEqual([override])
  })
})

describe("esoui peer-clone paths", () => {
  test("esouiDir linux defaults to $HOME/esoui", () => {
    expect(esouiDir(linux)).toBe(`${LINUX_HOME}/esoui`)
  })

  test("esouiDir windows uses USERPROFILE", () => {
    expect(esouiDir(win)).toBe(`${WIN_PROFILE}/esoui`)
  })

  test("ESOUI_SRC_DIR override wins on every platform", () => {
    const override = "/mnt/games/esoui"
    expect(
      esouiDir({ platform: "linux", env: { HOME: LINUX_HOME, ESOUI_SRC_DIR: override } })
    ).toBe(override)
    expect(
      esouiDir({ platform: "win32", env: { USERPROFILE: WIN_PROFILE, ESOUI_SRC_DIR: override } })
    ).toBe(override)
  })

  test("esouiSourceDir / esouiDocPath derive from the clone dir", () => {
    expect(esouiSourceDir(linux)).toBe(`${esouiDir(linux)}/esoui`)
    expect(esouiDocPath(linux)).toBe(`${esouiDir(linux)}/ESOUIDocumentation.txt`)
  })
})

describe("addonUpstreamDir", () => {
  test("linux defaults to $HOME/eso-upstream", () => {
    expect(addonUpstreamDir(linux)).toBe(`${LINUX_HOME}/eso-upstream`)
  })

  test("windows uses USERPROFILE", () => {
    expect(addonUpstreamDir(win)).toBe(`${WIN_PROFILE}/eso-upstream`)
  })

  test("ESO_UPSTREAM_DIR override wins", () => {
    expect(
      addonUpstreamDir({
        platform: "linux",
        env: { HOME: LINUX_HOME, ESO_UPSTREAM_DIR: "/mnt/up" },
      })
    ).toBe("/mnt/up")
  })

  test("stays disjoint from the live install it must never be confused with", () => {
    for (const candidate of esoLiveDirCandidates(linux)) {
      expect(addonUpstreamDir(linux).startsWith(candidate)).toBe(false)
    }
  })
})

describe("watcherLogDir", () => {
  test("linux defaults to XDG state home", () => {
    expect(watcherLogDir(linux)).toBe(`${LINUX_HOME}/.local/state/temper-watcher`)
  })

  test("linux honors XDG_STATE_HOME", () => {
    expect(
      watcherLogDir({ platform: "linux", env: { HOME: LINUX_HOME, XDG_STATE_HOME: "/run/state" } })
    ).toBe("/run/state/temper-watcher")
  })

  test("windows uses LOCALAPPDATA", () => {
    expect(
      watcherLogDir({ platform: "win32", env: { LOCALAPPDATA: "C:/Users/aawal/AppData/Local" } })
    ).toBe("C:/Users/aawal/AppData/Local/TemperWatcher")
  })

  test("WATCHER_LOG_DIR override wins", () => {
    expect(
      watcherLogDir({ platform: "linux", env: { HOME: LINUX_HOME, WATCHER_LOG_DIR: "/tmp/wl" } })
    ).toBe("/tmp/wl")
  })
})

describe("watcherConfigDir", () => {
  test("linux defaults to XDG config home", () => {
    expect(watcherConfigDir(linux)).toBe(`${LINUX_HOME}/.config/temper`)
  })

  test("linux honors XDG_CONFIG_HOME", () => {
    expect(
      watcherConfigDir({ platform: "linux", env: { HOME: LINUX_HOME, XDG_CONFIG_HOME: "/cfg" } })
    ).toBe("/cfg/temper")
  })

  test("windows uses APPDATA", () => {
    expect(
      watcherConfigDir({ platform: "win32", env: { APPDATA: "C:/Users/aawal/AppData/Roaming" } })
    ).toBe("C:/Users/aawal/AppData/Roaming/temper")
  })
})
