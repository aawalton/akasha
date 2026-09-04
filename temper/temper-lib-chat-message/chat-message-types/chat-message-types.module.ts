import type { Module } from "@akasha/code-system/module"

export const chatMessageTypes = {
  id: "01a06060-0d14-77c8-87b4-64bc8605ae57",
  pageTypeSlug: "module",
  slug: "chat-message-types",
  definition: "the shapes a chat proxy, the stored settings and the library object take",
  code: "ts",
} as const satisfies Module
