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
import { useCharacterMetadata } from "akasha/temper/web/modules/use-character/use-character.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { buildInfoPanelCardBuildName } from "akasha/temper/web/phrase/pages/build-info-panel-card-build-name.temper-web-phrase.ts"
import { buildInfoPanelCardBuildNamePlaceholder } from "akasha/temper/web/phrase/pages/build-info-panel-card-build-name-placeholder.temper-web-phrase.ts"
import { buildInfoPanelCardCharacter } from "akasha/temper/web/phrase/pages/build-info-panel-card-character.temper-web-phrase.ts"
import { buildInfoPanelCardCharacterPlaceholder } from "akasha/temper/web/phrase/pages/build-info-panel-card-character-placeholder.temper-web-phrase.ts"
import { buildInfoPanelCardPrivate } from "akasha/temper/web/phrase/pages/build-info-panel-card-private.temper-web-phrase.ts"
import { buildInfoPanelCardPublic } from "akasha/temper/web/phrase/pages/build-info-panel-card-public.temper-web-phrase.ts"
import { buildInfoPanelCardTitle } from "akasha/temper/web/phrase/pages/build-info-panel-card-title.temper-web-phrase.ts"
import { buildInfoPanelCardUnlisted } from "akasha/temper/web/phrase/pages/build-info-panel-card-unlisted.temper-web-phrase.ts"
import { buildInfoPanelCardVisibility } from "akasha/temper/web/phrase/pages/build-info-panel-card-visibility.temper-web-phrase.ts"
import { useEffect, useState } from "react"

interface BuildInfoPanelCardProps {
  buildName: string
  character: { name: string }
  onUpdateMeta: (updates: { name?: string }) => void
  onUpdateCharacter: (updates: { name?: string }) => void
  className?: string
  readOnly?: boolean
  collapseProtected?: boolean
}

export function BuildInfoPanelCard({
  buildName,
  character,
  onUpdateMeta,
  onUpdateCharacter,
  className,
  readOnly,
  collapseProtected,
}: BuildInfoPanelCardProps) {
  const surface = useSurface()
  const phrase = usePhrase()
  const { visibility, isOwner, setVisibility, updateMeta } = useCharacterMetadata()
  const nameReadOnly = !isOwner

  const [draftName, setDraftName] = useState(buildName)
  useEffect(() => {
    setDraftName(buildName)
  }, [buildName])

  return (
    <InputPanelCard
      id="build-info"
      collapsible={true}
      collapseProtected={collapseProtected}
      title={phrase(buildInfoPanelCardTitle.slug)}
      className={className}
    >
      <InputPanelCard.Row label={phrase(buildInfoPanelCardBuildName.slug)}>
        <Input
          placeholder={phrase(buildInfoPanelCardBuildNamePlaceholder.slug)}
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={() => {
            if (draftName !== buildName) onUpdateMeta({ name: draftName })
          }}
          className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
          readOnly={nameReadOnly}
        />
      </InputPanelCard.Row>
      <InputPanelCard.Row label={phrase(buildInfoPanelCardCharacter.slug)}>
        {}
        <Input
          placeholder={phrase(buildInfoPanelCardCharacterPlaceholder.slug)}
          value={character.name}
          onChange={(e) => onUpdateCharacter({ name: e.target.value })}
          onBlur={(e) => updateMeta({ characterName: e.target.value })}
          className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
          readOnly={readOnly}
        />
      </InputPanelCard.Row>
      {visibility !== "live" && visibility !== "target" && (
        <InputPanelCard.Row label={phrase(buildInfoPanelCardVisibility.slug)}>
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
              <SelectItem value="private">{phrase(buildInfoPanelCardPrivate.slug)}</SelectItem>
              <SelectItem value="unlisted">{phrase(buildInfoPanelCardUnlisted.slug)}</SelectItem>
              <SelectItem value="public">{phrase(buildInfoPanelCardPublic.slug)}</SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
      )}
    </InputPanelCard>
  )
}
