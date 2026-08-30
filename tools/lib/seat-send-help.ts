import type { CommandHelp } from "../ops/surface.ts"

export const help: CommandHelp = {
  irreversible: "irreversible",
  flags: [
    {
      name: "--to",
      argLabel: "<uuid|name|prefix>",
      valueShape: "token",
      description:
        "The recipient, by id or by name. Omit it to reach your principal — the seat " +
        "recorded as your `parent`. A name is resolved at send time, so it reaches " +
        "whatever seat spells that way then. The `<target-agent-id>` positional is an " +
        "accepted alias for this flag.",
    },
    {
      name: "--domain",
      argLabel: "<slug>",
      valueShape: "token",
      description:
        "The domain the recipient must state, matched exactly. Stated with `--role`.",
    },
    {
      name: "--role",
      argLabel: "<slug>",
      valueShape: "token",
      description:
        "The role the recipient must state, matched exactly. Stated with " +
        "`--domain`, and refused alone.",
    },
    {
      name: "--person",
      argLabel: "<slug>",
      valueShape: "token",
      description:
        "The person this message is for, by the slug their own page " +
        "states. Stated alone — being that person is the whole " +
        "address. Refused for a person this system carries no mailbox for, naming " +
        "the persona who does reach them.",
    },
    {
      name: "--content",
      argLabel: "<text>",
      valueShape: "prose",
      description:
        "Message content as a short literal string. A bare `-` is NOT stdin " +
        "(it is refused); use `--content-file -` to read from stdin.",
    },
    {
      name: "--content-file",
      argLabel: "<path|->",
      valueShape: "token",
      description: "Read message content from a file path, or `-` for stdin",
      acceptsStdin: true,
    },
    {
      name: "--from",
      aliases: ["--agent-id"],
      argLabel: "<uuid|name|prefix>",
      valueShape: "token",
      description:
        "Sender agent identity — UUID, UUID prefix or name " +
        "(default: AGENT_ID env var). `--agent-id` is an accepted alias.",
    },
    {
      name: "--blocked",
      description:
        "Claim the SENDER is stopped until this is answered. Takes no value: a " +
        "message records that claim and nothing about who else might be waiting, " +
        "so the sender is the only party it can be about. Omitted, this message " +
        "claims nobody is waiting — an announce, delivered just the same and " +
        "leaving the sender endable.",
    },
    {
      name: "--json",
      description: "Emit JSON record instead of TSV",
    },
  ],
  positionals: [
    {
      name: "<target-agent-id>",
      required: false,
      aliasOfFlag: "--to",
      description:
        "UUID, UUID prefix or name of the recipient agent — the " +
        "positional spelling of `--to`, kept working for existing callers.",
    },
  ],
  envVars: [
    {
      name: "AGENT_ID",
      description: "Default sender agent identity when --from is not given",
    },
  ],
  mutuallyExclusive: [
    ["--content", "--content-file"],
    ["--to", "--domain"],
    ["--to", "--role"],
    ["--person", "--to"],
    ["--person", "--domain"],
    ["--person", "--role"],
  ],
  examples: [
    "ops seat send --content-file ./handback.md",
    "echo 'long message' | ops seat send --to <target-agent-id> --content-file -",
    "ops seat send --to <target-agent-id> --content-file ./message.md",
    "ops seat send --domain code-harness --role operator --content-file ./alert.md",
    "ops seat send --person alan --content-file ./reply.md",
  ],
}
