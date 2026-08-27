
import { CHANNEL_VECTORS } from "./prompt-shape-vectors-channel.ts"

export interface RecordedEnvelope {
  readonly source: string
  readonly sourceType: string
  readonly sender: string
  readonly text: string
}

export type RecordedShape =
  | { readonly kind: "channel"; readonly envelope: RecordedEnvelope }
  | { readonly kind: "bare"; readonly text: string }

export interface StandingAnswer {
  readonly parse: RecordedEnvelope | null
  readonly classify: RecordedShape
  readonly bare: boolean
  readonly alan: boolean
}

export type Vector = readonly [name: string, input: string, standing: StandingAnswer]

export const STANDING_CONSTANTS: Readonly<Record<string, string>> = {
  "CHANNEL_ENVELOPE_PREFIX": "<channel ",
  "SUPERVISOR_NOTICE_PREFIX": "[supervisor]",
  "TASK_NOTIFICATION_PREFIX": "<task-notification>",
  "SLASH_COMMAND_PREFIX": "/",
  "SYSTEM_SENDER": "system",
  "SYSTEM_SOURCE_TYPE": "system"
}

export const BARE_VECTORS: readonly Vector[] = [
  ["BARE prose", "hey nimue, did the deploy land?", {"parse":null,"classify":{"kind":"bare","text":"hey nimue, did the deploy land?"},"bare":true,"alan":true}],
  ["BARE mid-turn framing wrapper", "The user sent a new message while you were working: check the logs", {"parse":null,"classify":{"kind":"bare","text":"The user sent a new message while you were working: check the logs"},"bare":true,"alan":true}],
  ["BARE prose with surrounding whitespace", "   hey nimue   ", {"parse":null,"classify":{"kind":"bare","text":"   hey nimue   "},"bare":true,"alan":true}],
  ["BARE empty string", "", {"parse":null,"classify":{"kind":"bare","text":""},"bare":false,"alan":false}],
  ["BARE whitespace only", "   ", {"parse":null,"classify":{"kind":"bare","text":"   "},"bare":false,"alan":false}],
  ["BARE newlines only", "\n\n\t", {"parse":null,"classify":{"kind":"bare","text":"\n\n\t"},"bare":false,"alan":false}],
  ["BARE persona seed", "/persona-zadi", {"parse":null,"classify":{"kind":"bare","text":"/persona-zadi"},"bare":false,"alan":false}],
  ["BARE skill seed", "/probe", {"parse":null,"classify":{"kind":"bare","text":"/probe"},"bare":false,"alan":false}],
  ["BARE compact one-shot", "/compact keep the plan and the open questions", {"parse":null,"classify":{"kind":"bare","text":"/compact keep the plan and the open questions"},"bare":false,"alan":false}],
  ["BARE bare slash alone", "/", {"parse":null,"classify":{"kind":"bare","text":"/"},"bare":false,"alan":false}],
  ["BARE slash after leading whitespace (trim then test)", "   /compact keep the plan", {"parse":null,"classify":{"kind":"bare","text":"   /compact keep the plan"},"bare":false,"alan":false}],
  ["BARE slash mid-text, not leading", "run /compact when you can", {"parse":null,"classify":{"kind":"bare","text":"run /compact when you can"},"bare":true,"alan":true}],
  ["BARE supervisor notice", "[supervisor] You have been restarted.", {"parse":null,"classify":{"kind":"bare","text":"[supervisor] You have been restarted."},"bare":false,"alan":false}],
  ["BARE supervisor prefix alone", "[supervisor]", {"parse":null,"classify":{"kind":"bare","text":"[supervisor]"},"bare":false,"alan":false}],
  ["BARE supervisor prefix with leading whitespace", "  [supervisor] restarted", {"parse":null,"classify":{"kind":"bare","text":"  [supervisor] restarted"},"bare":false,"alan":false}],
  ["BARE supervisor-ish but wrong case", "[Supervisor] You have been restarted.", {"parse":null,"classify":{"kind":"bare","text":"[Supervisor] You have been restarted."},"bare":true,"alan":true}],
  ["BARE task notification", "<task-notification>\n<task-id>bd1rgnbij</task-id>\n<status>completed</status>\n<summary>Background command \"deploy\" completed (exit code 0)</summary>\n</task-notification>", {"parse":null,"classify":{"kind":"bare","text":"<task-notification>\n<task-id>bd1rgnbij</task-id>\n<status>completed</status>\n<summary>Background command \"deploy\" completed (exit code 0)</summary>\n</task-notification>"},"bare":false,"alan":false}],
  ["BARE task-notification prefix alone", "<task-notification>", {"parse":null,"classify":{"kind":"bare","text":"<task-notification>"},"bare":false,"alan":false}],
  ["BARE task-notification-ish but wrong spelling", "<task_notification>x</task_notification>", {"parse":null,"classify":{"kind":"bare","text":"<task_notification>x</task_notification>"},"bare":true,"alan":true}],
  ["prefix present, no closing tag", "<channel source=\"messages\" sender=\"system\" source_type=\"user\">\nunclosed", {"parse":null,"classify":{"kind":"bare","text":"<channel source=\"messages\" sender=\"system\" source_type=\"user\">\nunclosed"},"bare":true,"alan":true}],
  ["prefix present, no opening angle close", "<channel source=messages", {"parse":null,"classify":{"kind":"bare","text":"<channel source=messages"},"bare":true,"alan":true}],
  ["no space after channel, fast reject fires", "<channel>hi</channel>", {"parse":null,"classify":{"kind":"bare","text":"<channel>hi</channel>"},"bare":true,"alan":true}],
  ["channel word without the trailing space", "<channelx source=\"a\">hi</channelx>", {"parse":null,"classify":{"kind":"bare","text":"<channelx source=\"a\">hi</channelx>"},"bare":true,"alan":true}],
  ["prefix appears only in prose", "I typed <channel  by accident", {"parse":null,"classify":{"kind":"bare","text":"I typed <channel  by accident"},"bare":true,"alan":true}],
  ["closing tag only", "</channel>", {"parse":null,"classify":{"kind":"bare","text":"</channel>"},"bare":true,"alan":true}],
]

export const VECTORS: readonly Vector[] = [...BARE_VECTORS, ...CHANNEL_VECTORS]
