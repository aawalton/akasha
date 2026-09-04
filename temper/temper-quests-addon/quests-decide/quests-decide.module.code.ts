export type ChatterOptionKind =
  | "persuade-intimidate"
  | "accept-quest"
  | "advance-quest"
  | "complete-quest"
  | "folium-skill-point"
  | "talk"
  | "service"
  | "blocked"
  | "goodbye"

export interface ClassifiedChatterOption {
  readonly index: number
  readonly kind: ChatterOptionKind
  readonly chosenBefore?: boolean
}

export interface AutoQuestSnapshot {
  readonly inChatter: boolean
  readonly offerPending: boolean
  readonly options: readonly ClassifiedChatterOption[]
  readonly menuFingerprint: string
}

export interface SelectedOption {
  readonly fingerprint: string
  readonly index: number
}

export interface AutoQuestMemory {
  readonly visitedExploreKeys: ReadonlySet<string>
  readonly lastSelected: SelectedOption | undefined
  readonly questActed: boolean
  readonly pendingCompletion: boolean
  readonly sawMenu: boolean
}

export const INITIAL_AUTO_QUEST_MEMORY: AutoQuestMemory = {
  visitedExploreKeys: new Set<string>(),
  lastSelected: undefined,
  questActed: false,
  pendingCompletion: false,
  sawMenu: false,
}

export type SelectReason =
  | "persuade-intimidate"
  | "accept-quest"
  | "advance-quest"
  | "complete-quest"
  | "folium-skill-point"
  | "explore"
  | "goodbye"

export type EndInteractionReason =
  | "exhausted-no-goodbye"
  | "exit-over-service-no-goodbye"
  | "zero-option-after-menu"

export type ReconcileAction =
  | { readonly kind: "accept-offer" }
  | { readonly kind: "complete-quest" }
  | { readonly kind: "select"; readonly index: number; readonly reason: SelectReason }
  | { readonly kind: "end-interaction"; readonly reason: EndInteractionReason }
  | { readonly kind: "none" }

export interface ReconcileResult {
  readonly action: ReconcileAction
  readonly memory: AutoQuestMemory
}

export function exploreKey(menuFingerprint: string, index: number): string {
  return `${menuFingerprint}${index}`
}

function addVisited(visited: ReadonlySet<string>, key: string): ReadonlySet<string> {
  const next = new Set<string>()
  for (const k of visited) next.add(k)
  next.add(key)
  return next
}

function decideMenu(
  options: readonly ClassifiedChatterOption[],
  menuFingerprint: string,
  memory: AutoQuestMemory
): ReconcileAction {
  const persuade = options.find((o) => o.kind === "persuade-intimidate")
  if (persuade !== undefined) {
    return { kind: "select", index: persuade.index, reason: "persuade-intimidate" }
  }

  const folium = options.find((o) => o.kind === "folium-skill-point")
  if (folium !== undefined) {
    return { kind: "select", index: folium.index, reason: "folium-skill-point" }
  }

  const accept = options.find((o) => o.kind === "accept-quest")
  if (accept !== undefined) {
    return { kind: "select", index: accept.index, reason: "accept-quest" }
  }

  const advance = options.find((o) => o.kind === "advance-quest")
  if (advance !== undefined) {
    return { kind: "select", index: advance.index, reason: "advance-quest" }
  }

  const complete = options.find((o) => o.kind === "complete-quest")
  if (complete !== undefined) {
    return { kind: "select", index: complete.index, reason: "complete-quest" }
  }

  const next = options.find(
    (o) =>
      o.kind === "talk" &&
      o.chosenBefore !== true &&
      !memory.visitedExploreKeys.has(exploreKey(menuFingerprint, o.index))
  )
  if (next !== undefined) {
    return { kind: "select", index: next.index, reason: "explore" }
  }

  const goodbye = options.find((o) => o.kind === "goodbye")

  if (memory.questActed) {
    if (goodbye !== undefined) {
      return { kind: "select", index: goodbye.index, reason: "goodbye" }
    }
    return { kind: "end-interaction", reason: "exit-over-service-no-goodbye" }
  }

  const hasService = options.some((o) => o.kind === "service")
  if (hasService) return { kind: "none" }

  if (goodbye !== undefined) {
    return { kind: "select", index: goodbye.index, reason: "goodbye" }
  }

  return { kind: "end-interaction", reason: "exhausted-no-goodbye" }
}

export function reconcileAutoQuest(
  snapshot: AutoQuestSnapshot,
  memory: AutoQuestMemory
): ReconcileResult {
  if (snapshot.offerPending) {
    return { action: { kind: "accept-offer" }, memory: { ...memory, questActed: true } }
  }

  if (memory.pendingCompletion) {
    return {
      action: { kind: "complete-quest" },
      memory: { ...memory, pendingCompletion: false, questActed: true },
    }
  }

  if (!snapshot.inChatter) {
    return { action: { kind: "none" }, memory: INITIAL_AUTO_QUEST_MEMORY }
  }

  if (snapshot.options.length === 0) {
    const action: ReconcileAction = memory.sawMenu
      ? { kind: "end-interaction", reason: "zero-option-after-menu" }
      : { kind: "none" }
    return { action, memory }
  }

  const seen: AutoQuestMemory = memory.sawMenu ? memory : { ...memory, sawMenu: true }
  const action = decideMenu(snapshot.options, snapshot.menuFingerprint, seen)

  if (
    action.kind === "end-interaction" &&
    seen.lastSelected !== undefined &&
    seen.lastSelected.fingerprint === snapshot.menuFingerprint
  ) {
    return { action: { kind: "none" }, memory: seen }
  }

  if (action.kind !== "select") {
    return { action, memory: seen }
  }

  const last = seen.lastSelected
  if (
    last !== undefined &&
    last.fingerprint === snapshot.menuFingerprint &&
    last.index === action.index
  ) {
    return { action: { kind: "none" }, memory: seen }
  }

  const visited =
    action.reason === "explore"
      ? addVisited(seen.visitedExploreKeys, exploreKey(snapshot.menuFingerprint, action.index))
      : seen.visitedExploreKeys

  return {
    action,
    memory: {
      ...seen,
      visitedExploreKeys: visited,
      lastSelected: { fingerprint: snapshot.menuFingerprint, index: action.index },
    },
  }
}
