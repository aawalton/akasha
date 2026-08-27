export type InboxKey = "email" | "tasks" | "temperTasks" | "texts"

export const INBOX_KEYS: readonly InboxKey[] = ["email", "tasks", "temperTasks", "texts"]

export const COUNT_ATTR: Readonly<Partial<Record<InboxKey, string>>> = {
  tasks: "inbox-tasks",
  temperTasks: "inbox-temper-tasks",
  texts: "inbox-texts",
}

export const CLEARED_ATTR: Readonly<Partial<Record<InboxKey, string>>> = {
  tasks: "inbox-tasks-cleared-today",
  temperTasks: "inbox-temper-tasks-cleared-today",
  texts: "inbox-texts-cleared-today",
}
