
export type HandoffVerdict =
  | { readonly kind: "ok" }
  | { readonly kind: "advisory"; readonly advisory: string }
  | { readonly kind: "refused"; readonly message: string }

export const PASSES: HandoffVerdict = { kind: "ok" }

export function advisory(text: string): HandoffVerdict {
  return { kind: "advisory", advisory: text }
}

export function refused(text: string): HandoffVerdict {
  return { kind: "refused", message: text }
}
