import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperInventoryAutomation = {
  id: "01a06038-b7a2-7d0b-bbd4-68460f00c22e",
  type: "page-type/domain",
  slug: "temper-inventory-automation",
  definition: "what temper keeps up for a character or a companion without being asked",
  parts: [
    "module/automation-settings-shape",
    "module/automation-toggle-change",
    "module/automation-toggles",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An automation is on or off or unsaid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An automation left unsaid for a character falls back to the global scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character and a companion are automated separately.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The settings are held as JSON the addon and the tooling both read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here reads a saved-variables file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing here talks to the game.",
    },
  ],
} as const satisfies Domain
