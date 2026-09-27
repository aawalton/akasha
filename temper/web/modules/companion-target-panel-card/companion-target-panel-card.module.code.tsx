"use client"

import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import type { CompanionTargetHealthId } from "akasha/temper/catalog/companion/companions-core/modules/companion-types/companion-types.module.code.ts"
import {
  type TargetArmorId,
  targetArmor,
} from "akasha/temper/player/character/source/modules/target-armors/target-armors.module.code.ts"
import { useCompanionMetadata } from "akasha/temper/web/modules/use-companion/use-companion.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionTargetPanelCardExecuteHealth } from "akasha/temper/web/phrase/pages/companion-target-panel-card-execute-health.temper-web-phrase.ts"
import { companionTargetPanelCardFullHealth } from "akasha/temper/web/phrase/pages/companion-target-panel-card-full-health.temper-web-phrase.ts"
import { companionTargetPanelCardTargetArmor } from "akasha/temper/web/phrase/pages/companion-target-panel-card-target-armor.temper-web-phrase.ts"
import { companionTargetPanelCardTargetCount } from "akasha/temper/web/phrase/pages/companion-target-panel-card-target-count.temper-web-phrase.ts"
import { companionTargetPanelCardTargetHealth } from "akasha/temper/web/phrase/pages/companion-target-panel-card-target-health.temper-web-phrase.ts"
import { companionTargetPanelCardTargets } from "akasha/temper/web/phrase/pages/companion-target-panel-card-targets.temper-web-phrase.ts"

interface CompanionTargetPanelCardProps {
  target: {
    armor: TargetArmorId
    targetCount: number
    targetHealth: CompanionTargetHealthId
  }
  onUpdate: (updates: Partial<CompanionTargetPanelCardProps["target"]>) => void
  className?: string
  readOnly?: boolean
}

export function CompanionTargetPanelCard({
  target,
  onUpdate,
  className,
  readOnly,
}: CompanionTargetPanelCardProps) {
  const { updateMeta } = useCompanionMetadata()
  const phrase = usePhrase()
  return (
    <InputPanelCard
      id="companion-targets"
      collapsible={true}
      title={phrase(companionTargetPanelCardTargets.slug)}
      className={className}
    >
      <InputPanelCard.Row label={phrase(companionTargetPanelCardTargetArmor.slug)}>
        <Select
          value={target.armor}
          onValueChange={(v) => {
            if (targetArmor().has(v)) onUpdate({ armor: v })
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]" disabled={readOnly}>
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
      <InputPanelCard.Row label={phrase(companionTargetPanelCardTargetHealth.slug)}>
        <Select
          value={target.targetHealth}
          onValueChange={(v) => {
            if (v === "full" || v === "execute") onUpdate({ targetHealth: v })
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]" disabled={readOnly}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="full">{phrase(companionTargetPanelCardFullHealth.slug)}</SelectItem>
            <SelectItem value="execute">
              {phrase(companionTargetPanelCardExecuteHealth.slug)}
            </SelectItem>
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
      <InputPanelCard.Row label={phrase(companionTargetPanelCardTargetCount.slug)}>
        <Select
          value={String(target.targetCount)}
          onValueChange={(v) => {
            const targetCount = Number(v)
            onUpdate({ targetCount })
            updateMeta({ targetCount })
          }}
          disabled={readOnly}
        >
          <SelectTrigger className="w-full min-w-0 max-w-[240px]" disabled={readOnly}>
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
