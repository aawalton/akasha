import type { LuaModule } from "akasha/code/lua-module/lua-module.page-type.types.ts"

export const esoSandboxPrelude = {
  id: "01a06059-2490-71da-a837-990f36920c7e",
  type: "page-type/lua-module",
  slug: "eso-sandbox-prelude",
  definition: "an environment that answers to every name the game's own Lua would use",
  lua: "lua",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the environment does not know answers with a stub.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stub answers to being called.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stub answers to being joined onto text as the empty string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stub answers to arithmetic as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stub answers to being ordered against a number as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How often each name was answered with a stub is counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stub reached for a field answers with another stub.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name answered with a stub is answered with that same stub until something defines it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's Lua reads many a name before the file defining that name has loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stub is kept beside the environment rather than in it, so a definition is not shadowed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the caller bans answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name of a shape the caller leaves unstubbed answers with nothing until something defines it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name the caller leaves unstubbed by name answers with nothing until something defines it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Many names are left unstubbed in one call, and each is looked up rather than matched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A banned name is taken off the real globals as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name something really defines is answered with that rather than with a stand-in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game function known to answer text answers with the empty string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game function known to answer a count answers with zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The engine's internal assert gives back the condition it was handed, as the game's does.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A few constants and functions are valued here, for a sandbox loading no capture of the game's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture loaded among the real globals is read before any value here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Loaded Lua runs with this environment in place of the real globals.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A name answered with a stub is never nothing, so a loop ending on nothing never ends.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The game's Lua loops over engine functions named `GetNext…Iter` that the documentation never names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name of that shape nothing defines answers a function giving back nothing, so the loop ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lua that runs past a deadline is stopped and refused rather than left running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The deadline is processor time, so a loaded machine is given the same room.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller wanting longer than the deadline says so by naming a larger one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Loaded Lua naming the global table is handed this environment rather than the real one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value seeded by the caller is read before any stub is made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Many values are seeded in one call, because a name at a time is a call at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The listing function the game gives an add-on is answered here rather than stubbed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller hands over a function that nothing defines yet, and it is defined.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name something defines already keeps that definition rather than the one given.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Listing this environment gives the names seeded or stubbed here and then the real ones.",
    },
  ],
} as const satisfies LuaModule
