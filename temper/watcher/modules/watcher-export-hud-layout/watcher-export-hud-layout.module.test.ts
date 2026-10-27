import { expect, test } from "bun:test"
import { asPage, type Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { bottom } from "akasha/temper/addon/shared/hud-component/temper-hud-dock/pages/bottom.temper-hud-dock.ts"
import { top } from "akasha/temper/addon/shared/hud-component/temper-hud-dock/pages/top.temper-hud-dock.ts"
import {
  coreConfigFromPages,
  DOCK_PAGE_TYPE_SLUG,
  hudLayoutOf,
  runExportHudLayout,
} from "akasha/temper/watcher/modules/watcher-export-hud-layout/watcher-export-hud-layout.module.code.ts"
import { held } from "akasha/temper/watcher/modules/watcher-export-mined-uploaded/watcher-export-mined-uploaded.module.test-fixtures.ts"

const PATH = "/addons/Temper/TemperConfig.lua"

const BOTTOM = asPage(bottom)

const TOP = asPage(top)

const AT_BOTTOM = `${DOCK_PAGE_TYPE_SLUG}/${bottom.slug}`

const AT_TOP = `${DOCK_PAGE_TYPE_SLUG}/${top.slug}`

const KEYBOARD = ["keyboard"]

const ATTRIBUTES = asPage({
  id: "panel-1",
  key: "ZO_PlayerAttribute",
  dock: AT_BOTTOM,
  displayOrder: 2,
  inputModes: KEYBOARD,
})

const ACTION_BAR = asPage({
  id: "panel-2",
  key: "ZO_ActionBar1",
  dock: AT_BOTTOM,
  displayOrder: 1,
  inputModes: KEYBOARD,
  neverMoves: true,
})

const COMPASS = asPage({
  id: "panel-3",
  key: "ZO_CompassFrame",
  dock: AT_TOP,
  displayOrder: 1,
  inputModes: KEYBOARD,
})

function collecting(docks: readonly Page[], panels: readonly Page[]) {
  return async (args: { pageTypeSlug?: string }) =>
    args.pageTypeSlug === DOCK_PAGE_TYPE_SLUG ? [...docks] : [...panels]
}

test("each dock is keyed by its slug and states its gap", () => {
  expect(hudLayoutOf([BOTTOM, TOP], []).docks).toEqual({
    [bottom.slug]: { gap: bottom.gap },
    [top.slug]: { gap: top.gap },
  })
})

test("each panel states its key, dock, display order, input modes, and whether it never moves", () => {
  expect(hudLayoutOf([], [ATTRIBUTES, ACTION_BAR]).panels).toEqual([
    {
      key: "ZO_ActionBar1",
      dock: bottom.slug,
      displayOrder: 1,
      inputModes: KEYBOARD,
      neverMoves: true,
    },
    {
      key: "ZO_PlayerAttribute",
      dock: bottom.slug,
      displayOrder: 2,
      inputModes: KEYBOARD,
      neverMoves: false,
    },
  ])
})

test("a panel placed in both input modes states both", () => {
  const both = asPage({
    id: "panel-6",
    key: "ZO_CompassFrame",
    dock: AT_TOP,
    displayOrder: 1,
    inputModes: ["keyboard", "gamepad"],
  })
  expect(hudLayoutOf([], [both]).panels[0]?.inputModes).toEqual(["keyboard", "gamepad"])
})

test("a panel stating no input mode is refused", () => {
  const modeless = asPage({ id: "panel-7", key: "ZO_CompassFrame", dock: AT_TOP, displayOrder: 1 })
  expect(() => hudLayoutOf([], [modeless])).toThrow("the HUD page panel-7 states no inputModes")
  const emptied = asPage({ ...modeless, id: "panel-8", inputModes: [] })
  expect(() => hudLayoutOf([], [emptied])).toThrow("the HUD page panel-8 states no inputModes")
})

test("a panel measured by another control states that control, and no other panel does", () => {
  const trackers = asPage({
    id: "panel-5",
    key: "ZO_HUDTrackers",
    dock: AT_TOP,
    displayOrder: 2,
    inputModes: KEYBOARD,
    measuredBy: "ZO_HUDTrackersScrollContainerScrollChild",
  })
  expect(hudLayoutOf([], [COMPASS, trackers]).panels).toEqual([
    {
      key: "ZO_CompassFrame",
      dock: top.slug,
      displayOrder: 1,
      inputModes: KEYBOARD,
      neverMoves: false,
    },
    {
      key: "ZO_HUDTrackers",
      dock: top.slug,
      displayOrder: 2,
      inputModes: KEYBOARD,
      neverMoves: false,
      measuredBy: "ZO_HUDTrackersScrollContainerScrollChild",
    },
  ])
})

test("panels are written by dock and then by display order whatever order they were read in", () => {
  const read = hudLayoutOf([], [COMPASS, ATTRIBUTES, ACTION_BAR]).panels.map((one) => one.key)
  expect(read).toEqual(["ZO_ActionBar1", "ZO_PlayerAttribute", "ZO_CompassFrame"])
})

test("a panel stating no key is refused", () => {
  const keyless = asPage({ id: "panel-4", dock: AT_TOP, displayOrder: 1 })
  expect(() => hudLayoutOf([], [keyless])).toThrow("the HUD page panel-4 states no key")
})

test("the layout is written under TemperConfig's hudLayout", async () => {
  const h = held(undefined)
  const hash = await runExportHudLayout(PATH, {
    collect: collecting([BOTTOM], [ACTION_BAR]),
    disk: h.disk,
  })
  expect(hash).not.toBeNull()
  const written = h.content() ?? ""
  expect(written).toContain("TemperConfig =")
  expect(written).toContain('["hudLayout"] =')
  expect(written).toContain('["key"] = "ZO_ActionBar1",')
  expect(written).toContain('["displayOrder"] = 1,')
  expect(written).toContain('["neverMoves"] = true,')
  expect(written).toContain('["inputModes"] =')
  expect(written).toContain('"keyboard",')
})

test("the config built from the pages alone is the file the watcher writes", async () => {
  const h = held(undefined)
  const collect = collecting([BOTTOM, TOP], [COMPASS, ACTION_BAR])
  await runExportHudLayout(PATH, { collect, disk: h.disk })
  expect(await coreConfigFromPages(collect)).toBe(h.content() ?? "")
})

test("an unchanged layout is not written again", async () => {
  const h = held(undefined)
  const seams = { collect: collecting([BOTTOM], [ACTION_BAR]), disk: h.disk }
  await runExportHudLayout(PATH, seams)
  await runExportHudLayout(PATH, seams)
  expect(h.writes).toHaveLength(1)
})

test("no config path writes nothing and answers no hash", async () => {
  const h = held(undefined)
  const seams = { collect: collecting([BOTTOM], [ACTION_BAR]), disk: h.disk }
  expect(await runExportHudLayout(undefined, seams)).toBeNull()
  expect(h.writes).toHaveLength(0)
})
