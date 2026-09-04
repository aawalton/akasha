export interface VerdictCoverage {
  readonly observed: number
  readonly declared: number | null
  readonly unit: string
}

export interface VerdictReach {
  readonly examined: number
  readonly unexaminable: number
}

export interface VerdictFinding {
  readonly detail: string
  readonly at: string | null
}

interface VerdictClaim<Subject extends string> {
  readonly subject: Subject
  readonly reason: string
  readonly observedAtMs: number
}

export interface VerdictPass<Subject extends string, Evidence> extends VerdictClaim<Subject> {
  readonly kind: "pass"
  readonly coverage: VerdictCoverage
  readonly evidence: Evidence
}

export interface VerdictFail<Subject extends string, Evidence> extends VerdictClaim<Subject> {
  readonly kind: "fail"
  readonly coverage: VerdictCoverage
  readonly evidence: Evidence
  readonly findings: readonly [VerdictFinding, ...(readonly VerdictFinding[])]
}

export type Verdict<Subject extends string, Evidence> =
  | VerdictPass<Subject, Evidence>
  | VerdictFail<Subject, Evidence>

export type AnyVerdict = Verdict<string, unknown>
