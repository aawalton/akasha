"use client"

import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import {
  type TargetArmorId,
  targetArmor,
} from "akasha/temper/player/character/source/modules/target-armors/target-armors.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { targetPanelCardArmor } from "akasha/temper/web/phrase/pages/target-panel-card-armor.temper-web-phrase.ts"
import { targetPanelCardCount } from "akasha/temper/web/phrase/pages/target-panel-card-count.temper-web-phrase.ts"
import { targetPanelCardHealth } from "akasha/temper/web/phrase/pages/target-panel-card-health.temper-web-phrase.ts"
import { targetPanelCardTitle } from "akasha/temper/web/phrase/pages/target-panel-card-title.temper-web-phrase.ts"

const TARGET_HEALTH_OPTIONS = [1, 0.75, 0.5, 0.25] as const

interface TargetPanelCardProps {
  target: {
    armor: TargetArmorId
    health: number
    targetCount: number
  }
  onUpdate: (updates: Partial<TargetPanelCardProps["target"]>) => void
  onUpdateTargetCount: (targetCount: number) => void
  className?: string
  readOnly?: boolean
}

export function TargetPanelCard({
  target,
  onUpdate,
  onUpdateTargetCount,
  className,
  readOnly,
}: TargetPanelCardProps) {
  const phrase = usePhrase()
  return (
    <InputPanelCard
      id="target"
      collapsible={true}
      title={phrase(targetPanelCardTitle.slug)}
      className={className}
    >
      <InputPanelCard.Row label={phrase(targetPanelCardArmor.slug)}>
        <Select
          value={target.armor}
          onValueChange={(v) => {
            if (targetArmor().has(v)) onUpdate({ armor: v })
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {targetArmor().list.map((ta) => (
              <SelectItem key={ta.id} value={ta.id}>
                {ta.name} ({ta.armor})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
      <InputPanelCard.Row label={phrase(targetPanelCardHealth.slug)}>
        <Select
          value={String(target.health)}
          onValueChange={(v) => onUpdate({ health: Number(v) })}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TARGET_HEALTH_OPTIONS.map((frac) => (
              <SelectItem key={frac} value={String(frac)}>
                {frac * 100}%
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
      <InputPanelCard.Row label={phrase(targetPanelCardCount.slug)}>
        <Select
          value={String(target.targetCount)}
          onValueChange={(v) => {
            const targetCount = Number(v)
            onUpdate({ targetCount })
            onUpdateTargetCount(targetCount)
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
    </InputPanelCard>
  )
}
