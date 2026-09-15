import type { EsoAddon } from "akasha/code/eso-addon/eso-addon.page-type.types.ts"

export const temperLibMediaProvider = {
  id: "01a06069-f8c0-7024-bde1-26d49b2a6bff",
  type: "page-type/eso-addon",
  slug: "temper-lib-media-provider",
  definition: "the fonts, textures and sounds addons share with each other",

  addonManifest: "json",
  siblingManifest: "json",
  bundleEntry: "module/media-main",
  parts: [
    "eso-interface/media-console-backupfont-jp",
    "eso-interface/media-console-backupfont-zh",
    "eso-interface/media-console-fontpath",
    "eso-interface/media-fontstrings-shared",
    "eso-interface/media-pc-backupfont-de",
    "eso-interface/media-pc-backupfont-en",
    "eso-interface/media-pc-backupfont-es",
    "eso-interface/media-pc-backupfont-fr",
    "eso-interface/media-pc-backupfont-jp",
    "eso-interface/media-pc-backupfont-ru",
    "eso-interface/media-pc-backupfont-zh",
    "eso-interface/media-pc-fontpath",
    "module/media-casts",
    "module/media-data",
    "module/media-global",
    "module/media-main",
    "module/media-provider",
    "module/media-types",
    "type-declaration/media-declarations",
  ],
  interfaces: [
    "eso-interface/media-pc-fontpath",
    "eso-interface/media-console-fontpath",
    "eso-interface/media-fontstrings-shared",
    "eso-interface/media-pc-backupfont-de",
    "eso-interface/media-pc-backupfont-en",
    "eso-interface/media-pc-backupfont-es",
    "eso-interface/media-pc-backupfont-fr",
    "eso-interface/media-pc-backupfont-jp",
    "eso-interface/media-pc-backupfont-ru",
    "eso-interface/media-pc-backupfont-zh",
    "eso-interface/media-console-backupfont-jp",
    "eso-interface/media-console-backupfont-zh",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Media is keyed by a media kind and a name another addon chose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name already taken for a media kind is refused rather than replaced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every media kind has a default the library falls back to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The XML documents load before the Lua bundle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The font path the XML sets differs between a console and a desktop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The font path is declared as a string the other documents read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Another addon reaches this library only through the global name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This library depends on no other addon.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing here reaches a Date.",
    },
  ],
} as const satisfies EsoAddon
