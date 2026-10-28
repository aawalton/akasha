import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import {
  KEYBINDING_PAGE_TYPE_SLUG,
  type KeybindingConfigEntry,
  keybindingOf,
  keybindingsConfigOf,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-pages/keybinding-pages.module.code.ts"

const PAGES_PER_READ = 100

export async function keybindingsConfigFromPages(
  collect: typeof collectPages = collectPages
): Promise<Record<string, KeybindingConfigEntry>> {
  const pages = await collect({ pageTypeSlug: KEYBINDING_PAGE_TYPE_SLUG, pageSize: PAGES_PER_READ })
  return keybindingsConfigOf(pages.map(keybindingOf))
}
