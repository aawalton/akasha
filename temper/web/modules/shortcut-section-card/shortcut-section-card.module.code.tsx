import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { Kbd, KbdGroup } from "akasha/design/interface/pattern/modules/kbd/kbd.module.code.tsx"
import type { SHORTCUT_GROUPS } from "akasha/temper/web/modules/keyboard-shortcuts-data/keyboard-shortcuts-data.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { shortcutSectionCardOr } from "akasha/temper/web/phrase/pages/shortcut-section-card-or.temper-web-phrase.ts"

interface ShortcutSectionCardProps {
  group: (typeof SHORTCUT_GROUPS)[number]
  isMac: boolean
}

export function ShortcutSectionCard({ group, isMac }: ShortcutSectionCardProps) {
  const phrase = usePhrase()
  return (
    <PanelCard
      id={`shortcuts-${group.title.toLowerCase().replace(/\s+/g, "-")}`}
      title={group.title}
    >
      <div className="flex flex-col gap-3">
        {group.shortcuts.map((shortcut) => (
          <div key={shortcut.description} className="flex items-center justify-between gap-4">
            <span className="text-secondary text-sm">{shortcut.description}</span>
            <div className="flex shrink-0 items-center gap-2">
              {shortcut.keys.map((combo, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  {i > 0 && (
                    <span className="text-tertiary text-xs">
                      {phrase(shortcutSectionCardOr.slug)}
                    </span>
                  )}
                  <KbdGroup>
                    {(isMac ? combo.mac : combo.win).map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </KbdGroup>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PanelCard>
  )
}
