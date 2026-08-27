const STATED_PARENT = "--agent-id"

export function refuseStatedParent(args: readonly string[]): string | null {
  const stated = args.some(
    (one) => one === STATED_PARENT || one.startsWith(`${STATED_PARENT}=`)
  )
  if (!stated) return null
  return (
    "this command takes no --agent-id: the seat above the new one is the seat running it, read " +
    "from AGENT_ID in its environment. Stating it was a way to name a seat you are not, and an " +
    "id copied off a listing reads exactly like the right one while the seat it names inherits a " +
    "hand-back it has no context for. Work for a different parent by setting AGENT_ID in the " +
    "environment of the call."
  )
}
