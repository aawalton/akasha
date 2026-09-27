"use client"

import { PanelCard } from "akasha/design/interface/layout/modules/panel-card/panel-card.module.code.tsx"
import { ItemCard } from "akasha/design/interface/pattern/modules/item-card/item-card.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import type { ChampionPointId } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import {
  getCPSkillDescription,
  getCPSkillDisplayName,
} from "akasha/temper/player/character/stat/modules/extract-champion-points/extract-champion-points.module.code.ts"
import { StarSelectionDialog } from "akasha/temper/web/modules/star-selection-dialog/star-selection-dialog.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { constellationPanelCardAddStar } from "akasha/temper/web/phrase/pages/constellation-panel-card-add-star.temper-web-phrase.ts"
import { constellationPanelCardCraft } from "akasha/temper/web/phrase/pages/constellation-panel-card-craft.temper-web-phrase.ts"
import { constellationPanelCardFitness } from "akasha/temper/web/phrase/pages/constellation-panel-card-fitness.temper-web-phrase.ts"
import { constellationPanelCardNoStars } from "akasha/temper/web/phrase/pages/constellation-panel-card-no-stars.temper-web-phrase.ts"
import { constellationPanelCardRemoveStar } from "akasha/temper/web/phrase/pages/constellation-panel-card-remove-star.temper-web-phrase.ts"
import { constellationPanelCardWarfare } from "akasha/temper/web/phrase/pages/constellation-panel-card-warfare.temper-web-phrase.ts"
import { Hammer, Plus, Shield, Swords } from "lucide-react"
import { useState } from "react"

interface ConstellationPanelCardProps {
  constellation: "warfare" | "fitness" | "craft"
  slottedStars: readonly ChampionPointId[]
  onUpdate: (slottedStars: readonly ChampionPointId[]) => void
  className?: string
  readOnly?: boolean
  collapseProtected?: boolean
}

const MOST_STARS = 4

const CONSTELLATION_CONFIG = {
  warfare: {
    nameSlug: constellationPanelCardWarfare.slug,
    icon: Swords,
    noStarId: "no-warfare-star",
  },
  fitness: {
    nameSlug: constellationPanelCardFitness.slug,
    icon: Shield,
    noStarId: "no-fitness-star",
  },
  craft: {
    nameSlug: constellationPanelCardCraft.slug,
    icon: Hammer,
    noStarId: "no-craft-star",
  },
} as const satisfies Record<string, { nameSlug: string; icon: unknown; noStarId: ChampionPointId }>

export function ConstellationPanelCard({
  constellation,
  slottedStars,
  onUpdate,
  className,
  readOnly,
  collapseProtected,
}: ConstellationPanelCardProps) {
  const phrase = usePhrase()
  const [dialogOpen, setDialogOpen] = useState(false)
  const config = CONSTELLATION_CONFIG[constellation]
  const Icon = config.icon
  const noStarId = config.noStarId

  const actualStars = slottedStars.filter((id) => !id.startsWith("no-"))
  const hasEmptySlots = slottedStars.some((id) => id.startsWith("no-"))

  const handleRemoveStar = (index: number) => {
    const updated = [...slottedStars]
    updated[index] = noStarId
    onUpdate(updated)
  }

  const handleAddStar = (starId: ChampionPointId) => {
    if (starId.startsWith("no-")) {
      return
    }

    const emptyIndex = slottedStars.findIndex((id) => id.startsWith("no-"))
    if (emptyIndex !== -1 && !actualStars.includes(starId)) {
      const updated = [...slottedStars]
      updated[emptyIndex] = starId
      onUpdate(updated)
    }
  }

  return (
    <>
      <PanelCard
        id={`cp-${constellation}`}
        collapsible={true}
        collapseProtected={collapseProtected}
        title={phrase(config.nameSlug)}
        className={className}
      >
        {actualStars.length > 0 ? (
          <div className="space-y-2">
            {slottedStars.map((starId, index) => {
              if (starId.startsWith("no-")) {
                return null
              }

              const name = getCPSkillDisplayName(starId)
              const description = getCPSkillDescription(starId)

              return (
                <ItemCard
                  key={`${starId}-${index}`}
                  renderIcon={() => <Icon className="h-5 w-5" />}
                  renderContent={() => (
                    <>
                      <div className="font-medium text-sm">{name}</div>
                      <div className="line-clamp-2 text-secondary text-xs">{description}</div>
                    </>
                  )}
                  onRemove={readOnly ? undefined : () => handleRemoveStar(index)}
                  removeLabel={phrase(constellationPanelCardRemoveStar.slug, { name })}
                />
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-tertiary">
            {phrase(constellationPanelCardNoStars.slug, { count: MOST_STARS })}
          </p>
        )}

        {!readOnly && hasEmptySlots && (
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => setDialogOpen(true)}
            type="button"
          >
            <Plus className="h-4 w-4" />
            {phrase(constellationPanelCardAddStar.slug)}
          </Button>
        )}
      </PanelCard>

      {!readOnly && (
        <StarSelectionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          constellation={constellation}
          slottedStars={slottedStars}
          onSelect={handleAddStar}
        />
      )}
    </>
  )
}
