import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionRotationMetrics = {
  id: "01a06152-c2cf-78e0-86fc-3c00f49037b8",
  pageTypeSlug: "module",
  slug: "companion-rotation-metrics",
  definition:
    "derivation of dps, hps, sps and tps metric entries from a simulated companion rotation",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Buff uptime scales each damage multiplier additively rather than compounding.",
    },
    {
      invariantKind: "constraint",
      statement: "The light-attack skill id is skipped in both the dps and the tps pass.",
    },
    {
      invariantKind: "gap",
      statement:
        "A missing metric value falls back to a hardcoded two thousand or thirty thousand.",
    },
  ],
} as const satisfies Module
