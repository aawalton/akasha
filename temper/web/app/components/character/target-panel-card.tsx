"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import {
  type TargetArmorId,
  targetArmor,
} from "@temper/game-characters-character/target-armor-data"
import { InputPanelCard } from "@shared/design-patterns/components/input-panel-card"

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
  return (
    <InputPanelCard id="target" collapsible={true} title="Target" className={className}>
      <InputPanelCard.Row label="Target Armor">
        <Select
          value={target.armor}
          onValueChange={(v) => {
            if (targetArmor.has(v)) onUpdate({ armor: v })
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {targetArmor.list.map((ta) => (
              <SelectItem key={ta.id} value={ta.id}>
                {ta.name} ({ta.armor})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
      <InputPanelCard.Row label="Target Health">
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
      <InputPanelCard.Row label="Target Count">
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
