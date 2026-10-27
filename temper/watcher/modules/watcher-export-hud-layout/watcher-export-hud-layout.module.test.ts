import { expect, test } from "bun:test"
import { asPage, type Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { bottom } from "akasha/temper/addon/shared/hud-component/temper-hud-dock/pages/bottom.temper-hud-dock.ts"
import { top } from "akasha/temper/addon/shared/hud-component/temper-hud-dock/pages/top.temper-hud-dock.ts"
import {
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

const ATTRIBUTES = asPage({
  id: "panel-1",
  key: "ZO_PlayerAttribute",
  dock: AT_BOTTOM,
  displayOrder: 2,
})

const ACTION_BAR = asPage({
  id: "panel-2",
  key: "ZO_ActionBar1",
  dock: AT_BOTTOM,
  displayOrder: 1,
  neverMoves: true,
})

const COMPASS = asPage({ id: "panel-3", key: "ZO_CompassFrame", dock: AT_TOP, displayOrder: 1 })

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

test("each panel states its key, dock, display order, and whether it never moves", () => {
  expect(hudLayoutOf([], [ATTRIBUTES, ACTION_BAR]).panels).toEqual([
    { key: "ZO_ActionBar1", dock: bottom.slug, displayOrder: 1, neverMoves: true },
    { key: "ZO_PlayerAttribute", dock: bottom.slug, displayOrder: 2, neverMoves: false },
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
