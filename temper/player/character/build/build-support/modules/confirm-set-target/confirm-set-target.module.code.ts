export function confirmingTarget<TArgs>(
  waiting: { readonly entityId: string } | null,
  setWaiting: (entity: null) => void,
  inTransition: (run: () => Promise<void>) => void,
  argsFor: (entityId: string) => TArgs | null,
  setTarget: (args: TArgs) => unknown
): () => void {
  return () => {
    if (waiting == null) return
    const entityId = waiting.entityId
    setWaiting(null)
    inTransition(async () => {
      const args = argsFor(entityId)
      if (args != null) await setTarget(args)
    })
  }
}
