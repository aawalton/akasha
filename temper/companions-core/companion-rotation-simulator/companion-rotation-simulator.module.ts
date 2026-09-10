import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionRotationSimulator = {
  id: "01a06152-c2d0-754e-9a10-1c25777b3df1",
  pageTypeSlug: "module",
  slug: "companion-rotation-simulator",
  definition: "the tick loop a companion rotation is played out on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Skills are tried in the order the caller gave rather than by a priority score.",
    },
    {
      invariantKind: "constraint",
      statement: "A light attack fills any tick where no skill is ready.",
    },
    { invariantKind: "constraint", statement: "Accumulated ultimate is capped at five hundred." },
  ],
} as const satisfies Module
