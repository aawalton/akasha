import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const charactersWindow = {
  id: "01a062ee-f0e0-7073-9273-eba1b7cc9a8b",
  type: "module",
  slug: "characters-window",
  definition: "the add-on's own window, its title, its panels and whether it is up",
  code: "ts",
} as const satisfies Module
