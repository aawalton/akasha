"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import { InputPanelCard } from "akasha/design/interface/pattern/modules/input-panel-card/input-panel-card.module.code.tsx"
import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "akasha/design/interface/primitive/modules/popover/popover.module.code.tsx"
import {
  type PotionId,
  potions,
} from "akasha/temper/catalog/alchemy/modules/potion-source/potion-source.module.code.ts"
import type { FoodOrDrinkId } from "akasha/temper/player/character/source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"
import type { MundusId } from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"
import { FilterableSelectTrigger } from "akasha/temper/web/modules/filterable-select-trigger/filterable-select-trigger.module.code.tsx"
import {
  FoodDrinkSelectDialog,
  getFoodDrinkById,
} from "akasha/temper/web/modules/food-drink-select-dialog/food-drink-select-dialog.module.code.tsx"
import {
  getMundusById,
  MundusSelectDialog,
} from "akasha/temper/web/modules/mundus-select-dialog/mundus-select-dialog.module.code.tsx"
import { PotionSelectDialog } from "akasha/temper/web/modules/potion-select-dialog/potion-select-dialog.module.code.tsx"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { consumablesPanelCardFoodDrink } from "akasha/temper/web/phrase/pages/consumables-panel-card-food-drink.temper-web-phrase.ts"
import { consumablesPanelCardMundusStone } from "akasha/temper/web/phrase/pages/consumables-panel-card-mundus-stone.temper-web-phrase.ts"
import { consumablesPanelCardNoFoodDrink } from "akasha/temper/web/phrase/pages/consumables-panel-card-no-food-drink.temper-web-phrase.ts"
import { consumablesPanelCardNoMundus } from "akasha/temper/web/phrase/pages/consumables-panel-card-no-mundus.temper-web-phrase.ts"
import { consumablesPanelCardNoPotion } from "akasha/temper/web/phrase/pages/consumables-panel-card-no-potion.temper-web-phrase.ts"
import { consumablesPanelCardPotion } from "akasha/temper/web/phrase/pages/consumables-panel-card-potion.temper-web-phrase.ts"
import { consumablesPanelCardPotionSecond } from "akasha/temper/web/phrase/pages/consumables-panel-card-potion-second.temper-web-phrase.ts"
import { consumablesPanelCardReagentCombinations } from "akasha/temper/web/phrase/pages/consumables-panel-card-reagent-combinations.temper-web-phrase.ts"
import { consumablesPanelCardTitle } from "akasha/temper/web/phrase/pages/consumables-panel-card-title.temper-web-phrase.ts"
import { consumablesPanelCardViewReagents } from "akasha/temper/web/phrase/pages/consumables-panel-card-view-reagents.temper-web-phrase.ts"
import { Info } from "lucide-react"
import { useState } from "react"

function ReagentPopover({ potionId }: { readonly potionId: PotionId }) {
  const phrase = usePhrase()
  const potion = potions().data[potionId]
  if (!potion) return null
  if (!("reagents" in potion)) return null
  const reagents = potion.reagents
  if (!reagents || reagents.length === 0) return null
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="tertiary"
          size="icon"
          className="h-9 w-9 shrink-0"
          title={phrase(consumablesPanelCardViewReagents.slug)}
        >
          <Info className="h-4 w-4 text-tertiary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-fit">
        <div className="space-y-3">
          <h4 className="font-medium text-sm">
            {phrase(consumablesPanelCardReagentCombinations.slug)}
          </h4>
          <div className="space-y-4">
            {reagents.map((combination, index) => (
              <div key={index} className="flex gap-1">
                {combination.map((reagent) => (
                  <Badge
                    key={reagent}
                    variant="elevation"
                    className="whitespace-nowrap font-normal text-xs"
                  >
                    {reagent}
                  </Badge>
                ))}
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface ConsumablesPanelCardProps {
  consumables: {
    potion: PotionId
    potion2: PotionId
    foodOrDrink: FoodOrDrinkId
  }
  mundusStone: MundusId
  onUpdateConsumables: (updates: Partial<ConsumablesPanelCardProps["consumables"]>) => void
  onUpdateMundus: (mundusStone: MundusId) => void
  className?: string
  readOnly?: boolean
}

export function ConsumablesPanelCard({
  consumables,
  mundusStone,
  onUpdateConsumables,
  onUpdateMundus,
  className,
  readOnly,
}: ConsumablesPanelCardProps) {
  const phrase = usePhrase()
  const [isPotionDialogOpen, setIsPotionDialogOpen] = useState(false)
  const [isPotion2DialogOpen, setIsPotion2DialogOpen] = useState(false)
  const [isFoodDrinkDialogOpen, setIsFoodDrinkDialogOpen] = useState(false)
  const [isMundusDialogOpen, setIsMundusDialogOpen] = useState(false)

  const heldPotions = potions()
  const selectedPotion = heldPotions.data[consumables.potion]
  const selectedPotion2 = heldPotions.data[consumables.potion2]
  const selectedFoodDrink = getFoodDrinkById(consumables.foodOrDrink)
  const selectedMundus = getMundusById(mundusStone)

  return (
    <>
      <InputPanelCard
        id="consumables"
        collapsible={true}
        title={phrase(consumablesPanelCardTitle.slug)}
        className={className}
      >
        <InputPanelCard.Row label={phrase(consumablesPanelCardMundusStone.slug)}>
          <FilterableSelectTrigger
            onClick={() => setIsMundusDialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">
              {selectedMundus?.name ?? phrase(consumablesPanelCardNoMundus.slug)}
            </span>
          </FilterableSelectTrigger>
        </InputPanelCard.Row>

        <InputPanelCard.Row label={phrase(consumablesPanelCardFoodDrink.slug)}>
          <FilterableSelectTrigger
            onClick={() => setIsFoodDrinkDialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">
              {selectedFoodDrink?.name ?? phrase(consumablesPanelCardNoFoodDrink.slug)}
            </span>
          </FilterableSelectTrigger>
        </InputPanelCard.Row>

        <InputPanelCard.Row label={phrase(consumablesPanelCardPotion.slug)}>
          <ReagentPopover potionId={consumables.potion} />
          <FilterableSelectTrigger
            onClick={() => setIsPotionDialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">
              {selectedPotion?.name ?? phrase(consumablesPanelCardNoPotion.slug)}
            </span>
          </FilterableSelectTrigger>
        </InputPanelCard.Row>

        <InputPanelCard.Row label={phrase(consumablesPanelCardPotionSecond.slug)}>
          <ReagentPopover potionId={consumables.potion2} />
          <FilterableSelectTrigger
            onClick={() => setIsPotion2DialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">
              {selectedPotion2?.name ?? phrase(consumablesPanelCardNoPotion.slug)}
            </span>
          </FilterableSelectTrigger>
        </InputPanelCard.Row>
      </InputPanelCard>

      {!readOnly && (
        <MundusSelectDialog
          open={isMundusDialogOpen}
          onOpenChange={setIsMundusDialogOpen}
          selectedMundusId={mundusStone}
          onSelect={(mundusId) => onUpdateMundus(mundusId || "no-mundus")}
        />
      )}

      {!readOnly && (
        <FoodDrinkSelectDialog
          open={isFoodDrinkDialogOpen}
          onOpenChange={setIsFoodDrinkDialogOpen}
          selectedFoodDrinkId={consumables.foodOrDrink}
          onSelect={(foodDrinkId) => onUpdateConsumables({ foodOrDrink: foodDrinkId })}
        />
      )}

      {!readOnly && (
        <PotionSelectDialog
          open={isPotionDialogOpen}
          onOpenChange={setIsPotionDialogOpen}
          selectedPotionId={consumables.potion}
          onSelect={(potionId) => onUpdateConsumables({ potion: potionId })}
        />
      )}

      {!readOnly && (
        <PotionSelectDialog
          open={isPotion2DialogOpen}
          onOpenChange={setIsPotion2DialogOpen}
          selectedPotionId={consumables.potion2}
          onSelect={(potionId) => onUpdateConsumables({ potion2: potionId })}
        />
      )}
    </>
  )
}
