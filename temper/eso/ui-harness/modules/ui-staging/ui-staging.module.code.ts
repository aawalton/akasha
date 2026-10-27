import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"
import { heldNow } from "akasha/command/pages/deploy/modules/holding/deploy-holding.module.code.ts"
import { TEMPER_ADDON } from "akasha/command/pages/deploy/modules/kind-reading/deploy-kind-reading.module.code.ts"
import {
  stampIn,
  treeIn,
} from "akasha/command/pages/deploy/modules/tree-pinning/deploy-tree-pinning.module.code.ts"
import { slugsOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { capturedCatalog } from "akasha/temper/catalog/world/temper-catalog-domain/modules/catalog-capture-reading/catalog-capture-reading.module.code.ts"
import {
  esoLiveDirCandidates,
  esouiSourceDir,
} from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"
import {
  playerAnswersIn,
  playerAnswersLua,
  playerScreenIn,
} from "akasha/temper/eso/return/modules/player-answers-seeding/player-answers-seeding.module.code.ts"
import { keepGameTypefaces } from "akasha/temper/eso/ui-harness/modules/game-art/game-art.module.code.ts"
import {
  gameFiles,
  manifestEntries,
} from "akasha/temper/eso/ui-harness/modules/game-manifest/game-manifest.module.code.ts"
import { namesUnstubbedLua } from "akasha/temper/eso/ui-harness/modules/game-names/game-names.module.code.ts"
import {
  hostFilesOf,
  liveHostFileAt,
} from "akasha/temper/eso/ui-harness/modules/host-files/host-files.module.code.ts"
import {
  itemIconsLua,
  itemIdsIn,
  minedIcons,
} from "akasha/temper/eso/ui-harness/modules/item-icons-seeding/item-icons-seeding.module.code.ts"
import { PLAYED_ACCOUNT_LUA } from "akasha/temper/eso/ui-harness/modules/played-account/played-account.module.code.ts"
import { savedChunks } from "akasha/temper/eso/ui-harness/modules/saved-chunks/saved-chunks.module.code.ts"
import {
  fontsIn,
  fontsLua,
  gameFontStrings,
  gameFonts,
} from "akasha/temper/eso/ui-harness/modules/ui-fonts/ui-fonts.module.code.ts"
import type { UiHarness } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import { openUiHarness } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"
import {
  timelinesIn,
  timelinesLua,
} from "akasha/temper/eso/ui-harness/modules/ui-timelines/ui-timelines.module.code.ts"
import {
  declaredFrom,
  virtualsFrom,
} from "akasha/temper/eso/ui-harness/modules/ui-virtuals/ui-virtuals.module.code.ts"
import {
  declaredLua,
  virtualsLua,
} from "akasha/temper/eso/ui-harness/modules/ui-virtuals-lua/ui-virtuals-lua.module.code.ts"

const BUILT_UNDER = "temper/addon/build/dist"

export const MARKUP_UNDER = "temper/addon/pages"

export const MARKUP_TAIL = ".eso-interface.markup.xml"

const SAVED_UNDER = "SavedVariables"

const GAME_ADDON = "ZO_Ingame"

const PLAYER_ACTIVATED = "EVENT_PLAYER_ACTIVATED"

const ADDON_LOADED = "EVENT_ADD_ON_LOADED"

const ADDONS_LOADED = "EVENT_ADD_ONS_LOADED"

const KEYBINDINGS_LOADED = "EVENT_KEYBINDINGS_LOADED"

const FIRST_ACTIVATION = true

const ACTIVATED = "IsPlayerActivated = function() return true end"

const NOT_YET_READY = `IsPlayerActivated = function() return false end
AreSkillsInitialized = function() return false end`

const MAP_TILES = `
local firstTileOf = GetMapTileTextureForMapId
GetMapTileTexture = function(index)
  local first = firstTileOf ~= nil and firstTileOf(GetCurrentMapId()) or nil
  if type(first) ~= "string" or first == "" then return "" end
  return (string.gsub(first, "_0%.dds$", "_" .. tostring((index or 1) - 1) .. ".dds"))
end`

const ITEM_COUNTS = `
local countOf = GetSlotItemCount
GetSlotItemCount = function(slot, category)
  local held = countOf(slot, category)
  if held == nil and GetSlotType(slot, category) == ACTION_TYPE_ITEM then return 0 end
  return held
end`

const PER_CHUNK = 40

const UNPINNED = "no commit"

const SETTLING_ROUNDS = 64

export async function settled(harness: UiHarness): Promise<void> {
  try {
    await harness.settle(SETTLING_ROUNDS)
  } catch {
    return
  }
}

export function filesUnder(dir: string, tail: string, found: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const at = join(dir, name)
    if (statSync(at).isDirectory()) filesUnder(at, tail, found)
    else if (name.endsWith(tail)) found.push(at)
  }
  return found
}

type Built = { readonly bundle: string; readonly tree: string }

export function addonTreesIn(root: string): readonly string[] {
  const found: string[] = []
  for (const slug of slugsOfType(root, TEMPER_ADDON)) {
    const tree = treeIn(root, slug)
    if (tree !== null) found.push(tree)
  }
  return found
}

export function builtIn(trees: readonly string[], addon: string): Built | null {
  for (const tree of trees) {
    const bundle = join(tree, BUILT_UNDER, addon, `${addon}.lua`)
    if (existsSync(bundle)) return { bundle, tree }
  }
  return null
}

export function builtDirIn(trees: readonly string[], addon: string): string | null {
  for (const tree of trees) {
    const at = join(tree, BUILT_UNDER, addon)
    if (existsSync(join(at, `${addon}.txt`))) return at
  }
  return null
}

function builtAtCommit(tree: string): string {
  try {
    return readFileSync(stampIn(tree), "utf8").trim() || UNPINNED
  } catch {
    return UNPINNED
  }
}

function savedVariablesAt(name: string): string | null {
  for (const live of esoLiveDirCandidates()) {
    const at = join(live, SAVED_UNDER, `${name}.lua`)
    if (existsSync(at)) return at
  }
  return null
}

const ANSWERS_PER_CHUNK = 40

function playedAnswers(root: string): readonly string[] {
  const captured = capturedCatalog(root, "playerAnswerCatalog")
  const held = playerAnswersIn(captured)
  const chunks = held === null ? [] : playerAnswersLua(held, ANSWERS_PER_CHUNK)
  const screen = playerScreenIn(captured)
  if (screen === null) return chunks
  return [
    ...chunks,
    `GuiRoot.uiWidth = ${String(screen.width)} GuiRoot.uiHeight = ${String(screen.height)}`,
  ]
}

type Staged = {
  readonly harness: UiHarness
  readonly builtAt: string
  readonly templates: number
  readonly refused: readonly string[]
  readonly live: readonly string[]
}

type Loading = { readonly loaded: string[]; readonly live: string[] }

type StagingAsked = {
  readonly root: string
  readonly addon: string
  readonly alongside?: readonly string[]
  readonly savedVariables: readonly string[]
  readonly shows: readonly string[]
  readonly stages?: string
  readonly playsAs?: string
}

function documentsFor(root: string): readonly string[] {
  const esoui = esouiSourceDir()
  if (!existsSync(esoui)) {
    throw new Error(
      `the game's own interface is not checked out at ${esoui}, so no template it declares` +
        " would be here — name the checkout in `ESOUI_SRC_DIR`"
    )
  }
  const mine = join(root, MARKUP_UNDER)
  const at = [...filesUnder(esoui, ".xml"), ...filesUnder(mine, MARKUP_TAIL)]
  return at.map((one) => readFileSync(one, "utf8"))
}

type Declaring = {
  readonly virtuals: ReturnType<typeof virtualsFrom>
  readonly strings: Readonly<Record<string, string>>
}

async function declareDocument(
  harness: UiHarness,
  text: string,
  declaring: Declaring
): Promise<void> {
  const fonts = fontsIn([text], declaring.strings)
  if (Object.keys(fonts).length > 0) await harness.load(`return ${fontsLua(fonts)}`)
  const declared = declaredFrom([text], declaring.virtuals)
  for (const chunk of declaredLua(declared, Object.keys(declared), PER_CHUNK)) {
    await harness.load(`return ${chunk}`)
  }
}

const DEPENDS = /^## DependsOn:(.*)$/m

const AT_LEAST = />=.*$/

function dependenciesIn(manifest: string): readonly string[] {
  const listed = firstCapture(DEPENDS.exec(manifest)) ?? ""
  return listed
    .trim()
    .split(/\s+/)
    .map((one) => one.replace(AT_LEAST, ""))
    .filter((one) => one !== "")
}

async function loadAddon(
  harness: UiHarness,
  trees: readonly string[],
  built: string,
  addon: string,
  declaring: Declaring,
  loading: Loading
): Promise<void> {
  const loaded = loading.loaded
  if (loaded.includes(addon)) return
  const manifest = readFileSync(join(built, `${addon}.txt`), "utf8")
  for (const dependency of dependenciesIn(manifest)) {
    const beside = builtDirIn(trees, dependency)
    if (beside !== null) {
      await loadAddon(harness, trees, beside, dependency, declaring, loading)
    }
  }
  if (loaded.includes(addon)) return
  const hosted = hostFilesOf(built.slice(0, -join(BUILT_UNDER, addon).length - 1), addon)
  for (const one of manifestEntries(manifest)) {
    const live = hosted.includes(one.rel) ? liveHostFileAt(addon, one.rel) : null
    if (live !== null) loading.live.push(live)
    const at = live ?? join(built, one.rel)
    if (!existsSync(at)) continue
    const text = readFileSync(at, "utf8")
    if (one.kind === "xml") await declareDocument(harness, text, declaring)
    else if (one.rel === `${addon}.lua`) await harness.loadBundle(text)
    else await harness.load(text, one.rel)
  }
  loaded.push(addon)
}

async function raisedOrRefused(
  harness: UiHarness,
  refused: string[],
  named: string,
  event: string,
  ...args: readonly unknown[]
): Promise<void> {
  try {
    await harness.raise(event, ...args)
  } catch (thrown) {
    const why = (thrown instanceof Error ? thrown.message : String(thrown)).split("\n")[0]
    refused.push(`${named}: ${why}`)
  }
  await settled(harness)
}

const DEPLOY_WAIT_MS = 1000

const DEPLOY_WAIT_ROUNDS = 900

function addonsBeingDeployed(root: string): readonly string[] {
  const addons = new Set(slugsOfType(root, TEMPER_ADDON))
  return [...heldNow(root)].filter((slug) => addons.has(slug)).sort()
}

async function deploysSettled(root: string): Promise<void> {
  for (let round = 0; round < DEPLOY_WAIT_ROUNDS; round += 1) {
    if (addonsBeingDeployed(root).length === 0) return
    await Bun.sleep(DEPLOY_WAIT_MS)
  }
  const still = addonsBeingDeployed(root)
  if (still.length === 0) return
  throw new Error(
    `a deploy of ${still.map((slug) => `\`${slug}\``).join(", ")} is still rewriting its tree,` +
      " so no build there is whole to bring up"
  )
}

export async function stageUiHarness(asked: StagingAsked): Promise<Staged> {
  await deploysSettled(asked.root)
  const trees = addonTreesIn(asked.root)
  const found = builtIn(trees, asked.addon)
  if (found === null) {
    throw new Error(
      `\`${asked.addon}\` has no build under ${join(BUILT_UNDER, asked.addon)}, so there is` +
        ` nothing to bring up — \`akasha deploy\` builds it`
    )
  }
  const seeded: string[] = []
  for (const name of asked.savedVariables) {
    const at = savedVariablesAt(name)
    if (at === null) {
      throw new Error(
        `\`${name}\` has no saved variables on this machine, and this window is brought up from` +
          " what a player's own file holds"
      )
    }
    seeded.push(readFileSync(at, "utf8"))
  }
  const icons = itemIconsLua(await minedIcons(itemIdsIn(seeded)))
  const documents = documentsFor(asked.root)
  const virtuals = virtualsFrom(documents)
  const chunks = virtualsLua(virtuals, PER_CHUNK)
  const esoui = esouiSourceDir()
  const declaring: Declaring = { virtuals, strings: gameFontStrings(esoui) }
  await keepGameTypefaces()
  const harness = await openUiHarness()
  try {
    const templates = await harness.templates(chunks)
    await harness.load(`return ${fontsLua(gameFonts(esoui))}`)
    await harness.load(`return ${timelinesLua(timelinesIn(documents))}`)
    const refused: string[] = []
    for (const chunk of playedAnswers(asked.root)) await harness.load(chunk)
    await harness.load(MAP_TILES)
    await harness.load(ITEM_COUNTS)
    await harness.load(NOT_YET_READY)
    const files = gameFiles(esoui).map((file) => ({ ...file, text: readFileSync(file.at, "utf8") }))
    await harness.load(
      namesUnstubbedLua(files.filter((one) => one.kind === "lua").map((one) => one.text))
    )
    for (const file of files) {
      const text = file.text
      if (file.kind === "lua") {
        const named = relative(esoui, file.at)
        try {
          await harness.load(text, named)
        } catch (thrown) {
          const why = (thrown instanceof Error ? thrown.message : String(thrown)).split("\n")[0]
          refused.push(`${named}: ${why}`)
        }
        continue
      }
      await declareDocument(harness, text, declaring)
    }
    await harness.load(PLAYED_ACCOUNT_LUA)
    for (const chunk of icons) await harness.load(chunk)
    if (asked.stages !== undefined) await harness.load(asked.stages)
    const loading: Loading = { loaded: [], live: [] }
    const loaded = loading.loaded
    const near = [found.tree, ...trees.filter((one) => one !== found.tree)]
    await loadAddon(harness, near, dirname(found.bundle), asked.addon, declaring, loading)
    for (const beside of asked.alongside ?? []) {
      const at = builtDirIn(near, beside)
      if (at === null) {
        throw new Error(
          `\`${beside}\` has no build under ${join(BUILT_UNDER, beside)}, so it cannot come up` +
            ` beside \`${asked.addon}\` — \`akasha deploy\` builds it`
        )
      }
      await loadAddon(harness, near, at, beside, declaring, loading)
    }
    for (const source of seeded) {
      for (const chunk of savedChunks(source)) await harness.load(chunk)
    }
    await harness.load("return __ui_play_as()")
    if (asked.playsAs !== undefined) await harness.load(asked.playsAs)
    for (const addon of [GAME_ADDON, ...loaded]) {
      await raisedOrRefused(harness, refused, `${addon} loaded`, ADDON_LOADED, addon)
    }
    await raisedOrRefused(harness, refused, ADDONS_LOADED, ADDONS_LOADED)
    await raisedOrRefused(harness, refused, KEYBINDINGS_LOADED, KEYBINDINGS_LOADED)
    for (const name of asked.shows) {
      await harness.load(`return __ui_show(${JSON.stringify(name)})`)
    }
    await settled(harness)
    await harness.load(ACTIVATED)
    await raisedOrRefused(harness, refused, PLAYER_ACTIVATED, PLAYER_ACTIVATED, FIRST_ACTIVATION)
    return {
      harness,
      builtAt: builtAtCommit(found.tree),
      templates,
      refused,
      live: loading.live,
    }
  } catch (thrown) {
    await harness.close()
    throw thrown
  }
}
