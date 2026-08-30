import type { CommandHelp } from "../ops/surface.ts"
import { DEFAULT_ACCOUNT } from "./default-account.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--start-mode",
      argLabel: "<mode>",
      valueShape: "token",
      description:
        "`interactive` (default) or `headless` — whether a terminal is attached to the seat as it starts. Both start the seat here; `interactive` leaves the session detached for the caller to attach to, and `headless` runs it with no terminal ever attached.",
    },
    {
      name: "--prompt",
      argLabel: "<text>",
      valueShape: "prose",
      description: "The first turn's prompt. Required with `--start-mode headless`.",
    },
    {
      name: "--prompt-file",
      argLabel: "<path|->",
      valueShape: "token",
      acceptsStdin: true,
      description: "Read the prompt from a file, or `-` for stdin.",
    },
    {
      name: "--persona",
      argLabel: "<slug>",
      valueShape: "token",
      description:
        "Who this seat is — a slug `pages/persona/*.persona.md` answers to. Her role and owned domain fill the two slots below where they are not stated. Goes with --principal naming a person.",
    },
    {
      name: "--role",
      argLabel: "<slug>",
      valueShape: "token",
      description:
        "What this seat does — a role slug, taken as stated. Outranks the persona's default, which is how a role DEPARTURE is spelled.",
    },
    {
      name: "--domain",
      argLabel: "<slug>",
      valueShape: "token",
      description: "Where this seat works — any document declaring `slug:`. Outranks the persona's owned domain.",
    },
    {
      name: "--principal",
      argLabel: "<slug>",
      valueShape: "token",
      description:
        "Who this seat's output is produced for — a person a page under `akasha/person-system/` answers to, or `agent` where it works for the fleet.",
    },
    {
      name: "--flex",
      argLabel: "<flex-n>",
      valueShape: "token",
      description: "`flex-` and a number, which is what keeps it out of every vocabulary.",
    },
    {
      name: "--initiative",
      argLabel: "<slug>",
      valueShape: "token",
      description: "The initiative this seat carries.",
    },
    {
      name: "--account",
      argLabel: "<account>",
      valueShape: "token",
      description: `Claude account the seat is stamped with (default ${DEFAULT_ACCOUNT})`,
    },
    {
      name: "--model",
      argLabel: "<id>",
      valueShape: "token",
      description: "Model override for the launched seat.",
    },
    {
      name: "--anthropic-base-url",
      argLabel: "<url>",
      valueShape: "token",
      description: "Base URL override for the launched seat.",
    },
    {
      name: "--anthropic-auth-token",
      argLabel: "<token>",
      valueShape: "token",
      description: "Auth token override for the launched seat.",
    },
    {
      name: "--no-launch",
      description:
        "Create the seat and state it, and start no process. For a caller running the supervisor itself, as `sn --no-tmux` does.",
    },
    { name: "--json", description: "Emit a JSON record instead of the default line" },
  ],
  exits: [
    { code: 0, meaning: "success (seat created, name bound, launched where asked)" },
    {
      code: 1,
      meaning:
        "input error (the attributes spell no name, a name given where none is taken, unknown flag,\n" +
        "a stated --agent-id, bad --start-mode,\n" +
        "a --principal naming neither a person nor the fleet, a persona and a principal that cannot\n" +
        "both be true, or `--start-mode headless` with no prompt)",
    },
    { code: 2, meaning: "data error (name already held, or the bind guard refused the shape) — nothing created" },
  ],
  examples: [
    "ops seat start --persona athena --principal alan",
    "ops seat start --start-mode headless --domain page-query-language --role worker --prompt 'carry the page-query-language initiative'",
    "ops seat start --start-mode headless --domain agent-harness --role worker --flex flex-1 --prompt-file ./prompt.txt",
    "ops seat start --start-mode headless --domain game-design --role game-master --prompt-file ./prompt.txt --anthropic-base-url http://100.64.0.2:11434/ --model hf.co/TheDrummer/Cydonia-24B-v4.3-GGUF:Q5_K_M --anthropic-auth-token ollama",
  ],
}
