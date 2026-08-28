"use client"

import { useAuth } from "@shared/auth/use-auth"
import { Badge } from "@shared/design-badges/components/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shared/design-primitives/components/select"
import { classifyLocation } from "@temper/game-items-core/inventory-grouping"
import { ChevronRight } from "lucide-react"
import { useMemo } from "react"
import { NULL_SENTINEL } from "./action-filter-utils"
import { useInventory } from "./hooks-inventory"
import { useManagedGuildBanks } from "./hooks-inventory-settings"

const MOVE_TO_CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "bank", label: "Bank" },
  { value: "craft-bag", label: "Craft Bag" },
  { value: "character", label: "Character" },
  { value: "guild-bank", label: "Guild Bank" },
  { value: "housing-storage", label: "Housing Storage" },
]

const STOCK_SCOPE_OPTIONS: { value: string; label: string }[] = [
  { value: "bank", label: "Bank" },
  { value: "character", label: "Character" },
]

const DECONSTRUCT_MODE_OPTIONS: { value: string; label: string }[] = [
  { value: "for-inspiration", label: "For Inspiration" },
  { value: "for-materials", label: "For Materials" },
]

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
  const { userId } = useAuth()
  const { inventory } = useInventory(userId)
  const { managedSet } = useManagedGuildBanks()

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
      { value: "furniture-vault", label: "Furniture Vault" },
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
  }, [inventory])

  function handleCategoryChange(val: string | null) {
    onSubChange(val)
  }

  return (
    <>
      {}
      <SubBadgeSelect
        value={sub}
        options={MOVE_TO_CATEGORY_OPTIONS}
        onChange={handleCategoryChange}
      />

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
  const { userId } = useAuth()
  const { inventory } = useInventory(userId)

  const characterOptions = useMemo(() => {
    const characters = inventory?.currencies?.characters
    if (!characters) return []
    return Object.entries(characters).map(([charId, charData]) => ({
      value: `character:${charId}`,
      label: charData.displayName !== "" ? charData.displayName : `Character ${charId}`,
    }))
  }, [inventory])

  function handleScopeChange(val: string | null) {
    onSubChange(val)
  }

  return (
    <>
      {}
      <SubBadgeSelect
        value={sub}
        options={STOCK_SCOPE_OPTIONS}
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
  const { userId } = useAuth()
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

  function handleModeChange(val: string | null) {
    onSubChange(val)
  }

  return (
    <>
      {}
      <SubBadgeSelect
        value={sub}
        options={DECONSTRUCT_MODE_OPTIONS}
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
  const { userId } = useAuth()
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
  const { userId } = useAuth()
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
