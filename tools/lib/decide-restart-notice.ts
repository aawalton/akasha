
export interface RestartPreserveEvent {
  readonly action: "restart_preserve"
  readonly interruptMessage: string | null
}

export interface ResumeNotices {
  readonly "restart-immediate": string
  readonly "restart-deferred": string
  readonly "restart-recovery-clause": string
}

export type RestartNoticeRoute = "spawn-argv" | "rail"

function selectRestartNoticeBody(
  event: RestartPreserveEvent,
  ctx: { maintenance: boolean; reExecPending: boolean },
  notices: ResumeNotices
): { route: RestartNoticeRoute; body: string } {
  if (ctx.maintenance) {
    return { route: "rail", body: notices["restart-deferred"] }
  }
  return {
    route: ctx.reExecPending ? "rail" : "spawn-argv",
    body: event.interruptMessage ?? notices["restart-immediate"],
  }
}

export function planRestartNotice(
  event: RestartPreserveEvent,
  ctx: { maintenance: boolean; reExecPending: boolean },
  notices: ResumeNotices
): { route: RestartNoticeRoute; notice: string } {
  const { route, body } = selectRestartNoticeBody(event, ctx, notices)
  const clause = notices["restart-recovery-clause"]
  return { route, notice: clause === "" ? body : `${body}\n\n${clause}` }
}
