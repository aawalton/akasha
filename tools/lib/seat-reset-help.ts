import type { CommandHelp } from "@akasha/command-system/command-declaring"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<agent-id>",
      required: true,
      description:
        "The seat to reset — a full agent UUID, an 8+ character UUID prefix, or a kebab-case name, " +
        "the same grammar every seat command takes. REQUIRED: this takes no " +
        "default, self least of all.",
    },
  ],
  flags: [
    {
      name: "--start-mode",
      argLabel: "<mode>",
      valueShape: "token",
      description:
        "`interactive` or `headless` — whether a terminal is attached to the new seat as it " +
        "starts. Defaults to the start mode the seat being reset held, so a reset changes the " +
        "agent and nothing else unless this says otherwise.",
    },
    {
      name: "--force",
      description: "Reset the seat even where subagents are working, ending them with it",
    },
    { name: "--json", description: "Emit a JSON record instead of the default line" },
  ],
  exits: [
    { code: 0, meaning: "success (the old agent stopped, a new one started under the same name)" },
    {
      code: 1,
      meaning:
        "input error (no <agent-id>, a malformed identifier, the caller's own seat, an unknown " +
        "flag, a bad --start-mode, or subagents working and no --force)",
    },
    {
      code: 2,
      meaning:
        "data error (no agent matches the identifier, neither its standing page nor its last " +
        "committed one states a domain, a role and a principal, or the kept declarations spell " +
        "no name) — nothing stopped",
    },
  ],
  examples: [
    "ops seat reset athena-worker",
    "ops seat reset 019ec7c0 --json",
    "ops seat reset agent-harness-worker --start-mode headless",
    "ops seat reset '#12832' --force",
  ],
}
