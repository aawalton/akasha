
export type Recording = Record<string, unknown>

export const STANDING_RECORDINGS: Readonly<Record<string, Recording>> = {
  "no processes": {
    "exitCode": 0,
    "handoff": null,
    "stderr": null
  },
  "only non-interactive": {
    "exitCode": 0,
    "handoff": null,
    "stderr": null
  },
  "interactive with null proc": {
    "exitCode": 0,
    "handoff": null,
    "stderr": null
  },
  "interactive pid zero": {
    "exitCode": 0,
    "handoff": null,
    "stderr": null
  },
  "interactive pid negative": {
    "exitCode": 0,
    "handoff": null,
    "stderr": null
  },
  "interactive pid undefined": {
    "exitCode": 0,
    "handoff": null,
    "stderr": null
  },
  "interactive pid string": {
    "exitCode": 0,
    "handoff": null,
    "stderr": null
  },
  "interactive with explicit configDir": {
    "exitCode": 0,
    "handoff": {
      "pid": 4242,
      "processId": "p-explicit",
      "account": "acct-explicit",
      "configDir": "/explicit/config/dir",
      "agentId": "agent-explicit",
      "sessionId": "session-explicit"
    },
    "stderr": null
  },
  "interactive with null configDir derives from account": {
    "exitCode": 0,
    "handoff": {
      "pid": 4242,
      "processId": "p-derived",
      "account": "acct-derived",
      "configDir": "<ARM_HOME>/.claude/accounts/acct-derived",
      "agentId": "agent-derived",
      "sessionId": "session-derived"
    },
    "stderr": null
  },
  "non-interactive first then interactive": {
    "exitCode": 0,
    "handoff": {
      "pid": 2222,
      "processId": "p-taken",
      "account": "arm-account",
      "configDir": "/arm/config",
      "agentId": "agent-1",
      "sessionId": "session-1"
    },
    "stderr": null
  },
  "two interactive picks first": {
    "exitCode": 0,
    "handoff": {
      "pid": 3333,
      "processId": "p-first",
      "account": "arm-account",
      "configDir": "/arm/config",
      "agentId": "agent-1",
      "sessionId": "session-1"
    },
    "stderr": null
  },
  "unusable interactive then usable interactive": {
    "exitCode": 0,
    "handoff": {
      "pid": 5555,
      "processId": "p-usable",
      "account": "arm-account",
      "configDir": "/arm/config",
      "agentId": "agent-1",
      "sessionId": "session-1"
    },
    "stderr": null
  },
  "exec carries claude and proxy owner": {
    "exitCode": 0,
    "inherited": [
      "_SUPERVISOR_INHERIT_CLAUDE_ACCOUNT=acct-exec",
      "_SUPERVISOR_INHERIT_CLAUDE_AGENT_ID=agent-exec",
      "_SUPERVISOR_INHERIT_CLAUDE_CONFIG_DIR=/exec/config/dir",
      "_SUPERVISOR_INHERIT_CLAUDE_PID=4242",
      "_SUPERVISOR_INHERIT_CLAUDE_PROCESS_ID=p-exec",
      "_SUPERVISOR_INHERIT_CLAUDE_SESSION_ID=session-exec",
      "_SUPERVISOR_INHERIT_OAUTH_PROXY_OWNER_AGENT_ID=owner-exec"
    ],
    "replacedImage": true
  },
  "exec with nothing to inherit": {
    "exitCode": 0,
    "inherited": [],
    "replacedImage": true
  },
  "exec with proxy owner only": {
    "exitCode": 0,
    "inherited": [
      "_SUPERVISOR_INHERIT_OAUTH_PROXY_OWNER_AGENT_ID=owner-alone"
    ],
    "replacedImage": true
  },
  "exec with empty proxy owner": {
    "exitCode": 0,
    "inherited": [],
    "replacedImage": true
  },
  "exec failure returns to the caller": {
    "exitCode": 0,
    "returnedToCaller": true,
    "logPrefix": "[local] execvpe re-exec failed, falling back to Bun.spawn:"
  }
}
