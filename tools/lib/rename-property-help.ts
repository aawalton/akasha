export const RENAME_PROPERTY_HELP = `bun tools/rename-property.ts — rename a page property and every page the page type system says carries it

Takes the page type and the two key names rather than a file list, and asks the PAGE
TYPE SYSTEM which pages carry the property: every page type whose \`extends-slug\`
chain reaches the one you named, each page its \`files:\` glob claims, each page's own
\`page-type-slug:\` where it states one. That is the whole difference from \`replace.ts\`:
\`domain\`, \`role\`, \`value\`, \`parent\`, \`theme\` and \`person\` are ordinary English words
all over this repository, and three separate properties are keyed \`depends-on\` on three
different page types. Bytes cannot tell a frontmatter key from a word in a sentence.

A PROPERTY'S IDENTITY IS PAGE TYPE PLUS KEY, which \`pages/page-type/page-property-definition.page-type.md\`
states as \`unique-key: "{page-type.slug}/{defined-on.slug}/{key}"\`. So --page-type is
not optional and a call naming only a key refuses.

WHAT ONE CALL CHANGES, whole or nothing, in one commit:
  - the \`key:\` line in \`pages/page-property-definition/<defined-on>-<key>.page-property-definition.md\`
  - that file's own name, because a definition's file is named for its key
  - its \`slug:\`, and every frontmatter value and link naming that domain
  - the frontmatter key on every page the page type system says carries it

THE FRONTMATTER KEY IS PATCHED WHERE THE PARSER SAYS IT SITS, at the offset the
frontmatter reader gives for the key's own name, never by matching the word. A page
whose body prose spells the key keeps its prose; only the key is rewritten. A body
supplied under --also-from for a page that carries the key may state either name: the
call takes the body first and patches the key on it after, so one still stating the old
key is rewritten and one already stating the new key is taken as it stands.

TYPESCRIPT IS REPORTED AND REFUSED, NOT REWRITTEN. A frontmatter key reaches code as
a string literal — \`stringAt(fm, "domain-parent-slug")\` — and no compiler can prove a
string means this key rather than a word spelled the same, so this command will not
substitute bytes into code. But it will not leave them either. \`domain-parent-slug\` is
walked by \`tools/lib/domain.ts\` to resolve what is required for every seat: pages and readers
one commit apart means every seat's required reading resolves to nothing in between, and
the gates that would let you land the fix run off that same resolution. So each site
is printed with its line, and the call refuses until every one of them is either
replaced by a body you composed outside (--also-from) or named as deliberately left
(--leave). What you supply is gated with the pages and lands in the same commit.
The judgment stays with whoever can read the site; the atomicity stays here.

THE BLAST RADIUS IS PRINTED BEFORE ANY GATE RUNS, so --dry-run answers what this would
reach without paying for the gates. A call with sites still unacknowledged exits 1
without gating and prints the first 12 of them, or every one under --all-sites. That
report is the list to work through, and a rename reaching hundreds of sites is ordinary,
so the bounded one is not the whole job.

A PAGE OUTSIDE THE AKASHA REPO REFUSES THE CALL AND NAMES IT. A page type's pages
stand in whichever repo its \`files:\` names — \`project\`'s stand in memory — and one
commit cannot span two repositories. Whole or nothing is the only form this
command has, so it refuses rather than renaming the akasha half.

WHAT IT DROPS IS THE AUTHORSHIP GATE, AND ONLY WHERE NOTHING WAS AUTHORED. A page whose
frontmatter key was substituted, and a referrer repointed by the move, are shaped by
nothing anyone read, so each is gated as \`composed\`. The definition file and every body
under --also-from are authored, so both are gated in full: what is required for them must have
been read. \`read-before-write\` is never dropped — this command READS each file whole to
compose its new body and records that read.

AND A FILE THAT MOVES WHILE THE GATES RUN REFUSES THE WHOLE CALL, by mtime, naming
every file that moved. Nothing is written; run it again.

THE DEFINITION'S TERM IS REPORTED AND NEVER REWRITTEN. \`- **Domain owner** —\` is authored
prose the sentence beside it is built around, and appending the new key's words to one
turns a fragment into a claim: **Graph node producer depends on slugs** reads as a claim
that the producer depends on slugs, beside a line saying it depends on producers. Four
terms in ten went false that way when it was tried by hand. So the call lands and names
the term as owed, and whoever can read both lines writes it.

REFUSALS BEFORE ANY GATE RUNS:
  - no --page-type, which asks to rename a key on every type at once
  - a --page-type naming no page type here
  - an --old equal to --new, which asks for no change
  - a --new that is not a legal key, against the pattern \`key\` states of itself
  - no property definition on that page type stating that key, which is a typo
  - more than one, which the unique key says cannot stand
  - a --new already declared on that type, on one it extends, or on one extending it
  - a destination file already there, because a move never overwrites
  - a carrying page outside the akasha repo
  - a site spelling the old key named in neither --also-from nor --leave
  - an --also-from path naming no file in the repo
  - a --repo that is not \`akasha\`
  - an argument it does not take, rather than ignoring it

Usage:
  ops akasha rename-property --page-type <slug> --old <key> --new <key> [flags]

Flags:
  --page-type <slug>    The page type the property is declared on, as \`defined-on-slug:\`.
  --old <key>           The key as it stands.
  --new <key>           What it becomes.
  --also-from <dir>     A directory of replacement bodies at repo-relative paths, composed
                        outside and landed in this commit. Repeatable. A body older than
                        the file it replaces refuses the call: this repo is written
                        continuously, and landing one composed against an earlier state
                        drops whatever landed in between without saying so.
  --leave <relPath>     A site you read and decided needs no change. Repeatable.
  --all-sites           Print every site the call refuses over, rather than the first 12.
                        Every other report stays bounded; this one is the list to work through.
  --message <msg>       Commit message. Defaults to one naming the two keys and the counts.
  --message-file <path> Read the message from a file.
  --dry-run             Resolve, compose, gate and report; write and commit nothing.
  --help                This.

WHAT IS SEARCHED for the sites is every text file in the repo, quarantine excluded, for
the old key bounded by a character that is neither a letter, a digit, \`_\` nor \`-\`. So
\`domain-parents\` does not match inside \`domain-parent-slug\`, and a rename run twice
finds nothing the second time.

A TOP-LEVEL FRONTMATTER KEY OF THE SAME SPELLING IS NOT A SITE. A property's identity is
page type plus key, so the same spelling on a page this call did not resolve as carrying
the property IS ANOTHER PROPERTY, and reporting it would ask you to acknowledge a page
that has nothing to do with the rename. The pages that do carry it were rewritten before
the search ran. What is left to acknowledge is the prose and the string literals, which
is where the spelling cannot be told apart from a word.

Exit codes:
  0  gated, written, committed, and the push handed off (or dry-run)
  1  input error, nothing declared that key, a site unacknowledged, or a gate refused — nothing was written
  3  operational: the write or the commit failed
`
