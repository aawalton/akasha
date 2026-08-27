
export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export type Page = {
  id: string
  seq: number | null
  title: string | null
  icon: string | null
  slug: string | null
  userId: string
  pageTypeId: string
  pageTypeSlug: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  uniqueKey: string | null
  parentKey: string | null
  [key: string]: Json
} & { readonly __brand: "Page" }

export function Page(value: unknown): Page {
  return value as Page
}
