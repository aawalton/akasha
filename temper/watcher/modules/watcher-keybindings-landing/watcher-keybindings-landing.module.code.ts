import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import {
  keybinderCaptureIn,
  landedKeybindings,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinder-capture-reading/keybinder-capture-reading.module.code.ts"
import {
  type Held,
  heldOf,
  KEYBINDING_PAGE_TYPE_SLUG,
  type Keybinding,
  keybindingOf,
  keybindingPagePath,
  keybindingPageText,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-pages/keybinding-pages.module.code.ts"
import {
  landOverAttempts,
  PAGE_LANDING_WRITER,
  type ReadFiles,
  readingFor,
  type Tried,
  triedFrom,
  type Waiting,
  type WriteFiles,
  writingFor,
} from "akasha/temper/watcher/modules/watcher-page-landing/watcher-page-landing.module.code.ts"

const PAGES_PER_READ = 100

const UNATTEMPTED = "no attempt to land the keybinder's capture was made"

interface KeybindingsLandingDeps {
  readonly collect?: typeof collectPages
  readonly read?: ReadFiles
  readonly write?: WriteFiles
  readonly waiting?: Waiting
  readonly mint?: () => string
  readonly now?: () => number
}

export function keybindingsLandedMessage(count: number): string {
  return `temper: ${String(count)} keybinding page(s) landed from the keybinder's capture`
}

interface HeldPages {
  readonly keybindings: ReadonlyMap<string, Keybinding>
  readonly kept: ReadonlyMap<string, Held>
}

async function heldPagesOf(collect: typeof collectPages): Promise<HeldPages> {
  const pages = await collect({ pageTypeSlug: KEYBINDING_PAGE_TYPE_SLUG, pageSize: PAGES_PER_READ })
  const keybindings = new Map<string, Keybinding>()
  const kept = new Map<string, Held>()
  for (const page of pages) {
    const one = keybindingOf(page)
    keybindings.set(one.key, one)
    kept.set(one.key, heldOf(page))
  }
  return { keybindings, kept }
}

export async function runImportKeybindings(
  content: string,
  deps: KeybindingsLandingDeps = {}
): Promise<number> {
  const capture = keybinderCaptureIn(content)
  if (capture === null) return 0
  const collect = deps.collect ?? collectPages
  const read = readingFor(deps)
  const write = writingFor(deps)
  const mint = deps.mint ?? (() => Bun.randomUUIDv7())
  const now = deps.now ?? Date.now
  let written = 0
  const tryOnce = async (): Promise<Tried> => {
    const held = await heldPagesOf(collect)
    const at = new Date(now()).toISOString()
    const landed = landedKeybindings(capture, held.keybindings, at)
    const puts = landed.map((one) => {
      const was = held.kept.get(one.key)
      const pageHeld = { ...was, id: was?.id ?? mint(), updatedAt: at }
      return { path: keybindingPagePath(one.key), content: keybindingPageText(one, pageHeld) }
    })
    written = puts.length
    if (puts.length === 0) return { outcome: "already", at: "" }
    const found = await read(puts.map((one) => one.path))
    if (!found.ok) return { outcome: "again", why: found.why }
    const message = keybindingsLandedMessage(puts.length)
    return triedFrom(
      await write(puts, PAGE_LANDING_WRITER, message, undefined, undefined, found.at)
    )
  }
  const landed = await landOverAttempts(UNATTEMPTED, tryOnce, { waiting: deps.waiting })
  if (landed.outcome === "refused") {
    throw new Error(`the keybinder's capture did not land on the keybinding pages — ${landed.why}`)
  }
  return written
}
