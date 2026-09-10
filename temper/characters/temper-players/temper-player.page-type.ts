import type { PageType } from "@akasha/pages/page-type"

export const temperPlayer = {
  id: "01a05fcd-f558-7259-93c1-1504762aa59c",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-player",
  definition: "the person behind an account, and how that person has asked temper to behave",
  pluralSlug: "temper-players",
  extends: ["page-type/temper-character-thing"],
  parts: [
    "file-property/settings",
    "select-property/platform",
    "select-property/server",
    "text-property/completion-visibility",
    "text-property/player-handle",
  ],
  properties: [
    { pageProperty: "text-property/completion-visibility", required: true, many: false },
    { pageProperty: "select-property/platform", required: false, many: false },
    { pageProperty: "text-property/player-handle", required: false, many: false },
    { pageProperty: "select-property/server", required: false, many: false },
    { pageProperty: "file-property/settings", required: false, many: false },
  ],
  types: "ts",
} as const satisfies PageType
