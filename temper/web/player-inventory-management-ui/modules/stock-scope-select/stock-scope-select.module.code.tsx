"use client"

import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { character } from "akasha/temper/catalog/world/temper-location-type/pages/character.temper-location-type.ts"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import { titleIn } from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import type {
  MoveToDestination,
  StockScope,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { bank } from "akasha/temper/items/rules/routing/core/temper-venue/pages/bank.temper-venue.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import type { ActionVariant } from "akasha/temper/web/player-inventory-management-ui/modules/action-options/action-options.module.code.ts"
import { useInventory } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory/hooks-inventory.module.code.ts"
import {
  phraseOf,
  useRuleCardPhrases,
} from "akasha/temper/web/player-inventory-management-ui/modules/rule-card-phrase/rule-card-phrase.module.code.tsx"
import { stockScopeSelectAllCharacters } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/stock-scope-select-all-characters.temper-rule-card-phrase.ts"
import { stockScopeSelectByPriority } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/stock-scope-select-by-priority.temper-rule-card-phrase.ts"
import { stockScopeSelectUnnamedCharacter } from "akasha/temper/web/player-inventory-management-ui/temper-rule-card-phrase/pages/stock-scope-select-unnamed-character.temper-rule-card-phrase.ts"
import { ChevronRight } from "lucide-react"
import { useMemo } from "react"

interface StockScopeSelectProps {
  stockScope: StockScope | undefined
  destination: MoveToDestination | undefined
  onChange: (patch: { stockScope: StockScope; destination: MoveToDestination }) => void
  variant?: ActionVariant
}

interface CharacterOption {
  value: `character:${string}`
  label: string
}

export function StockScopeSelect({
  stockScope,
  destination,
  onChange,
  variant = "green",
}: StockScopeSelectProps) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)
  const phrases = useRuleCardPhrases()
  const venues = useKeyedTitles(temperVenue.slug)
  const places = useKeyedTitles(temperLocationType.slug)
  const allCharacters = titleIn(phrases, stockScopeSelectAllCharacters.key)
  const byPriority = titleIn(phrases, stockScopeSelectByPriority.key)

  const scope = stockScope === "current-character" ? "bank" : "character"

  const characterOptions = useMemo((): readonly CharacterOption[] => {
    const characters = inventory?.currencies?.characters
    if (!characters) return []
    return Object.entries(characters).map(([charId, charData]) => ({
      value: `character:${charId}`,
      label:
        charData.displayName !== ""
          ? charData.displayName
          : phrases === null
            ? ""
            : phraseOf(phrases, stockScopeSelectUnnamedCharacter.key, { id: charId }),
    }))
  }, [inventory, phrases])

  const subscopeValue =
    destination === "character:by-priority"
      ? "character:by-priority"
      : destination?.startsWith("character:")
        ? destination
        : "all"

  const subscopeLabel =
    subscopeValue === "all"
      ? allCharacters
      : subscopeValue === "character:by-priority"
        ? byPriority
        : (characterOptions.find((o) => o.value === subscopeValue)?.label ?? allCharacters)

  return (
    <>
      <div className="flex items-center gap-1">
        <ChevronRight className="size-3 text-tertiary" />
        <Select
          value={scope}
          onValueChange={(v) => {
            if (v === "character") {
              onChange({ stockScope: "any-character", destination: "bank" })
            } else {
              onChange({ stockScope: "current-character", destination: "bank" })
            }
          }}
        >
          <SelectTrigger hideChevron>
            <Badge variant={variant} className="shrink-0">
              <SelectValue />
            </Badge>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="character">{titleIn(places, character.key)}</SelectItem>
            <SelectItem value="bank">{titleIn(venues, bank.key)}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {scope === "character" && (
        <div className="flex items-center gap-1">
          <ChevronRight className="size-3 text-tertiary" />
          <Select
            value={subscopeValue}
            onValueChange={(v) => {
              if (v === "all") {
                onChange({ stockScope: "any-character", destination: "bank" })
                return
              }
              if (v === "character:by-priority") {
                onChange({ stockScope: "any-character", destination: "character:by-priority" })
                return
              }
              const opt = characterOptions.find((o) => o.value === v)
              if (!opt) return
              onChange({ stockScope: "any-character", destination: opt.value })
            }}
          >
            <SelectTrigger hideChevron>
              <Badge variant={variant} className="shrink-0">
                <SelectValue>{subscopeLabel}</SelectValue>
              </Badge>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{allCharacters}</SelectItem>
              <SelectItem value="character:by-priority">{byPriority}</SelectItem>
              {characterOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  )
}
