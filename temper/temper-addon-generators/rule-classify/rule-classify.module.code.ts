export function generateRuleClassify(): string {
  return `\
import { CategoryNode } from "../category-tree"
/**
 * Rule Classify (Generated)
 *
 * Pure functions for item signal matching and name pattern parsing.
 * Source: engine/inventory/classify-item.ts,
 *         engine/inventory/item-name-pattern.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

// =========================================================================
// Item signals interface
// =========================================================================

export interface ItemSignals {
  filterType: number
  itemType: number
  specializedItemType: number
  traitType: number
  equipType: number
  weaponType: number
  armorType: number
  furnitureCategoryId: number
  furnitureSubcategoryId: number
  itemName: string
}

// =========================================================================
// Internal helpers
// =========================================================================

export function arrayIncludes(arr: number[], value: number): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return true
  }
  return false
}

export function luaStringContains(haystack: string, needle: string): boolean {
  const [pos] = string.find(haystack, needle, 1, true)
  return pos !== undefined
}

export function hasSignals(node: CategoryNode): boolean {
  return !!(
    node.filterTypes ||
    node.itemTypes ||
    node.specializedItemTypes ||
    node.traitTypeRange ||
    node.equipTypes ||
    node.weaponTypes ||
    node.armorTypes ||
    node.furnitureCategoryIds ||
    node.furnitureSubcategoryIds ||
    node.itemNameContains
  )
}

// =========================================================================
// Signal matching
// =========================================================================

export function matchesSignals(signals: ItemSignals, node: CategoryNode): boolean {
  if (node.filterTypes && !arrayIncludes(node.filterTypes, signals.filterType)) return false
  if (node.itemTypes && !arrayIncludes(node.itemTypes, signals.itemType)) return false
  if (node.specializedItemTypes) {
    if (signals.specializedItemType === 0) return false
    if (!arrayIncludes(node.specializedItemTypes, signals.specializedItemType)) return false
  }
  if (node.traitTypeRange) {
    if (signals.traitType === 0) return false
    if (signals.traitType < node.traitTypeRange[0] || signals.traitType > node.traitTypeRange[1])
      return false
  }
  if (node.equipTypes) {
    if (signals.equipType === 0) return false
    if (!arrayIncludes(node.equipTypes, signals.equipType)) return false
  }
  if (node.weaponTypes) {
    if (signals.weaponType === 0) return false
    if (!arrayIncludes(node.weaponTypes, signals.weaponType)) return false
  }
  if (node.armorTypes) {
    if (signals.armorType === 0) return false
    if (!arrayIncludes(node.armorTypes, signals.armorType)) return false
  }
  if (node.furnitureCategoryIds) {
    if (signals.furnitureCategoryId === 0) return false
    if (!arrayIncludes(node.furnitureCategoryIds, signals.furnitureCategoryId)) return false
  }
  if (node.furnitureSubcategoryIds) {
    if (signals.furnitureSubcategoryId === 0) return false
    if (!arrayIncludes(node.furnitureSubcategoryIds, signals.furnitureSubcategoryId)) return false
  }
  if (node.itemNameContains !== undefined) {
    if (signals.itemName === "") return false
    if (!luaStringContains(signals.itemName, node.itemNameContains)) return false
  }
  return true
}

// =========================================================================
// Item name pattern matching
// =========================================================================

export interface NameToken {
  text: string
  negated: boolean
}

export function parseItemNamePattern(pattern: string): NameToken[] {
  const tokens: NameToken[] = []
  let i = 0
  const len = pattern.length

  while (i < len) {
    if (pattern[i] === " ") {
      i++
      continue
    }

    let negated = false
    if (pattern[i] === "-") {
      negated = true
      i++
      if (i >= len) break
    }

    if (pattern[i] === '"') {
      i++ // skip opening quote
      const start = i
      while (i < len && pattern[i] !== '"') {
        i++
      }
      const text = string.sub(pattern, start + 1, i)
      if (i < len) i++ // skip closing quote
      if (text.length > 0) tokens.push({ text, negated })
      continue
    }

    const start = i
    while (i < len && pattern[i] !== " ") {
      i++
    }
    const text = string.sub(pattern, start + 1, i)
    if (text.length > 0) tokens.push({ text, negated })
  }

  return tokens
}

export function itemNameMatchesPattern(itemName: string, pattern: string): boolean {
  const tokens = parseItemNamePattern(pattern)
  if (tokens.length === 0) return true
  const lowerName = string.lower(itemName)
  for (const token of tokens) {
    const found = luaStringContains(lowerName, string.lower(token.text))
    if (token.negated ? found : !found) return false
  }
  return true
}
`
}
