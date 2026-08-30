
export const HOOK_BENCH_HELP = `bun tools/hook-bench.ts — run one claude session whose hooks are exactly what you declared

Composes a configuration directory the fleet does not share, installs the hooks you named
and nothing else, runs one headless session against them, and leaves everything it saw on
disk. The run directory it wrote goes to stdout, one line; the summary goes to stderr.

  RUN=\$(bun ~/repos/akasha/tools/hook-bench.ts --hooks h.json --prompt 'run: echo hi')
  jq -r '.label, .received.tool_name' \$RUN/hooks.jsonl

--hooks TAKES THE \`hooks\` OBJECT IN A SETTINGS FILE'S OWN SPELLING, so a chain under test
is pasted rather than translated:

  { "PreToolUse": [ { "matcher": "Bash",
      "hooks": [ { "type": "command", "command": "\$HOME/.bun/bin/bun \$HOME/repos/akasha/tools/hooks/block-whole-suite-run.ts" } ] } ] }

EACH DECLARED COMMAND IS WRAPPED, in a shim that hands it stdin and replays its stdout,
stderr and exit code unchanged. The client's own \`--include-hook-events\` reports every
firing's output but not the payload that went in, and names a firing only by its event and
matcher — so two hooks under one matcher would be one name. The wrapping is what makes
hooks.jsonl answer which command received what; the chain behaves as declared.

THE SESSION RUNS WITH PERMISSIONS BYPASSED, there being nobody to answer a prompt and
nothing in the stripped settings to grant anything. Treat the prompt as one you are handing
a seat that can do whatever it is asked.

WHAT LANDS IN THE RUN DIRECTORY:
  config/        what CLAUDE_CONFIG_DIR pointed at — mode 700, empty hook set, symlinked
                 credential, and the session transcripts the client left, one per subagent
  settings.json  what the client was given, the wrapping visible in it
  commands/      each declared command, as the shim read it
  hooks.jsonl    one record per firing: label, command, payload received, stdout, stderr, exit
  stream.jsonl   the client's own stream, hook lifecycle events included
  stderr.txt     what the client wrote to stderr
  run.json       the argv, the environment overrides, and the verdict

Usage:
  bun ~/repos/akasha/tools/hook-bench.ts --hooks <path|-> (--prompt <text> | --prompt-file <path|->)
      [--agents <path|->] [--model <name>] [--timeout <seconds>] [--run-dir <path>] [--account <name>]

Flags:
  --hooks <path|->        The \`hooks\` object to install, as a settings file spells it. Required.
  --prompt <text>         The prompt the session is given.
  --prompt-file <path|->  The same, read from a file — the non-shell route for a long one.
  --agents <path|->       A \`--agents\` object, passed to the client verbatim. Its tool list is
                          yours to state; a subagent gets what you name and nothing else.
  --model <name>          Which model the session runs on (default: sonnet).
  --timeout <seconds>     How long the client may run before it is killed (default: 300).
  --run-dir <path>        Where to compose the run (default: \$HOME/.hook-bench/<stamp>).
  --account <name>        Whose credential to reach, under ~/.claude/accounts/ (default: the
                          account \$CLAUDE_CONFIG_DIR names).
  --help                  This.

Exit codes:
  0  the session ran, and every firing the client reported was one this bench installed
  1  the session failed, hit the ceiling, or a hook fired that this bench did not install
  2  the call could not be read, or the configuration could not be composed. Nothing ran.
`
