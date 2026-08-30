
import { basename } from "node:path"
import { pageStemOf } from "../../page/name/name"
import { createAgent, type RowAgentLaunch } from "./supervisor-agent-create.ts"
import { keepSeatSession, takeSeatPage } from "./supervisor-heartbeat-beat.ts"
import { launchFrom } from "./seat-flex.ts"
import { principalOf } from "./seat-principal.ts"
import { frontmatterOf, seatIdForName, seatPageForAgent } from "./seat-presence-read.ts"

const PAGE_SUFFIX = ".md"

const PRINCIPAL_KEY = "principal-seat-name"

export interface StatedAgentSlots {
  readonly role?: string
  readonly domain?: string
  readonly persona?: string
  readonly mode?: string
  readonly principal?: string
}

export interface ClearRebindDeps {
  readPredecessor: (agentId: string) => Promise<{
    name?: string | null
    title?: string | null
    launch?: string | null
    parent?: string | null
    role?: string | null
    domain?: string | null
    persona?: string | null
    mode?: string | null
    principal?: string | null
  } | null>
  markStopped: (agentId: string) => Promise<void>
  createSuccessor: (
    account: string,
    launch: RowAgentLaunch,
    parent: string | null
  ) => Promise<string>
  setSessionId: (agentId: string, sessionId: string) => Promise<void>
  bindAgentName: (
    agentId: string,
    name: string,
    displayTitle?: string,
    stated?: StatedAgentSlots
  ) => Promise<void>
}

function slugAt(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  return typeof held === "string" && held !== "" ? held : null
}

async function readPredecessor(agentId: string): Promise<{
  name: string | null
  title: string | null
  launch: string | null
  parent: string | null
  role: string | null
  persona: string | null
  principal: string | null
} | null> {
  const page = seatPageForAgent(agentId)
  if (page === null) return null
  const frontmatter = frontmatterOf(page)
  if (frontmatter === null) return null
  const name = pageStemOf(page)
  const above = slugAt(frontmatter, PRINCIPAL_KEY)
  return {
    name,
    title: slugAt(frontmatter, "title") ?? name,
    launch: launchFrom(frontmatter),
    parent: above === null ? null : seatIdForName(above),
    role: slugAt(frontmatter, "role-slug"),
    persona: slugAt(frontmatter, "persona-slug"),
    principal: principalOf(agentId)?.value ?? null,
  }
}

async function markStopped(agentId: string): Promise<void> {
  const taken = takeSeatPage(agentId, "it was rebound and a successor takes its place")
  if (taken.kind === "refused") {
    throw new Error(`the seat page for ${agentId} did not go: ${taken.detail}`)
  }
}

async function setSessionId(agentId: string, sessionId: string): Promise<void> {
  keepSeatSession(agentId, sessionId)
}

export function liveRebindDepsWith(
  bindAgentName: ClearRebindDeps["bindAgentName"]
): ClearRebindDeps {
  return {
    readPredecessor,
    markStopped,
    createSuccessor: createAgent,
    setSessionId,
    bindAgentName,
  }
}
