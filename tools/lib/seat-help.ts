
import { DECLARATIONS, MODES } from "./attributes.ts"

export const SEAT_HELP = `bun tools/seat.ts — state what a seat IS, so a compaction cannot take it away

Records this seat's persona, domain and role. A stated attribute survives compaction;
the READS of the documents it names do not, which is the whole of the first guarantee —
after a compaction the seat still states what it is, so the refusal can say what you lost
and where to read it back.

AN ATTRIBUTE IS STATED HERE AND INFERRED NOWHERE. Reading a document is not adopting what
it describes, and
no read record can tell the two apart, so it is an act you perform rather than one observed
of you.

THE NAME FOLLOWS. A seat's name is composed from what it states, so a statement that moves
one thing moves the name with it and the row answers to the new spelling immediately.
Where that spelling is already held by a live seat the WHOLE statement is refused and
nothing is recorded — a name is the fleet's exclusion between two seats, so two of them
stating one set of attributes is one stating its way onto the other's work. Every name a
seat may carry is spelled from what it states, so no name stands outside that; a person's
own handle (\`ki\`) is the one form a statement leaves where it is.

WHICH NAME IT CARRIES DEPENDS ON --role AND --principal. A handler spells the person it
serves and nothing else (\`alan\`), whoever it works for. A seat working for
Alan takes its persona's name alone, because that name is an address he types. Every other
seat takes a name spelling every attribute and assignment it states EXCEPT its persona,
because that name is the whole of the lock keeping two seats off one row and who is seated
is not what the lock is over. A seat nobody recorded a principal for takes that same form,
which is the total one: the short form is one word, and answering silence with it would
narrow the exclusion on the seats nobody set up carefully.

NOTHING IS COMMITTED. What a seat is, is runtime state under \$HOME, not anything either
repository says, so no path exists for a commit to name. This is the one command here that
writes without committing.

Each slug is validated against the pages now, so a stated attribute can always be
satisfied by reading. A slug naming no document is refused with what does resolve.

THE INITIATIVE HOLDS ONE VALUE, and a second replaces it. A seat is assigned one
initiative, so a seat naming two is one whose next act nothing can derive. What a persona OWNS is a different question, computed by
bun tools/champions.ts and deliberately stored nowhere, so what goes here is the one you have
actually picked up.

\`--resolve\` AND \`--name\` ANSWER WITHOUT WRITING, for a launcher that has to refuse a bad
slug before it stops the seat it is replacing, and has to know what a seat will be called
before it has a row to record anything on. Neither reaches the store on any path.

Usage:
  ops seat set --persona <slug> --domain <slug> --role <slug>
  ops seat set --from-seat
  ops seat set --from-history
  ops seat set --mode headless
  ops seat set --initiative <slug>
  ops seat set --errand "<what this seat was asked for>"
  ops seat set --agent <uuid> --flex flex-2
  ops seat set --principal alan
  ops seat set --on-call
  ops seat set --show
  ops seat set --name --persona <slug> --role <slug>
  ops seat set --resolve --token <slug> --token <slug>
  ops seat set --resolve --persona <slug> --domain <slug>

Flags:
  --persona <slug>  Who is speaking. Matched against the file name under personas/.
  --domain <slug>   Where the work is. Resolves to whatever declares that slug,
                    often a page type, folder or role rather than a file under domains/.
  --role <slug>     What it is answerable for across every piece of work. Matched against the file
                    name under roles/, at whatever depth it sits.
  --from-seat       Propose persona, domain and role from the seat name on disk, and state
                    them. The domain is the persona's own championed-domain, so a seat named
                    after her carries it without anyone typing one; a persona declaring
                    none proposes none. Anything you state yourself outranks the proposal.
  --from-history    Read back what this seat stated the last time it had a page, out of the
                    commit that last held \`seats/<name>.md\` in the memory repository. A
                    stopped seat's page is deleted rather than kept, so history is where its
                    attributes stand; the name is computed from what the seat states now, so
                    one path is asked for rather than the tree walked. It restores the
                    assignments too — principal, on-call and initiative — which the
                    name alone cannot spell. Anything you state yourself outranks it.
  --default         Supply a default. An attribute holding nothing takes the slug of whichever
                    document declares \`default: true\` on it, so a launcher asks for one
                    rather than naming it; a held attribute stands, and so does a recorded
                    mode. An attribute nothing claims, or two documents claim, is left empty
                    rather than guessed. Refused beside --clear.
  --initiative <slug>
                    The initiative this seat is working. ONE value — a second replaces
                    it rather than joining it, a seat being assigned one initiative.
                    Matched against the file names under initiatives/, which spell a
                    persona and a name; one naming no file is refused with what stands.
  --flex <flex-n>   What tells this seat apart from one identical in every other way —
                    \`flex-\` and a number, and nothing else. Judged by its shape alone: it
                    names no document and is read for nothing, which is exactly what lets a
                    second seat be minted on the spot.
                    ONLY A SPAWNED SEAT CARRIES ONE AND ONLY ITS SPAWNER ASSIGNS IT, so this is
                    refused twice over: where --agent names your own seat, and where the row it
                    names does not say that seat was spawned. \`ops seat start --flex\` is the
                    command that assigns one.
  --principal <who> Who this seat's output is produced for: agent where it answers to the
                    fleet, or the slug of the person it answers to, matched against the file
                    name under persons/. Set by whatever started the seat, as --mode is, and
                    it decides which of the three name forms the seat carries.
  --on-call         That this seat is on-call to its principal. An assignment that names no
                    work, so it takes no value and finishes nothing: it stands until it is
                    unset with --clear on-call. It moves no name — a seat's name spells
                    every assignment it states except this one.
  --take-live-name  Take the composed name even where a seat with a process in it holds that
                    name. Without this the name is refused, because two seats spelling one
                    name is the collision name distinctness exists to prevent. Taking a live
                    seat's name is a real operation and stays available; it is asked for
                    rather than defaulted into.
  --errand <text>   What this seat was asked for, in its own words. A seat is started with a
                    prompt and that prompt is its errand until its principal states another,
                    so an errand survives a compaction the conversation would lose. Clipped
                    where it runs long, the page stating what a seat holds rather than
                    keeping a transcript. An EMPTY value clears it, exactly as
                    \`--clear errand\` does: a caller passing through whatever it was
                    handed has an empty string where it has nothing, and refusing that
                    leaves the old errand standing under a new conversation.
  --clear <key>     Unset one key. Repeatable. One of: ${DECLARATIONS.join(", ")}.
  --mode <mode>     Who can hear this seat. One of: ${MODES.join(", ")}.
  --show            Print what this seat states, and exit.
  --name            Print the name these attributes SPELL and exit, writing nothing and
                    reaching no store. What a spawn asks before it has a row.
  --resolve         Resolve the attributes named above and PRINT them, one \`<slot>=<slug>\`
                    line each, instead of stating anything. Takes no --agent and
                    reaches the store on no path. With --default it prints what the
                    TREE claims instead, for a caller writing a default somewhere
                    other than a seat; a slot nothing claims is absent from the answer.
  --token <slug>    A token whose attribute was not named. Repeatable, and
                    order-independent: each is sorted into role or domain against the
                    pages — a slug under roles/ is the role, and a slug something
                    else declares that slug for is the domain. Two tokens
                    reaching one attribute are refused rather than guessed apart. Needs
                    --resolve; there is no token form of a statement.
  --agent <id>      Whose seat. Defaults to AGENT_ID, then the session id.
  --help            This.

Any subset of the four may be given; the rest stand. A subagent stating none of its own
reads its seat's, and stating one of its own overrides that for that attribute alone.

Exit codes:
  0  stated, shown, resolved, or spelled
  1  input error, a slug that resolves to no document, or a name a live seat already
     holds — nothing was written
`
