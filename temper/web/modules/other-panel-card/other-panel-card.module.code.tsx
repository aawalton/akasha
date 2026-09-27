"use client"

import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { Switch } from "akasha/design/interface/primitive/modules/switch-control/switch-control.module.code.tsx"
import { noAlliance } from "akasha/temper/catalog/world/temper-alliance/pages/no-alliance.temper-alliance.ts"
import {
  type AllianceId,
  alliances,
} from "akasha/temper/player/character/source/modules/alliances/alliances.module.code.ts"
import {
  type EsoPlusId,
  esoPlus,
} from "akasha/temper/player/character/source/modules/eso-plus-source/eso-plus-source.module.code.ts"
import { esoPlusActive } from "akasha/temper/player/character/source/temper-eso-plus/pages/eso-plus-active.temper-eso-plus.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { otherPanelCardAlliance } from "akasha/temper/web/phrase/pages/other-panel-card-alliance.temper-web-phrase.ts"
import { otherPanelCardSelectAlliance } from "akasha/temper/web/phrase/pages/other-panel-card-select-alliance.temper-web-phrase.ts"
import { otherPanelCardTitle } from "akasha/temper/web/phrase/pages/other-panel-card-title.temper-web-phrase.ts"

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
  const phrase = usePhrase()
  const isEsoPlusActive = account.esoPlus === esoPlusActive.slug
  const noAllianceName = alliances().data[noAlliance.slug]?.name ?? ""
  const esoPlusName = esoPlus().data[esoPlusActive.slug]?.name ?? ""

  return (
    <InputPanelCard
      id="other"
      collapsible={true}
      title={phrase(otherPanelCardTitle.slug)}
      className={className}
    >
      <InputPanelCard.Row label={phrase(otherPanelCardAlliance.slug)}>
        <Select<AllianceId>
          value={alliance || noAlliance.slug}
          onValueChange={onUpdateAlliance}
          disabled={readOnly}
        >
          <SelectTrigger className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}>
            <SelectValue placeholder={phrase(otherPanelCardSelectAlliance.slug)} />
          </SelectTrigger>
          <SelectContent nullSentinel={{ value: noAlliance.slug, label: noAllianceName }}>
            {alliances()
              .list.filter((a) => a.id !== noAlliance.slug)
              .map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </InputPanelCard.Row>
      <InputPanelCard.Row label={esoPlusName}>
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
