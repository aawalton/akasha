"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@akasha/design-primitives/select-control"
import { surfaceClass } from "@akasha/design-primitives/surface-class"
import { useSurface } from "@akasha/design-primitives/surface-provider"
import { Switch } from "@akasha/design-primitives/switch-control"
import { InputPanelCard } from "akasha/design/patterns/input-panel-card/input-panel-card.module.code.tsx"
import {
  type AllianceId,
  alliances,
} from "../../character-sources/alliances/alliances.module.code.ts"
import type { EsoPlusId } from "../../character-sources/eso-plus-source/eso-plus-source.module.code.ts"

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
