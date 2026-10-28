import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { parsedIn } from "akasha/page/modules/value/page-value.module.code.ts"
import { keybindingOf } from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-pages/keybinding-pages.module.code.ts"
import { porttofriendshouseFavMyhouseInside1 as home } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/pages/porttofriendshouse-fav-myhouse-inside-1.temper-keybinding.ts"
import {
  keybindingsLandedMessage,
  runImportKeybindings,
} from "akasha/temper/watcher/modules/watcher-keybindings-landing/watcher-keybindings-landing.module.code.ts"
import type {
  ReadFiles,
  WriteFiles,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const PAGE_SECONDS = Math.floor(Date.parse(home.changedAt) / 1000)

function slot(keyCode: number): string {
  return `{ ["keyCode"] = ${keyCode}, ["mod1"] = 0, ["mod2"] = 0, ["mod3"] = 0, ["mod4"] = 0, }`
}

function savedWith(changes: string): string {
  return `TemperErrors_SavedVariables = {}
TemperKeybinder_SavedVariables =
{
    ["Default"] = { ["$Machine"] = { ["$UserProfileWide"] = {
        ["Keybindings"] = { ["${home.key}"] = { [1] = ${slot(17)}, }, },
        ["Changes"] = { ${changes} },
    }, }, },
}
`
}

function rebound(at: number, keyCode: number): string {
  return `["${home.key}"] = { ["at"] = ${at}, ["shared"] = true, ["layer"] = "General", ["bindings"] = { ${slot(keyCode)}, ${slot(0)}, ${slot(0)}, ${slot(0)}, }, },`
}

type Put = { readonly path: string; readonly content: string }

function store() {
  const writes: { puts: readonly Put[]; message: string; read: string | null }[] = []
  const read: ReadFiles = async (paths) => ({
    ok: true,
    at: "rev-1",
    bodies: paths.map((path) => ({ path, content: null })),
    unplaced: [],
  })
  const write: WriteFiles = async (puts, _writer, message, _fetcher, _rest, base) => {
    writes.push({ puts, message, read: base ?? null })
    return { ok: true, at: "rev-2" }
  }
  return {
    writes,
    deps: { read, write, collect: async () => [asPage(home)], mint: () => "minted" },
  }
}

test("a key Alan rebound in the game after its page changed lands on the page in one commit", async () => {
  const s = store()
  expect(await runImportKeybindings(savedWith(rebound(PAGE_SECONDS + 60, 16)), s.deps)).toBe(1)
  expect(s.writes).toHaveLength(1)
  expect(s.writes[0]?.message).toBe(keybindingsLandedMessage(1))
  expect(s.writes[0]?.read).toBe("rev-1")
  const put = s.writes[0]?.puts[0]
  expect(put?.path).toContain(`/${home.slug}.temper-keybinding.ts`)
  const landed = keybindingOf(parsedIn(put?.content ?? ""))
  expect(landed.bindings).toEqual([{ slot: 1, key: "KEY_END" }])
  expect(landed.layer).toBe("general")
  expect(put?.content).toContain(`id: "${home.id}"`)
})

test("a page changed later than the game's rebind is left as it is", async () => {
  const s = store()
  expect(await runImportKeybindings(savedWith(rebound(PAGE_SECONDS - 60, 16)), s.deps)).toBe(0)
  expect(s.writes).toHaveLength(0)
})

test("saved variables holding no keybinder capture land nothing", async () => {
  const s = store()
  expect(await runImportKeybindings("TemperErrors_SavedVariables = {}", s.deps)).toBe(0)
  expect(s.writes).toHaveLength(0)
})

test("a store refusing every write refuses the landing", async () => {
  const s = store()
  const refused: WriteFiles = async () => ({ ok: false, why: "the store said no" })
  const deps = { ...s.deps, write: refused, waiting: async () => undefined }
  await expect(
    runImportKeybindings(savedWith(rebound(PAGE_SECONDS + 60, 16)), deps)
  ).rejects.toThrow("the store said no")
})
