import type { Module } from "@akasha/code-system/module"

export const knowledgeBaseDataRecipes = {
  id: "01a0622b-dc52-79f4-bce0-fd2f65450465",
  pageTypeSlug: "module",
  slug: "knowledge-base-data-recipes",
  definition: "the pre-scanned item ids upstream ships for provisioning recipes",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These ids are what upstream BaseData for API 101050 states.",
    },
  ],
} as const satisfies Module
