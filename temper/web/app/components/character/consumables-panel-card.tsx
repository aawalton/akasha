"use client"

import { Badge } from "@shared/design-badges/components/badge"
import { Button } from "@shared/design-primitives/components/button"
import { Popover, PopoverContent, PopoverTrigger } from "@shared/design-primitives/components/popover"
import type { FoodOrDrinkId } from "@temper/game-characters-character/food-and-drink/food-or-drink-source"
import type { MundusId } from "@temper/game-characters-character/mundus-source"
import { type PotionId, potions } from "@temper/game-items-alchemy/potions-source"
import { Info } from "lucide-react"
import { useState } from "react"
import {
  FoodDrinkSelectDialog,
  getFoodDrinkById,
} from "@/components/character/food-drink-select-dialog"
import { getMundusById, MundusSelectDialog } from "@/components/character/mundus-select-dialog"
import { PotionSelectDialog } from "@/components/character/potion-select-dialog"
import { FilterableSelectTrigger } from "@/components/ui/filterable-select-dialog"
import { InputPanelCard } from "@shared/design-patterns/components/input-panel-card"

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
  const [isPotionDialogOpen, setIsPotionDialogOpen] = useState(false)
  const [isPotion2DialogOpen, setIsPotion2DialogOpen] = useState(false)
  const [isFoodDrinkDialogOpen, setIsFoodDrinkDialogOpen] = useState(false)
  const [isMundusDialogOpen, setIsMundusDialogOpen] = useState(false)

  const selectedPotion = potions.data[consumables.potion]
  const selectedPotion2 = potions.data[consumables.potion2]
  const selectedFoodDrink = getFoodDrinkById(consumables.foodOrDrink)
  const selectedMundus = getMundusById(mundusStone)

  return (
    <>
      <InputPanelCard id="consumables" collapsible={true} title="Consumables" className={className}>
        <InputPanelCard.Row label="Mundus Stone">
          <FilterableSelectTrigger
            onClick={() => setIsMundusDialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">{selectedMundus?.name ?? "No Mundus"}</span>
          </FilterableSelectTrigger>
        </InputPanelCard.Row>

        <InputPanelCard.Row label="Food / Drink">
          <FilterableSelectTrigger
            onClick={() => setIsFoodDrinkDialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">{selectedFoodDrink?.name ?? "No Food or Drink"}</span>
          </FilterableSelectTrigger>
        </InputPanelCard.Row>

        <InputPanelCard.Row label="Potion">
          {(() => {
            const potion = potions.data[consumables.potion]
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
                    title="View reagent combinations"
                  >
                    <Info className="h-4 w-4 text-tertiary" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-fit">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Reagent Combinations</h4>
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
          })()}
          <FilterableSelectTrigger
            onClick={() => setIsPotionDialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">{selectedPotion?.name ?? "No Potion"}</span>
          </FilterableSelectTrigger>
        </InputPanelCard.Row>

        <InputPanelCard.Row label="Potion 2">
          {(() => {
            const potion2 = potions.data[consumables.potion2]
            if (!potion2) return null
            if (!("reagents" in potion2)) return null
            const reagents = potion2.reagents
            if (!reagents || reagents.length === 0) return null
            return (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="tertiary"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    title="View reagent combinations"
                  >
                    <Info className="h-4 w-4 text-tertiary" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-fit">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Reagent Combinations</h4>
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
          })()}
          <FilterableSelectTrigger
            onClick={() => setIsPotion2DialogOpen(true)}
            className="w-full min-w-0 max-w-[240px]"
            disabled={readOnly}
          >
            <span className="truncate">{selectedPotion2?.name ?? "No Potion"}</span>
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
