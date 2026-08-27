export type RemediationDoc = string & { readonly __brand: "RemediationDoc" }

function RemediationDoc(path: string): RemediationDoc {
  return path as RemediationDoc
}

type RepoDocPath =
  | `apps/${string}`
  | `docs/${string}`
  | `infra/${string}`
  | `scripts/${string}`
  | `tools/${string}`

type NotMarkdown<S extends string> = S extends `${string}.md` ? never : S

export function repoDoc<const S extends RepoDocPath>(path: S & NotMarkdown<S>): RemediationDoc {
  return RemediationDoc(path)
}

type NoCoupling<S extends string> = string extends S
  ? never
  : S extends `${string}~/instructions${string}`
    ? never
    : S

export function remediationHint<const S extends string>(text: S & NoCoupling<S>): RemediationDoc {
  return RemediationDoc(text)
}
