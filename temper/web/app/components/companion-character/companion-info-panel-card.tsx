"use client"

import { Input } from "@shared/design-primitives/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { toVisibility } from "@temper/game-companions-core/companion-types"
import { useEffect, useState } from "react"
import { useCompanionMetadata } from "@/components/companions/context/use-companion"
import { InputPanelCard } from "@shared/design-patterns/components/input-panel-card"

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
      {visibility !== "live" && visibility !== "target" && (
        <InputPanelCard.Row label="Visibility">
          <Select
            value={visibility}
            onValueChange={(v) => {
              const parsed = toVisibility(v)
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
