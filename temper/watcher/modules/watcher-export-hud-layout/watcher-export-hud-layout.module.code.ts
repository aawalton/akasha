import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  numberAt,
  slugAt,
  textAt,
  textsAt,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { serializeCoreConfigFile } from "akasha/temper/watcher/modules/watcher-config-file/watcher-config-file.module.code.ts"
import {
  type SideFileDisk,
  writeSideFileIfChanged,
} from "akasha/temper/watcher/modules/watcher-side-file/watcher-side-file.module.code.ts"

export const DOCK_PAGE_TYPE_SLUG = "temper-hud-dock"

export const PANEL_PAGE_TYPE_SLUG = "temper-hud-panel"

const PAGES_PER_READ = 100

interface HudLayoutDock {
  readonly gap: number
}

interface HudLayoutPanel {
  readonly key: string
  readonly dock: string
  readonly displayOrder: number
  readonly inputModes: readonly string[]
  readonly neverMoves: boolean
  readonly measuredBy?: string
}

interface HudLayout {
  readonly docks: Readonly<Record<string, HudLayoutDock>>
  readonly panels: readonly HudLayoutPanel[]
}

type PageCollect = typeof collectPages

export interface ExportHudLayoutSeams {
  readonly collect?: PageCollect
  readonly disk?: SideFileDisk
}

function stated<T>(held: T | null, page: Page, key: string): T {
  if (held === null) throw new Error(`the HUD page ${page.id} states no ${key}`)
  return held
}

function inputModesOf(page: Page): readonly string[] {
  const modes = textsAt(page, "inputModes")
  return stated(modes === null || modes.length === 0 ? null : modes, page, "inputModes")
}

function panelOf(page: Page): HudLayoutPanel {
  const measuredBy = textAt(page, "measuredBy")
  return {
    key: stated(textAt(page, "key"), page, "key"),
    dock: stated(slugAt(page, "dock"), page, "dock"),
    displayOrder: stated(numberAt(page, "displayOrder"), page, "displayOrder"),
    inputModes: inputModesOf(page),
    neverMoves: page["neverMoves"] === true,
    ...(measuredBy === null ? {} : { measuredBy }),
  }
}

function byDockThenDisplayOrder(a: HudLayoutPanel, b: HudLayoutPanel): number {
  if (a.dock !== b.dock) return a.dock < b.dock ? -1 : 1
  if (a.displayOrder !== b.displayOrder) return a.displayOrder - b.displayOrder
  return a.key < b.key ? -1 : a.key > b.key ? 1 : 0
}

export function hudLayoutOf(docks: readonly Page[], panels: readonly Page[]): HudLayout {
  const gaps: Record<string, HudLayoutDock> = {}
  for (const dock of docks) {
    gaps[stated(textAt(dock, "slug"), dock, "slug")] = {
      gap: stated(numberAt(dock, "gap"), dock, "gap"),
    }
  }
  return { docks: gaps, panels: panels.map(panelOf).sort(byDockThenDisplayOrder) }
}

export async function coreConfigFromPages(collect: PageCollect = collectPages): Promise<string> {
  const [docks, panels] = await Promise.all([
    collect({ pageTypeSlug: DOCK_PAGE_TYPE_SLUG, pageSize: PAGES_PER_READ }),
    collect({ pageTypeSlug: PANEL_PAGE_TYPE_SLUG, pageSize: PAGES_PER_READ }),
  ])
  return serializeCoreConfigFile({ hudLayout: hudLayoutOf(docks, panels) })
}

export async function runExportHudLayout(
  coreConfigPath: string | undefined,
  seams: ExportHudLayoutSeams = {}
): Promise<string | null> {
  if (coreConfigPath === undefined) return null
  const content = await coreConfigFromPages(seams.collect)
  return writeSideFileIfChanged(coreConfigPath, content, seams.disk)
}
