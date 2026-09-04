import type { Module } from "@akasha/code-system/module"

export const gpsTamrielOMeter = {
  id: "01a0614d-4765-7fe3-9655-5d4e74a775dc",
  pageTypeSlug: "module",
  slug: "gps-tamriel-o-meter",
  definition: "measuring a map against Tamriel and holding what was measured",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A map already measured is not measured again.",
    },
    {
      invariantKind: "departure",
      statement: "Measuring moves the shown map and then puts the original map back.",
    },
  ],
} as const satisfies Module
