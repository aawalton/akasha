"use client"
import { Badge } from "akasha/design/interface/badge/modules/badge/badge.module.code.tsx"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "akasha/design/interface/primitive/modules/select-control/select-control.module.code.tsx"
import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import { usePhrase } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"
import { itemLevelChampion } from "akasha/temper/web/phrase/pages/item-level-champion.temper-web-phrase.ts"
import { itemLevelCharacter } from "akasha/temper/web/phrase/pages/item-level-character.temper-web-phrase.ts"

const CHAMPION_LEVELS: readonly ItemLevel[] = [
  "CP160",
  "CP150",
  "CP140",
  "CP130",
  "CP120",
  "CP110",
  "CP100",
  "CP90",
  "CP80",
  "CP70",
  "CP60",
  "CP50",
  "CP40",
  "CP30",
  "CP20",
  "CP10",
]

const HIGHEST_CHARACTER_LEVEL = 50

const LEVELS: readonly ItemLevel[] = [
  ...CHAMPION_LEVELS,
  ...Array.from({ length: HIGHEST_CHARACTER_LEVEL }, (_, at) => HIGHEST_CHARACTER_LEVEL - at),
]

const DEFAULT_LEVEL: ItemLevel = "CP160"

const CHAMPION_MARK = "CP"

function keyOf(level: ItemLevel): string {
  return String(level)
}

interface ItemLevelSelectProps {
  level: ItemLevel | undefined
  onChange: (level: ItemLevel) => void
  disabled?: boolean | undefined
}

export function ItemLevelSelect({ level, onChange, disabled }: ItemLevelSelectProps) {
  const phrase = usePhrase()
  const held = level ?? DEFAULT_LEVEL
  const labelOf = (one: ItemLevel): string =>
    typeof one === "number"
      ? phrase(itemLevelCharacter.slug, { level: String(one) })
      : phrase(itemLevelChampion.slug, { points: one.slice(CHAMPION_MARK.length) })
  return (
    <Select<string>
      value={keyOf(held)}
      onValueChange={(key) => {
        const chosen = LEVELS.find((one) => keyOf(one) === key)
        if (chosen !== undefined) onChange(chosen)
      }}
      disabled={disabled}
    >
      <SelectTrigger hideChevron>
        <Badge variant="elevation-muted" className="shrink-0">
          {labelOf(held)}
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {LEVELS.map((one) => (
          <SelectItem key={keyOf(one)} value={keyOf(one)}>
            {labelOf(one)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
