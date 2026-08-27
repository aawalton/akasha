
import { type Outcome, skip } from "../../outcome/outcome"
import { type Roots } from "../../page/page"
import { targetRoot } from "../../repo/roots/roots"

export interface Subject {
  readonly relPath: string
  readonly body: string | Uint8Array
  readonly roots: Roots
  readonly agent: string | null
  readonly mechanical: boolean
  readonly exists: (absolutePath: string) => boolean
  readonly read: (absolutePath: string) => string | null
  readonly pending: ReadonlySet<string>
  readonly removing?: ReadonlySet<string>
}

export type Gate = (subject: Subject) => Outcome

export type CallGate = (subjects: readonly Subject[]) => Outcome

export function absolutePathOf(subject: Subject): string {
  return `${targetRoot(subject.roots)}/${subject.relPath}`
}

export function textOf(subject: Subject): string | null {
  return typeof subject.body === "string" ? subject.body : null
}

export function bytesOf(subject: Subject): Uint8Array {
  const body = subject.body
  return typeof body === "string" ? new TextEncoder().encode(body) : body
}

export function readsText(name: string): Outcome {
  return skip(name, "this body is bytes rather than text, and this gate reads a body as text")
}
