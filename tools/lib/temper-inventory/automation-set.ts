import { InputError } from "@shared/errors-core/exit"
import type {
  AutomationSettings,
  CharacterAutomationToggles,
  CompanionAutomationToggles,
} from "./automation-types.ts"

const CHARACTER_TOGGLE_NAMES = [
  "equipment",
  "lockWornGear",
  "food",
  "potions",
  "skills",
  "championPoints",
  "attributes",
  "soulGems",
  "repairKits",
  "recharge",
  "repair",
  "lockpicks",
  "experienceScrolls",
  "dailyWrits",
  "dailyWritBlacksmithing",
  "dailyWritClothier",
  "dailyWritWoodworking",
  "dailyWritJewelrycrafting",
  "dailyWritEnchanting",
  "dailyWritAlchemy",
  "dailyWritProvisioning",
  "dailyWritAutoCraft",
  "masterWrits",
  "masterWritBlacksmithing",
  "masterWritClothier",
  "masterWritWoodworking",
  "masterWritJewelrycrafting",
  "masterWritEnchanting",
  "masterWritAlchemy",
  "masterWritProvisioning",
] as const satisfies readonly (keyof CharacterAutomationToggles)[]

const COMPANION_TOGGLE_NAMES = [
  "equipment",
  "skills",
] as const satisfies readonly (keyof CompanionAutomationToggles)[]

type CharacterToggleName = (typeof CHARACTER_TOGGLE_NAMES)[number]
type CompanionToggleName = (typeof COMPANION_TOGGLE_NAMES)[number]

type _AssertNever<_T extends never> = undefined
type _CharacterPresenceOk = _AssertNever<
  Exclude<keyof CharacterAutomationToggles, CharacterToggleName>
>
type _CompanionPresenceOk = _AssertNever<
  Exclude<keyof CompanionAutomationToggles, CompanionToggleName>
>

const CHARACTER_TOGGLE_SET: ReadonlySet<string> = new Set(CHARACTER_TOGGLE_NAMES)
const COMPANION_TOGGLE_SET: ReadonlySet<string> = new Set(COMPANION_TOGGLE_NAMES)

function isCharacterToggleName(toggle: string): toggle is CharacterToggleName {
  return CHARACTER_TOGGLE_SET.has(toggle)
}

function isCompanionToggleName(toggle: string): toggle is CompanionToggleName {
  return COMPANION_TOGGLE_SET.has(toggle)
}

type ScopeKind =
  | { readonly kind: "global"; readonly target: "characters" | "companions" }
  | { readonly kind: "character"; readonly esoCharId: string }
  | { readonly kind: "companion"; readonly companionId: string }

type ToggleValue = boolean | null

function parseScope(scopeArg: string, toggle: string, targetArg: string | undefined): ScopeKind {
  if (scopeArg === "global") {
    const inCharacterSet = CHARACTER_TOGGLE_SET.has(toggle)
    const inCompanionSet = COMPANION_TOGGLE_SET.has(toggle)
    if (inCharacterSet && inCompanionSet) {
      if (targetArg === undefined) {
        throw new InputError(
          `--scope global with toggle '${toggle}' is ambiguous (matches both characters and companions); pass --target characters|companions to disambiguate`
        )
      }
      return { kind: "global", target: targetArg === "characters" ? "characters" : "companions" }
    }
    if (inCharacterSet) {
      if (targetArg !== undefined && targetArg !== "characters") {
        throw new InputError(
          `--target ${targetArg} contradicts toggle '${toggle}' which only applies to characters`
        )
      }
      return { kind: "global", target: "characters" }
    }
    if (inCompanionSet) {
      if (targetArg !== undefined && targetArg !== "companions") {
        throw new InputError(
          `--target ${targetArg} contradicts toggle '${toggle}' which only applies to companions`
        )
      }
      return { kind: "global", target: "companions" }
    }
    throw new InputError(`unknown toggle: '${toggle}'`)
  }
  if (scopeArg.startsWith("character:")) {
    const esoCharId = scopeArg.slice("character:".length)
    if (esoCharId === "")
      throw new InputError("--scope character: requires an esoCharId (e.g. character:@user__name)")
    if (!CHARACTER_TOGGLE_SET.has(toggle))
      throw new InputError(
        `toggle '${toggle}' is not a character toggle (character toggles: ${CHARACTER_TOGGLE_NAMES.join(", ")})`
      )
    if (targetArg !== undefined)
      throw new InputError("--target is only meaningful with --scope=global")
    return { kind: "character", esoCharId }
  }
  if (scopeArg.startsWith("companion:")) {
    const companionId = scopeArg.slice("companion:".length)
    if (companionId === "")
      throw new InputError("--scope companion: requires a companionId (e.g. companion:bastian)")
    if (!COMPANION_TOGGLE_SET.has(toggle))
      throw new InputError(
        `toggle '${toggle}' is not a companion toggle (companion toggles: ${COMPANION_TOGGLE_NAMES.join(", ")})`
      )
    if (targetArg !== undefined)
      throw new InputError("--target is only meaningful with --scope=global")
    return { kind: "companion", companionId }
  }
  throw new InputError(
    `--scope must be 'global', 'character:<esoCharId>', or 'companion:<companionId>'; got: '${scopeArg}'`
  )
}

function parseValue(arg: string): ToggleValue {
  if (arg === "true") return true
  if (arg === "false") return false
  if (arg === "null") return null
  throw new InputError(`--value must be 'true', 'false', or 'null'; got: '${arg}'`)
}

function applyCharacterToggle(
  toggles: CharacterAutomationToggles,
  toggle: CharacterToggleName,
  value: ToggleValue
): CharacterAutomationToggles {
  const next: CharacterAutomationToggles = { ...toggles }
  if (value === null) {
    delete next[toggle]
    return next
  }
  next[toggle] = value
  return next
}

function applyCompanionToggle(
  toggles: CompanionAutomationToggles,
  toggle: CompanionToggleName,
  value: ToggleValue
): CompanionAutomationToggles {
  const next: CompanionAutomationToggles = { ...toggles }
  if (value === null) {
    delete next[toggle]
    return next
  }
  next[toggle] = value
  return next
}

function narrowCharacterToggle(toggle: string): CharacterToggleName {
  if (!isCharacterToggleName(toggle))
    throw new InputError(
      `toggle '${toggle}' is not a character toggle (character toggles: ${CHARACTER_TOGGLE_NAMES.join(", ")})`
    )
  return toggle
}

function narrowCompanionToggle(toggle: string): CompanionToggleName {
  if (!isCompanionToggleName(toggle))
    throw new InputError(
      `toggle '${toggle}' is not a companion toggle (companion toggles: ${COMPANION_TOGGLE_NAMES.join(", ")})`
    )
  return toggle
}

export function applyToggle(
  settings: AutomationSettings,
  scope: ScopeKind,
  toggle: string,
  value: ToggleValue
): AutomationSettings {
  if (scope.kind === "global") {
    const globalNext = { ...(settings.global ?? {}) }
    if (scope.target === "characters") {
      const charToggle = narrowCharacterToggle(toggle)
      const next = applyCharacterToggle(globalNext.characters ?? {}, charToggle, value)
      globalNext.characters = next
    } else {
      const compToggle = narrowCompanionToggle(toggle)
      const next = applyCompanionToggle(globalNext.companions ?? {}, compToggle, value)
      globalNext.companions = next
    }
    return { ...settings, global: globalNext }
  }
  if (scope.kind === "character") {
    const charToggle = narrowCharacterToggle(toggle)
    const charactersNext = { ...settings.characters }
    const next = applyCharacterToggle(charactersNext[scope.esoCharId] ?? {}, charToggle, value)
    charactersNext[scope.esoCharId] = next
    return { ...settings, characters: charactersNext }
  }
  const compToggle = narrowCompanionToggle(toggle)
  const companionsNext = { ...settings.companions }
  const next = applyCompanionToggle(companionsNext[scope.companionId] ?? {}, compToggle, value)
  companionsNext[scope.companionId] = next
  return { ...settings, companions: companionsNext }
}

export { parseScope, parseValue }
