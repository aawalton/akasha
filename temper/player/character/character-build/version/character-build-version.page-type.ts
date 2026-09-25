import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterBuildVersion = {
  id: "019dbb6c-51c0-7b3c-b483-0a739f32d9fb",
  type: "page-type/page-type",
  slug: "character-build-version",
  definition: "a saved revision of a character's build",
  extends: ["page-type/temper-character-thing"],
  parts: [
    "boolean-property/is-checkpoint",
    "number-property/version-number",
    "relation-property/character-build-version-build",
    "text-property/checkpoint-name",
  ],
  properties: [
    { pageProperty: "relation-property/account-page", required: true, many: false },
    {
      pageProperty: "relation-property/character-build-version-build",
      required: true,
      many: false,
    },
    { pageProperty: "number-property/version-number", required: true, many: false },
    { pageProperty: "text-property/build-hash", required: true, many: false },
    { pageProperty: "boolean-property/is-checkpoint", required: false, many: false },
    { pageProperty: "text-property/checkpoint-name", required: false, many: false },
    { pageProperty: "text-property/build-character-name", required: false, many: false },
    { pageProperty: "number-property/build-target-count", required: false, many: false },
    {
      pageProperty: "multi-relation-property/character-roles",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A version is kept so an earlier arrangement can be returned to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each version a build takes has the next version number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version with no checkpoint name was taken as the build changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Checkpoints are shown before the versions taken as the build changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version keeps the build's name, description and roles as declared properties.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version goes when its build goes.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
