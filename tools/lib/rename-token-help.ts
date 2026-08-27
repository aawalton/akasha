
export const RENAME_TOKEN_HELP = `bun tools/rename-token.ts — rename a TypeScript token and every reference the compiler resolves to it

Takes the two names rather than the file list, and asks the TypeScript compiler
which identifiers are the same symbol as the one you named. That is the whole
difference from \`replace.ts\`: bytes cannot tell a declaration from a word inside
a string, and the compiler can. A comment mentioning the old name, a log line
quoting it and an unrelated property spelled the same are all left alone.

WHAT IT DROPS IS THE AUTHORSHIP GATE AND NOTHING ELSE. \`read-what-is-required\` asks
what its writer read TO SHAPE a body, and a resolved
rename is shaped by nothing anyone read: the caller states two names and the
compiler states every position. So each landing is gated as \`composed\`, exactly
as a repointed referrer under \`mv.ts\` is.

CLOBBER PREVENTION IS NOT DROPPED AND CANNOT BE. \`read-before-write\` asks whether
this change destroys work somebody else did, which no provenance answers — so this
command READS each file whole to compose its new body and records that read, which is
true rather than declared. Everything else stands too: the ceiling, the page's shape,
its properties, links, the type check. The type check is the proof here: a rename
that missed a reference does not compile.

AND A FILE THAT MOVES WHILE THE GATES RUN REFUSES THE WHOLE CALL, by mtime, naming
every file that moved. The gates take seconds and this repo is written continuously
by other agents, so the gap between the read a body was composed from and the write
that lands it is real. Nothing is written; run it again.

THERE IS NO --under, AND THERE CANNOT BE. A resolved rename has a closure the
compiler knows and a byte substitution does not, so narrowing it to a directory
would leave a reference outside that directory pointing at a name no longer there.
Whole or nothing is the only form this command has.

ONE SYMBOL PER CALL. Where the name resolves to more than one declaration it refuses
and prints each as \`<path>:<line>\`, and --at takes one of those lines back. A short
name like \`Schema\` or \`Config\` is usually declared a dozen times over, so expect to
name the one you mean rather than treating the refusal as a fault.

IT RENAMES CODE, NEVER PROSE. The old name standing in a comment, a string, a help
block or a markdown document is reported and left, and \`replace.ts\` is the command for
those. A vocabulary rename is two acts, and this is the half a compiler can prove.

REFUSALS BEFORE ANY GATE RUNS:
  - a --new that is not a legal TypeScript identifier
  - an --old equal to --new, which asks for no change
  - no declaration named --old, which is a typo rather than a no-op
  - more than one declaration named --old and no --at naming which
  - an --at matching none of them
  - a rename reaching a file the repo does not track, which means the name is not ours
  - no TypeScript carrying a language service, rather than falling back to bytes
  - an argument it does not take, rather than ignoring it
  - a root that is not a git repository

Usage:
  ops refactor rename-token --old <name> --new <name> [flags]

Flags:
  --old <name>          The identifier as it stands.
  --new <name>          What it becomes.
  --at <path>:<line>    Which declaration, where the name has more than one. Copy the line
                        from the refusal; it is the file and line the declaration sits on.
  --message <msg>       Commit message. Defaults to one naming the rewritten paths.
  --message-file <path> Read the message from a file.
  --dry-run             Resolve, compose, gate and report; write and commit nothing.
  --help                This.

WHAT IS SEARCHED is every \`.ts\` file git tracks, quarantine included, loaded as one
program so that a reference in any of them is found. The compiler settings match the
ones \`typecheck\` gates with, so what resolves here is what compiles there.

THE COMPILER IT ASKS is the first classic TypeScript it finds: this repository's
\`node_modules/typescript\`, then whatever \`tsc\` on PATH resolves to. The 7.x native
preview is skipped rather than used, because it answers a rename over LSP alone and
this command is not an editor.

Exit codes:
  0  gated, written, committed, and the push handed off (or dry-run)
  1  input error, nothing declared that name, or a gate refused — nothing was written
  3  operational: the write or the commit failed
`
