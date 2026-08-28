"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { Switch } from "@shared/design-primitives/components/switch"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import type { EsoPlusId } from "@temper/game-characters-character/account/eso-plus-source"
import { type AllianceId, alliances } from "@temper/game-characters-character/alliances-data"
import { InputPanelCard } from "@shared/design-patterns/components/input-panel-card"

interface OtherPanelCardProps {
  alliance: AllianceId
  onUpdateAlliance: (alliance: AllianceId) => void
  account: {
    esoPlus: EsoPlusId
  }
  onUpdateAccount: (updates: Partial<OtherPanelCardProps["account"]>) => void
  className?: string
  readOnly?: boolean
}

export function OtherPanelCard({
  alliance,
  onUpdateAlliance,
  account,
  onUpdateAccount,
  className,
  readOnly,
}: OtherPanelCardProps) {
  const surface = useSurface()
  const isEsoPlusActive = account.esoPlus === "eso-plus-active"

  return (
    <InputPanelCard id="other" collapsible={true} title="Other" className={className}>
      <InputPanelCard.Row label="Alliance">
        <Select<AllianceId>
          value={alliance || "no-alliance"}
          onValueChange={onUpdateAlliance}
          disabled={readOnly}
        >
          <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
            <SelectValue placeholder="Select alliance" />
          </SelectTrigger>
          <SelectContent nullSentinel={{ value: "no-alliance", label: "No Alliance" }}>
            {alliances.list
              .filter((a) => a.id !== "no-alliance")
              .map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
      <InputPanelCard.Row label="ESO Plus">
        <div className="flex h-9 items-center">
          <Switch
            checked={isEsoPlusActive}
            onCheckedChange={(checked) =>
              onUpdateAccount({ esoPlus: checked ? "eso-plus-active" : "no-eso-plus" })
            }
            disabled={readOnly}
          />
        </div>
      </InputPanelCard.Row>
    </InputPanelCard>
  )
}
