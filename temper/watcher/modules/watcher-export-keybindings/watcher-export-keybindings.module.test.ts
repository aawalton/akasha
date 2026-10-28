import { expect, test } from "bun:test"
import { asPage } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { keybinderCaptureIn } from "akasha/temper/addon/shared/temper-keybindings/modules/keybinder-capture-reading/keybinder-capture-reading.module.code.ts"
import { autorun } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/pages/autorun.temper-keybinding.ts"
import { porttofriendshouseFavMyhouseInside1 as home } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/pages/porttofriendshouse-fav-myhouse-inside-1.temper-keybinding.ts"
import { toggleFullscreen } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/pages/toggle-fullscreen.temper-keybinding.ts"
import { toggleWalk } from "akasha/temper/addon/shared/temper-keybindings/temper-keybinding/pages/toggle-walk.temper-keybinding.ts"
import { parseLuaSavedVariablesFile } from "akasha/temper/eso/saved-variable/modules/lua-parser/lua-parser.module.code.ts"
import { serializeCoreConfigFile } from "akasha/temper/watcher/modules/watcher-config-file/watcher-config-file.module.code.ts"
import { keybindingsConfigFromPages } from "akasha/temper/watcher/modules/watcher-export-keybindings/watcher-export-keybindings.module.code.ts"

const PAGES = [home, toggleFullscreen, autorun, toggleWalk].map((one) => asPage(one))

const collect = async () => [...PAGES]

function slotsOf(slots: Readonly<Record<number, readonly number[]>>): string {
  const lines = Object.entries(slots).map(
    ([slot, [keyCode, mod2]]) =>
      `[${slot}] = { ["keyCode"] = ${keyCode}, ["mod1"] = 0, ["mod2"] = ${mod2}, ["mod3"] = 0, ["mod4"] = 0, },`
  )
  return `{ ${lines.join(" ")} },`
}

const SAVED = `TemperKeybinder_SavedVariables =
{
    ["Default"] = { ["$Machine"] = { ["$UserProfileWide"] = { ["Keybindings"] = {
        ["${home.key}"] = ${slotsOf({ 4: [0, 0], 1: [17, 0], 2: [0, 0], 3: [0, 0] })}
        ["${toggleFullscreen.key}"] = ${slotsOf({ 4: [0, 0], 1: [3, 5], 2: [0, 0], 3: [0, 0] })}
        ["${autorun.key}"] = ${slotsOf({ 4: [0, 0], 1: [0, 0], 2: [68, 0], 3: [76, 0] })}
        ["${toggleWalk.key}"] = ${slotsOf({ 4: [0, 0], 1: [0, 0], 2: [0, 0], 3: [0, 0] })}
    }, }, }, },
}
`

test("the Home key's page is exported as the game's code for Home in the first slot", async () => {
  const config = await keybindingsConfigFromPages(collect)
  expect(config[home.key]?.bindings[0]).toEqual({ keyCode: 17, mod1: 0, mod2: 0, mod3: 0, mod4: 0 })
  expect(config[home.key]?.shared).toBe(true)
})

test("the config the watcher writes reproduces the saved bindings slot for slot", async () => {
  const file = serializeCoreConfigFile({
    hudLayout: { docks: {}, panels: [] },
    keybindings: await keybindingsConfigFromPages(collect),
  })
  const written = parseLuaSavedVariablesFile(file, "TemperConfig")["keybindings"] as Record<
    string,
    { readonly bindings: unknown }
  >
  const saved = keybinderCaptureIn(SAVED)?.shared ?? {}
  expect(Object.keys(written).sort()).toEqual(Object.keys(saved).sort())
  for (const [action, slots] of Object.entries(saved)) {
    expect(written[action]?.bindings).toEqual(slots)
  }
})

test("a keybinding page the shape refuses stops the export", async () => {
  const keyless = async () => [asPage({ id: "keybinding-1", shared: true })]
  await expect(keybindingsConfigFromPages(keyless)).rejects.toThrow()
})
