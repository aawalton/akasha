"use client"

import { useSurface } from "@shared/design-primitives/components/surface-provider"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { TextAreaPanelCard } from "@/components/ui/text-area-panel-card"

interface BuildDescriptionPanelCardProps {
  buildDescription: string
  onUpdateMeta: (updates: { description?: string }) => void
  className?: string
  readOnly?: boolean
}

export function BuildDescriptionPanelCard({
  buildDescription,
  onUpdateMeta,
  className,
  readOnly,
}: BuildDescriptionPanelCardProps) {
  const surface = useSurface()
  return (
    <TextAreaPanelCard
      id="build-description"
      title="Description"
      placeholder="Notes about this build, playstyle, rotation tips..."
      value={buildDescription}
      onChange={(value) => onUpdateMeta({ description: value })}
      collapsible
      className={className}
      textareaClassName={surfaceClass(surface + 1)}
      readOnly={readOnly}
    />
  )
}
