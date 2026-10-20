"use client"

import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { useCompanionMetadata } from "akasha/temper/web/modules/use-companion/use-companion.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { companionInfoPanelCardBuildInfo } from "akasha/temper/web/phrase/pages/companion-info-panel-card-build-info.temper-web-phrase.ts"
import { companionInfoPanelCardBuildName } from "akasha/temper/web/phrase/pages/companion-info-panel-card-build-name.temper-web-phrase.ts"
import { companionInfoPanelCardBuildNamePlaceholder } from "akasha/temper/web/phrase/pages/companion-info-panel-card-build-name-placeholder.temper-web-phrase.ts"
import { useEffect, useState } from "react"

interface CompanionInfoPanelCardProps {
  buildName: string
  onUpdateMeta: (updates: { name?: string }) => void
  className?: string
  collapseProtected?: boolean
}

export function CompanionInfoPanelCard({
  buildName,
  onUpdateMeta,
  className,
  collapseProtected,
}: CompanionInfoPanelCardProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  const { isOwner } = useCompanionMetadata()
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
    </InputPanelCard>
  )
}
