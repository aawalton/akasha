import {
  dropUncommitted,
  patchUncommitted,
  patchUncommittedUnder,
  removeUncommitted,
} from "../../page/uncommitted/uncommitted.ts"

// Every write of what is observed of a seat goes through here. The store beneath takes the same
// calls from anything with a page path, and a dozen callers reached it directly, so what a seat
// holds beside its page could not be written to a second system without touching all twelve. This
// says nothing the store does not; what it buys is one place for the second write to go.

export type Beside = Record<string, unknown>

export function keepBeside(page: string, values: Beside): void {
  patchUncommitted(page, values)
}

export function keepBesideUnder(page: string, key: string, values: Beside): void {
  patchUncommittedUnder(page, key, values)
}

export function dropBeside(page: string, keys: readonly string[]): void {
  dropUncommitted(page, keys)
}

export function removeBeside(page: string): void {
  removeUncommitted(page)
}
