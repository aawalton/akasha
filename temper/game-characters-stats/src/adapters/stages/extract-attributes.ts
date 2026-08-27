import { createAttributeSource } from "@temper/game-characters-character/attributes-source"
import type { PipelineStage } from "./types"

export const extractAttributes: PipelineStage = (build, _context) => {
  const sources = []
  const attrs = build.character.attributes

  if (attrs.health > 0) sources.push(createAttributeSource("health", attrs.health))
  if (attrs.magicka > 0) sources.push(createAttributeSource("magicka", attrs.magicka))
  if (attrs.stamina > 0) sources.push(createAttributeSource("stamina", attrs.stamina))

  return sources
}
