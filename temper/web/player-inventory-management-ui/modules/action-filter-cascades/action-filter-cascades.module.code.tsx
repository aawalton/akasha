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
import { craftbag } from "akasha/temper/catalog/world/temper-location-type/pages/craftbag.temper-location-type.ts"
import { housingStorage } from "akasha/temper/catalog/world/temper-location-type/pages/housing-storage.temper-location-type.ts"
import { temperLocationType } from "akasha/temper/catalog/world/temper-location-type/temper-location-type.page-type.ts"
import {
  type KeyedTitles,
  titleIn,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"
import { classifyLocation } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import { forInspiration } from "akasha/temper/items/rules/core/temper-deconstruct-mode/pages/for-inspiration.temper-deconstruct-mode.ts"
import { forMaterials } from "akasha/temper/items/rules/core/temper-deconstruct-mode/pages/for-materials.temper-deconstruct-mode.ts"
import { temperDeconstructMode } from "akasha/temper/items/rules/core/temper-deconstruct-mode/temper-deconstruct-mode.page-type.ts"
import { bank } from "akasha/temper/items/rules/routing/core/temper-venue/pages/bank.temper-venue.ts"
import { furnitureVault } from "akasha/temper/items/rules/routing/core/temper-venue/pages/furniture-vault.temper-venue.ts"
import { guildBank } from "akasha/temper/items/rules/routing/core/temper-venue/pages/guild-bank.temper-venue.ts"
import { temperVenue } from "akasha/temper/items/rules/routing/core/temper-venue/temper-venue.page-type.ts"
import { useKeyedTitles } from "akasha/temper/web/modules/use-keyed-titles/use-keyed-titles.module.code.tsx"
import { NULL_SENTINEL } from "akasha/temper/web/player-inventory-management-ui/modules/action-filter-utils/action-filter-utils.module.code.ts"
import { useInventory } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory/hooks-inventory.module.code.ts"
import { useManagedGuildBanks } from "akasha/temper/web/player-inventory-management-ui/modules/hooks-inventory-settings/hooks-inventory-settings.module.code.ts"
import { ChevronRight } from "lucide-react"
import { useMemo } from "react"

function usePlaceTitles(): { venues: KeyedTitles | null; places: KeyedTitles | null } {
  const venues = useKeyedTitles(temperVenue.slug)
  const places = useKeyedTitles(temperLocationType.slug)
  return { venues, places }
}

export function SubBadgeSelect({
  value,
  options,
  allLabel,
  onChange,
}: {
  value: string | null
  options: readonly { value: string; label: string }[]
  allLabel?: string
  onChange: (value: string | null) => void
}) {
  const hasAllOption = allLabel !== undefined
  const selectValue = hasAllOption ? (value ?? NULL_SENTINEL) : (value ?? options[0]?.value ?? "")

  return (
    <div className="flex items-center gap-1">
      <ChevronRight className="size-3 text-tertiary" />
      <Select
        value={selectValue}
        onValueChange={(v) => onChange(hasAllOption && v === NULL_SENTINEL ? null : v)}
      >
        <SelectTrigger hideChevron>
          <Badge variant="elevation-muted" className="shrink-0">
            <SelectValue placeholder={allLabel} />
          </Badge>
        </SelectTrigger>
        <SelectContent
          nullSentinel={hasAllOption ? { value: NULL_SENTINEL, label: allLabel } : undefined}
        >
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function MoveToCascade({
  sub,
  sub2,
  onSubChange,
  onSub2Change,
}: {
  sub: string | null
  sub2: string | null
  onSubChange: (val: string | null) => void
  onSub2Change: (val: string | null) => void
}) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)
  const { managedSet } = useManagedGuildBanks()
  const { venues, places } = usePlaceTitles()

  const categoryOptions = useMemo(
    () => [
      { value: "bank", label: titleIn(venues, bank.key) },
      { value: "craft-bag", label: titleIn(places, craftbag.key) },
      { value: "character", label: titleIn(places, character.key) },
      { value: "guild-bank", label: titleIn(venues, guildBank.key) },
      { value: "housing-storage", label: titleIn(places, housingStorage.key) },
    ],
    [venues, places]
  )

  const characterOptions = useMemo(() => {
    const characters = inventory?.currencies?.characters
    if (!characters) return []
    return Object.entries(characters).map(([charId, charData]) => ({
      value: `character:${charId}`,
      label: charData.displayName !== "" ? charData.displayName : `Character ${charId}`,
    }))
  }, [inventory])

  const guildBankOptions = useMemo(() => {
    const locations = inventory?.locations
    if (!locations) return []
    const items: { value: string; label: string }[] = []
    for (const [key, loc] of Object.entries(locations)) {
      if (classifyLocation(key) !== "guild") continue
      if (!managedSet.has(key)) continue
      items.push({
        value: `guild-bank:${key}`,
        label: loc.displayName !== "" ? loc.displayName : key,
      })
    }
    return items
  }, [inventory, managedSet])

  const housingStorageOptions = useMemo(() => {
    const locations = inventory?.locations
    const items: { value: string; label: string }[] = [
      { value: "furniture-vault", label: titleIn(venues, furnitureVault.key) },
    ]
    if (locations) {
      for (const [key, loc] of Object.entries(locations)) {
        if (!key.startsWith("HouseBank:")) continue
        const parts = key.split(":")
        if (parts.length < 3) continue
        const chestId = parts[2]
        if (chestId == null) continue
        items.push({
          value: `house-storage:${chestId}`,
          label: loc.displayName !== "" ? loc.displayName : `Storage Chest ${chestId}`,
        })
      }
    }
    return items
  }, [inventory, venues])

  function handleCategoryChange(val: string | null) {
    onSubChange(val)
  }

  return (
    <>
      {}
      <SubBadgeSelect value={sub} options={categoryOptions} onChange={handleCategoryChange} />

      {}
      {sub === "character" && (
        <SubBadgeSelect
          value={sub2}
          options={characterOptions}
          allLabel="Any Character"
          onChange={onSub2Change}
        />
      )}

      {sub === "guild-bank" && (
        <SubBadgeSelect
          value={sub2}
          options={guildBankOptions}
          allLabel="Any Guild Bank"
          onChange={onSub2Change}
        />
      )}

      {sub === "housing-storage" && (
        <SubBadgeSelect
          value={sub2}
          options={housingStorageOptions}
          allLabel="Any Housing Storage"
          onChange={onSub2Change}
        />
      )}
    </>
  )
}

export function StockCascade({
  sub,
  sub2,
  onSubChange,
  onSub2Change,
}: {
  sub: string | null
  sub2: string | null
  onSubChange: (val: string | null) => void
  onSub2Change: (val: string | null) => void
}) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)

  const characterOptions = useMemo(() => {
    const characters = inventory?.currencies?.characters
    if (!characters) return []
    return Object.entries(characters).map(([charId, charData]) => ({
      value: `character:${charId}`,
      label: charData.displayName !== "" ? charData.displayName : `Character ${charId}`,
    }))
  }, [inventory])

  const { venues, places } = usePlaceTitles()
  const scopeOptions = useMemo(
    () => [
      { value: "bank", label: titleIn(venues, bank.key) },
      { value: "character", label: titleIn(places, character.key) },
    ],
    [venues, places]
  )

  function handleScopeChange(val: string | null) {
    onSubChange(val)
  }

  return (
    <>
      {}
      <SubBadgeSelect
        value={sub}
        options={scopeOptions}
        allLabel="Any Scope"
        onChange={handleScopeChange}
      />

      {}
      {sub === "character" && (
        <SubBadgeSelect
          value={sub2}
          options={characterOptions}
          allLabel="All Characters"
          onChange={onSub2Change}
        />
      )}
    </>
  )
}

export function DeconstructCascade({
  sub,
  sub2,
  onSubChange,
  onSub2Change,
}: {
  sub: string | null
  sub2: string | null
  onSubChange: (val: string | null) => void
  onSub2Change: (val: string | null) => void
}) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)

  const characterOptions = useMemo(() => {
    const characters = inventory?.currencies?.characters
    if (!characters) return []
    return [
      { value: "character:by-priority", label: "By Priority" },
      ...Object.entries(characters).map(([charId, charData]) => ({
        value: `character:${charId}`,
        label: charData.displayName !== "" ? charData.displayName : `Character ${charId}`,
      })),
    ]
  }, [inventory])

  const modes = useKeyedTitles(temperDeconstructMode.slug)
  const modeOptions = useMemo(
    () =>
      [forInspiration, forMaterials].map((one) => ({
        value: one.key,
        label: titleIn(modes, one.key),
      })),
    [modes]
  )

  function handleModeChange(val: string | null) {
    onSubChange(val)
  }

  return (
    <>
      {}
      <SubBadgeSelect
        value={sub}
        options={modeOptions}
        allLabel="Any Mode"
        onChange={handleModeChange}
      />

      {}
      {sub === "for-inspiration" && (
        <SubBadgeSelect
          value={sub2}
          options={characterOptions}
          allLabel="Any Character"
          onChange={onSub2Change}
        />
      )}
    </>
  )
}

export function CharacterTargetCascade({
  action,
  sub,
  onSubChange,
}: {
  action: "character-equip" | "use" | "research"
  sub: string | null
  onSubChange: (val: string | null) => void
}) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)

  const options = useMemo(() => {
    const byPriorityValue =
      action === "character-equip" ? "character-worn:by-priority" : "character:by-priority"
    const characters = inventory?.currencies?.characters
    if (!characters) return [{ value: byPriorityValue, label: "By Priority" }]
    return [
      { value: byPriorityValue, label: "By Priority" },
      ...Object.entries(characters).map(([charId, charData]) => ({
        value: `character:${charId}`,
        label: charData.displayName !== "" ? charData.displayName : `Character ${charId}`,
      })),
    ]
  }, [action, inventory])

  return (
    <SubBadgeSelect value={sub} options={options} allLabel="Any Character" onChange={onSubChange} />
  )
}

export function CompanionTargetCascade({
  sub,
  onSubChange,
}: {
  sub: string | null
  onSubChange: (val: string | null) => void
}) {
  const userId = useUserId()
  const { inventory } = useInventory(userId)

  const options = useMemo(() => {
    const byPriority = { value: "companion-worn:by-priority", label: "By Priority" }
    const locations = inventory?.locations
    if (!locations) return [byPriority]
    const items = [byPriority]
    for (const [key, loc] of Object.entries(locations)) {
      if (!key.startsWith("Companion:")) continue
      const name = key.slice("Companion:".length)
      items.push({
        value: `companion-worn:${name}`,
        label: loc.displayName !== "" ? loc.displayName : name,
      })
    }
    return items
  }, [inventory])

  return (
    <SubBadgeSelect value={sub} options={options} allLabel="Any Companion" onChange={onSubChange} />
  )
}
