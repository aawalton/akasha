"use client"

import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { toBuildVisibility } from "akasha/temper/player/character/build/build-support/modules/build-visibility/build-visibility.module.code.ts"
import { useCompanionMetadata } from "akasha/temper/web/modules/use-companion/use-companion.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionInfoPanelCardBuildInfo } from "akasha/temper/web/phrase/pages/companion-info-panel-card-build-info.temper-web-phrase.ts"
import { companionInfoPanelCardBuildName } from "akasha/temper/web/phrase/pages/companion-info-panel-card-build-name.temper-web-phrase.ts"
import { companionInfoPanelCardBuildNamePlaceholder } from "akasha/temper/web/phrase/pages/companion-info-panel-card-build-name-placeholder.temper-web-phrase.ts"
import { companionInfoPanelCardPrivate } from "akasha/temper/web/phrase/pages/companion-info-panel-card-private.temper-web-phrase.ts"
import { companionInfoPanelCardPublic } from "akasha/temper/web/phrase/pages/companion-info-panel-card-public.temper-web-phrase.ts"
import { companionInfoPanelCardUnlisted } from "akasha/temper/web/phrase/pages/companion-info-panel-card-unlisted.temper-web-phrase.ts"
import { companionInfoPanelCardVisibility } from "akasha/temper/web/phrase/pages/companion-info-panel-card-visibility.temper-web-phrase.ts"
import { useEffect, useState } from "react"

interface CompanionInfoPanelCardProps {
  buildName: string
  onUpdateMeta: (updates: { name?: string }) => void
  className?: string
  readOnly?: boolean
  collapseProtected?: boolean
}

export function CompanionInfoPanelCard({
  buildName,
  onUpdateMeta,
  className,
  readOnly,
  collapseProtected,
}: CompanionInfoPanelCardProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  const { visibility, isOwner, setVisibility } = useCompanionMetadata()
  const nameReadOnly = !isOwner

  const [draftName, setDraftName] = useState(buildName)
  useEffect(() => {
    setDraftName(buildName)
  }, [buildName])

  return (
    <InputPanelCard
      id="companion-build-info"
      collapsible={true}
      collapseProtected={collapseProtected}
      title={phrase(companionInfoPanelCardBuildInfo.slug)}
      className={className}
    >
      <InputPanelCard.Row label={phrase(companionInfoPanelCardBuildName.slug)}>
        <Input
          placeholder={phrase(companionInfoPanelCardBuildNamePlaceholder.slug)}
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={() => {
            if (draftName !== buildName) onUpdateMeta({ name: draftName })
          }}
          className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
          readOnly={nameReadOnly}
        />
      </InputPanelCard.Row>
      {visibility !== "live" && visibility !== "target" && (
        <InputPanelCard.Row label={phrase(companionInfoPanelCardVisibility.slug)}>
          <Select
            value={visibility}
            onValueChange={(v) => {
              const parsed = toBuildVisibility(v)
              if (parsed !== "live" && parsed !== "target") setVisibility(parsed)
            }}
            disabled={readOnly}
          >
            <SelectTrigger className={`w-full max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">{phrase(companionInfoPanelCardPrivate.slug)}</SelectItem>
              <SelectItem value="unlisted">
                {phrase(companionInfoPanelCardUnlisted.slug)}
              </SelectItem>
              <SelectItem value="public">{phrase(companionInfoPanelCardPublic.slug)}</SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
      )}
    </InputPanelCard>
  )
}
