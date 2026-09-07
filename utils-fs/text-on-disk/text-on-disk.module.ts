import type { Module } from "@akasha/code-system/module"

export const textOnDisk = {
  id: "01a079aa-9118-7efd-9944-5e9b643983a2",
  pageTypeSlug: "module",
  slug: "text-on-disk",
  definition: "the text a file holds, or nothing where no file is there",
  code: "ts",
} as const satisfies Module
