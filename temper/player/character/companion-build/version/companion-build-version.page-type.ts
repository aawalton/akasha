import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const companionBuildVersion = {
  id: "01a0d897-3e34-7904-836e-7392f33aea6a",
  type: "page-type/page-type",
  slug: "companion-build-version",
  definition: "a saved revision of a companion's build",
  extends: ["page-type/temper-character-thing"],
  properties: [
    { pageProperty: "relation-property/account-page", required: true, many: false },
    { pageProperty: "number-property/version-number", required: true, many: false },
    { pageProperty: "text-property/build-hash", required: true, many: false },
    { pageProperty: "boolean-property/is-checkpoint", required: false, many: false },
    { pageProperty: "text-property/checkpoint-name", required: false, many: false },
    { pageProperty: "number-property/build-target-count", required: false, many: false },
    { pageProperty: "select-property/base-roles", required: false, many: true, maxCount: 2 },
    {
      pageProperty: "relation-property/companion-build-version-build",
      required: true,
      many: false,
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
  parts: ["relation-property/companion-build-version-build"],
} as const satisfies PageType
