"use client"

import { InputPanelCard } from "akasha/design/interfaces/patterns/input-panel-card/input-panel-card.module.code.tsx"
import { Input } from "akasha/design/interfaces/primitives/input/input.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interfaces/primitives/select-control/select-control.module.code.tsx"
import { surfaceClass } from "akasha/design/interfaces/primitives/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interfaces/primitives/surface-provider/surface-provider.module.code.tsx"
import { toCharacterVisibility } from "akasha/temper/character-build/build-types/build-types.module.code.ts"
import { useCharacterMetadata } from "akasha/temper/web/use-character/use-character.module.code.ts"
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
      title="Build Info"
      className={className}
    >
      <InputPanelCard.Row label="Build Name">
        <Input
          placeholder="Build name..."
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={() => {
            if (draftName !== buildName) onUpdateMeta({ name: draftName })
          }}
          className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
          readOnly={nameReadOnly}
        />
      </InputPanelCard.Row>
      <InputPanelCard.Row label="Character">
        {}
        <Input
          placeholder="Character name..."
          value={character.name}
          onChange={(e) => onUpdateCharacter({ name: e.target.value })}
          onBlur={(e) => updateMeta({ characterName: e.target.value })}
          className={`w-full min-w-0 max-w-[240px] ${surfaceClass(surface + 1)}`}
          readOnly={readOnly}
        />
      </InputPanelCard.Row>
      {visibility !== "live" && visibility !== "target" && (
        <InputPanelCard.Row label="Visibility">
          <Select
            value={visibility}
            onValueChange={(v) => {
              const parsed = toCharacterVisibility(v)
              if (parsed !== "live" && parsed !== "target") setVisibility(parsed)
            }}
            disabled={readOnly}
          >
            <SelectTrigger className={`w-full max-w-[240px] ${surfaceClass(surface + 1)}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="unlisted">Unlisted</SelectItem>
              <SelectItem value="public">Public</SelectItem>
            </SelectContent>
          </Select>
        </InputPanelCard.Row>
      )}
    </InputPanelCard>
  )
}
