export interface PendingConfirmBlock {
  readonly title: unknown
  readonly startTime: unknown
  readonly safetyLevel: unknown
  readonly difficultyLevel: unknown
}

export interface PendingConfirmQuestion {
  readonly id: string
  readonly title: unknown
  readonly createdAt: unknown
  readonly answeredAt: unknown
  readonly answer: unknown
}

export interface PendingConfirmContext {
  readonly questionId: string
  readonly asked: string | null
  readonly firedAt: string | null
  readonly answeredAt: string | null
  readonly answer: string | null
  readonly block: {
    readonly title: string | null
    readonly startTime: string | null
    readonly safetyLevel: string | null
    readonly difficultyLevel: string | null
  } | null
}

function str(value: unknown): string | null {
  if (typeof value === "string") return value === "" ? null : value
  if (typeof value === "number" && Number.isFinite(value)) return String(value)
  return null
}

export function buildPendingConfirmContext(input: {
  readonly question: PendingConfirmQuestion
  readonly block: PendingConfirmBlock | null
}): PendingConfirmContext {
  const { question, block } = input
  return {
    questionId: question.id,
    asked: str(question.title),
    firedAt: str(question.createdAt),
    answeredAt: str(question.answeredAt),
    answer: str(question.answer),
    block:
      block === null
        ? null
        : {
            title: str(block.title),
            startTime: str(block.startTime),
            safetyLevel: str(block.safetyLevel),
            difficultyLevel: str(block.difficultyLevel),
          },
  }
}

function blockLine(block: PendingConfirmContext["block"]): string {
  if (block === null) return "no block is open — his words have to say which one to reopen"
  const rated =
    block.safetyLevel !== null && block.difficultyLevel !== null
      ? ` — s${block.safetyLevel}d${block.difficultyLevel}`
      : " — unrated"
  const since = block.startTime === null ? "start unreadable" : `open since ${block.startTime}`
  return `${block.title ?? "untitled"}${rated}, ${since}`
}

function field(label: string, value: string | null): string {
  return `  ${label.padEnd(9)}${value ?? "—"}`
}

export function renderPendingConfirm(ctx: PendingConfirmContext): string {
  return [
    "Alan answered the hourly tracking confirmation in his own words — it needs applying by hand.",
    "",
    field("asked", ctx.asked),
    field("fired", ctx.firedAt),
    field("answered", ctx.answeredAt),
    field("answer", ctx.answer),
    field("block", blockLine(ctx.block)),
    field("question", ctx.questionId),
    "",
    "Apply it to the ledger by hand: the open block may need switching, a stretch he has",
    "already spent may need logging, or one already recorded may need editing. Which of those,",
    "and what boundary his words name, is your read — a custom answer exists precisely so it",
    "can name one in the past.",
    "",
    "Then the question above has to be stamped reconciled, or nothing closes the loop.",
    "Until that stamp lands the hourly stream stays halted: the emitter declines",
    "`awaiting-reconciliation` and asks nothing further. Alan is never re-prompted — the stream",
    "stopping when he stops answering is the design, and the stamp is what starts it again.",
  ].join("\n")
}
