
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import {
  buildKeeperUnrevivableNotifyInput,
  type NotifyInput,
} from "../lib/keeper-unrevivable-push.ts"

interface Vector {
  readonly label: string
  readonly name: string
  readonly agentId: string
  readonly standing: NotifyInput
}

const VECTORS: readonly Vector[] = [
  {
    label: "a keeper and a short agent id",
    name: "athena",
    agentId: "a1",
    standing: {
      title: "athena is down and cannot be woken",
      body: "The recipient-resolver found athena (a1) absent with pending inbound work and tried to revive her. The revive did not take — she either never booted or came back without advancing past the revive baseline. Nothing has been restarted.",
      kind: "keeper-unrevivable",
      source: "supervisor",
    },
  },
  {
    label: "the uuid an agent row actually carries",
    name: "athena",
    agentId: "019ff7da-57c1-7796-87fa-e4c4773c47f9",
    standing: {
      title: "athena is down and cannot be woken",
      body: "The recipient-resolver found athena (019ff7da-57c1-7796-87fa-e4c4773c47f9) absent with pending inbound work and tried to revive her. The revive did not take — she either never booted or came back without advancing past the revive baseline. Nothing has been restarted.",
      kind: "keeper-unrevivable",
      source: "supervisor",
    },
  },
  {
    label: "no name at all",
    name: "",
    agentId: "a1",
    standing: {
      title: " is down and cannot be woken",
      body: "The recipient-resolver found  (a1) absent with pending inbound work and tried to revive her. The revive did not take — she either never booted or came back without advancing past the revive baseline. Nothing has been restarted.",
      kind: "keeper-unrevivable",
      source: "supervisor",
    },
  },
  {
    label: "no agent id at all",
    name: "athena",
    agentId: "",
    standing: {
      title: "athena is down and cannot be woken",
      body: "The recipient-resolver found athena () absent with pending inbound work and tried to revive her. The revive did not take — she either never booted or came back without advancing past the revive baseline. Nothing has been restarted.",
      kind: "keeper-unrevivable",
      source: "supervisor",
    },
  },
  {
    label: "a name outside ASCII",
    name: "aoife-ní-bhraonáin",
    agentId: "id-é",
    standing: {
      title: "aoife-ní-bhraonáin is down and cannot be woken",
      body: "The recipient-resolver found aoife-ní-bhraonáin (id-é) absent with pending inbound work and tried to revive her. The revive did not take — she either never booted or came back without advancing past the revive baseline. Nothing has been restarted.",
      kind: "keeper-unrevivable",
      source: "supervisor",
    },
  },
  {
    label: "quotes, a newline and tabs",
    name: 'she said "go"\nnow',
    agentId: "id\twith\ttabs",
    standing: {
      title: 'she said "go"\nnow is down and cannot be woken',
      body: 'The recipient-resolver found she said "go"\nnow (id\twith\ttabs) absent with pending inbound work and tried to revive her. The revive did not take — she either never booted or came back without advancing past the revive baseline. Nothing has been restarted.',
      kind: "keeper-unrevivable",
      source: "supervisor",
    },
  },
  {
    label: "text shaped like a template hole",
    name: "${name}",
    agentId: "`${agentId}`",
    standing: {
      title: "${name} is down and cannot be woken",
      body: "The recipient-resolver found ${name} (`${agentId}`) absent with pending inbound work and tried to revive her. The revive did not take — she either never booted or came back without advancing past the revive baseline. Nothing has been restarted.",
      kind: "keeper-unrevivable",
      source: "supervisor",
    },
  },
]

describe("the payload one proven-unrevivable keeper produces", () => {
  for (const vector of VECTORS) {
    it(`answers what the code repository answers — ${vector.label}`, () => {
      const ported = buildKeeperUnrevivableNotifyInput(vector.name, vector.agentId)
      const verdict = hold(`keeper-unrevivable-notify-input/${vector.label}`, vector.standing, ported)
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }
})
