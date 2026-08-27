import { CHARACTER_CRAFTING_CHECKERS } from "./character-crafting-checkers"
import { CHARACTER_PROGRESSION_CHECKERS } from "./character-progression-checkers"
import { CHARACTER_SIMPLE_CHECKERS } from "./character-simple-checkers"
import { CHARACTER_SKILL_CHECKERS } from "./character-skill-checkers"
import type { CompletionCardChecker } from "./completion-card-checker-types"
import type { CharacterCardId } from "./completion-card-registry"


export const COMPLETION_CARD_CHECKERS: Partial<Record<CharacterCardId, CompletionCardChecker>> = {
  ...CHARACTER_SIMPLE_CHECKERS,
  ...CHARACTER_SKILL_CHECKERS,
  ...CHARACTER_CRAFTING_CHECKERS,
  ...CHARACTER_PROGRESSION_CHECKERS,
}
