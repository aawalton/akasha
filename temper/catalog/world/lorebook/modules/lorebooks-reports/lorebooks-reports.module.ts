import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lorebooksReports = {
  id: "01a06194-be46-7cf8-bd55-13ade66cd64e",
  type: "page-type/module",
  slug: "lorebooks-reports",
  definition: "the missing-book report window and the text a player can copy out of it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Eidetic Memory part starts below the Shalidor header even with no row listed.",
    },
  ],
  createdAt: "2026-09-02T10:05:33.126Z",
  updatedAt: "2026-10-18T19:31:31.827Z",
} as const satisfies Module
