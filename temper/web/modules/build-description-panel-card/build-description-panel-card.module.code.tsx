"use client"

import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useSurface } from "akasha/design/interface/primitive/modules/surface-provider/surface-provider.module.code.tsx"
import { TextAreaPanelCard } from "akasha/temper/web/modules/text-area-panel-card/text-area-panel-card.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { buildDescriptionPanelCardPlaceholder } from "akasha/temper/web/phrase/pages/build-description-panel-card-placeholder.temper-web-phrase.ts"
import { buildDescriptionPanelCardTitle } from "akasha/temper/web/phrase/pages/build-description-panel-card-title.temper-web-phrase.ts"

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
  const phrase = usePhrase()
  return (
    <TextAreaPanelCard
      id="build-description"
      title={phrase(buildDescriptionPanelCardTitle.slug)}
      placeholder={phrase(buildDescriptionPanelCardPlaceholder.slug)}
      value={buildDescription}
      onChange={(value) => onUpdateMeta({ description: value })}
      collapsible
      className={className}
      textareaClassName={surfaceClass(surface + 1)}
      readOnly={readOnly}
    />
  )
}
