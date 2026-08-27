
export const CUSTODIAN_DEAD = `The layer your project is waiting on is proven dead, so the wake you are parked on is
never coming. This is a strand, not a park: waiting longer is the one response
that cannot work.

Escalate to a live principal, or end this seat:
  - escalate:  ops seat send --domain <domain> --role <role> --content-file <file>
  - stop:      ops seat stop

\`stop\` takes no argument and ends the seat you are. A strand is somebody else's to
clear, and clearing it may well mean waking you — which a stopped seat is there for.
`

export const NO_TURN_START_SOURCE = `No turn start source. This turn ended without leaving anything running, without an
unanswered message out, and without ending this seat, so nothing will call it back
and the work stops here. A headless seat has no reader for its text output, so a
report written as turn text reaches nobody.

Do one of these, then stop:
  - send, and park for the reply:  ops seat send --content-file <file>
  - leave something running:       a background task, a spawned agent, or a Monitor
  - stop:                          ops seat stop

\`stop\` takes no argument and ends the seat you are, and a revive still reaches it.

Filing a record is not sending: it wakes nobody by design.

If you are already parked on a wake another agent promised you, say so and stop again.
`

export function NOTHING_SAID(dispatched: readonly string[]): string {
  const standing = dispatched.length === 0 ? "" : `Still standing: ${dispatched.join(", ")}.\n\n`
  return `This turn ended with work outstanding and said nothing about why. Nothing will bring this
seat back.

${standing}Do the work, or tell your principal what is left and what you need from them.
`
}
