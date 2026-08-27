
import {
  AnthropicErrorEnvelopeSchema,
  OAuthErrorEnvelopeSchema,
  OAuthTokenResponseSchema,
  ProfileResponseSchema,
  UsageResponseSchema,
  UsageWindowSchema,
} from "../lib/oauth-schemas.ts"

export const nn = (value: unknown): unknown => (value === undefined ? null : value)

export interface Parses {
  safeParse: (value: unknown) => { success: boolean; data?: unknown }
}

export interface Vector {
  readonly id: string
  readonly schema: Parses
  readonly input: unknown
  readonly project?: (data: any) => Record<string, unknown>
}

export function answer(vector: Vector): Record<string, unknown> {
  const result = vector.schema.safeParse(vector.input)
  if (!result.success) return { success: false }
  return { success: true, ...(vector.project ? vector.project(result.data) : {}) }
}

const REAL_USAGE_BODY = {
  five_hour: {
    utilization: 0,
    resets_at: null,
    limit_dollars: null,
    used_dollars: null,
    remaining_dollars: null,
  },
  seven_day: {
    utilization: 0,
    resets_at: "2026-07-18T09:59:59.962676+00:00",
    limit_dollars: null,
    used_dollars: null,
    remaining_dollars: null,
  },
  seven_day_opus: null,
  seven_day_sonnet: null,
  extra_usage: { is_enabled: false, monthly_limit: 17900, used_credits: 0 },
  limits: [
    { kind: "session", group: "session", percent: 0, severity: "normal", is_active: true },
    { kind: "weekly_all", group: "weekly", percent: 0, severity: "normal", is_active: false },
  ],
  spend: { percent: 0, enabled: false },
  member_dashboard_available: false,
}

const PERMISSION_MESSAGE =
  "Your organization has disabled Claude subscription access for Claude Code"

export const VECTORS: readonly Vector[] = [
  {
    id: "token/canonical",
    schema: OAuthTokenResponseSchema,
    input: { access_token: "at", refresh_token: "rt", expires_in: 3600 },
    project: (d) => ({
      access_token: d.access_token,
      refresh_token: d.refresh_token,
      expires_in: d.expires_in,
    }),
  },
  {
    id: "token/unknown-keys",
    schema: OAuthTokenResponseSchema,
    input: {
      access_token: "at",
      refresh_token: "rt",
      expires_in: 3600,
      token_type: "Bearer",
      scope: "user:profile",
      id_token: "id",
    },
  },
  {
    id: "token/no-access-token",
    schema: OAuthTokenResponseSchema,
    input: { refresh_token: "rt", expires_in: 3600 },
  },
  {
    id: "token/expires-in-string",
    schema: OAuthTokenResponseSchema,
    input: { access_token: "at", refresh_token: "rt", expires_in: "3600" },
  },
  { id: "token/empty-object", schema: OAuthTokenResponseSchema, input: {} },
  {
    id: "token/blank-access-token",
    schema: OAuthTokenResponseSchema,
    input: { access_token: "", refresh_token: "rt", expires_in: 3600 },
  },
  {
    id: "token/blank-refresh-token",
    schema: OAuthTokenResponseSchema,
    input: { access_token: "at", refresh_token: "", expires_in: 3600 },
  },

  {
    id: "oauth-error/canonical",
    schema: OAuthErrorEnvelopeSchema,
    input: { error: "invalid_grant", error_description: "Refresh token expired" },
    project: (d) => ({ error: nn(d.error), error_description: nn(d.error_description) }),
  },
  {
    id: "oauth-error/only-error",
    schema: OAuthErrorEnvelopeSchema,
    input: { error: "invalid_request" },
  },
  { id: "oauth-error/empty-object", schema: OAuthErrorEnvelopeSchema, input: {} },
  {
    id: "oauth-error/unknown-keys",
    schema: OAuthErrorEnvelopeSchema,
    input: { error: "invalid_grant", error_uri: "https://example.com/docs" },
  },
  { id: "oauth-error/error-number", schema: OAuthErrorEnvelopeSchema, input: { error: 42 } },

  {
    id: "usage/real-body",
    schema: UsageResponseSchema,
    input: REAL_USAGE_BODY,
    project: (d) => ({
      fiveHourUtilization: d.five_hour.utilization,
      sevenDayUtilization: d.seven_day.utilization,
      sevenDayResetsAt: nn(d.seven_day.resets_at),
    }),
  },
  {
    id: "usage/null-resets-at",
    schema: UsageResponseSchema,
    input: {
      five_hour: { utilization: 0, resets_at: null },
      seven_day: { utilization: 0, resets_at: null },
    },
    project: (d) => ({ fiveHourResetsAt: nn(d.five_hour.resets_at) }),
  },
  {
    id: "usage/mid-window",
    schema: UsageResponseSchema,
    input: {
      five_hour: { utilization: 99, resets_at: "2026-07-18T10:09:59Z" },
      seven_day: { utilization: 92, resets_at: "2026-07-18T09:59:59Z" },
    },
    project: (d) => ({ sevenDayUtilization: d.seven_day.utilization }),
  },
  {
    id: "usage/window-missing-utilization",
    schema: UsageResponseSchema,
    input: {
      five_hour: { utilization: 0, resets_at: null },
      seven_day: { resets_at: "2026-07-18T09:59:59Z" },
    },
  },
  {
    id: "usage/utilization-non-numeric",
    schema: UsageResponseSchema,
    input: {
      five_hour: { utilization: 0, resets_at: null },
      seven_day: { utilization: "92", resets_at: "2026-07-18T09:59:59Z" },
    },
  },
  {
    id: "usage/window-absent",
    schema: UsageResponseSchema,
    input: { five_hour: { utilization: 0, resets_at: null } },
  },
  {
    id: "usage/window-null",
    schema: UsageResponseSchema,
    input: { five_hour: null, seven_day: { utilization: 0, resets_at: null } },
  },

  {
    id: "anthropic-error/canonical",
    schema: AnthropicErrorEnvelopeSchema,
    input: { type: "error", error: { type: "permission_error", message: PERMISSION_MESSAGE } },
    project: (d) => ({ errorType: d.error.type, errorMessage: nn(d.error.message) }),
  },
  {
    id: "anthropic-error/no-message",
    schema: AnthropicErrorEnvelopeSchema,
    input: { type: "error", error: { type: "permission_error" } },
  },
  {
    id: "anthropic-error/other-type",
    schema: AnthropicErrorEnvelopeSchema,
    input: { type: "error", error: { type: "rate_limit_error", message: "..." } },
    project: (d) => ({ errorType: d.error.type }),
  },
  {
    id: "anthropic-error/no-outer-type",
    schema: AnthropicErrorEnvelopeSchema,
    input: { error: { type: "permission_error" } },
  },
  {
    id: "anthropic-error/outer-type-not-error",
    schema: AnthropicErrorEnvelopeSchema,
    input: { type: "message", error: { type: "permission_error" } },
  },
  {
    id: "anthropic-error/no-error-type",
    schema: AnthropicErrorEnvelopeSchema,
    input: { type: "error", error: { message: "..." } },
  },
  {
    id: "anthropic-error/error-not-object",
    schema: AnthropicErrorEnvelopeSchema,
    input: { type: "error", error: "permission_error" },
  },
  {
    id: "anthropic-error/unknown-keys",
    schema: AnthropicErrorEnvelopeSchema,
    input: {
      type: "error",
      error: { type: "permission_error", message: "...", code: "OAUTH_ORG" },
      request_id: "req_abc123",
    },
  },

  {
    id: "profile/canonical",
    schema: ProfileResponseSchema,
    input: { account: { uuid: "acct-uuid-1", email: "alan@example.com" } },
    project: (d) => ({ uuid: d.account.uuid, email: nn(d.account.email) }),
  },
  {
    id: "profile/no-email",
    schema: ProfileResponseSchema,
    input: { account: { uuid: "acct-uuid-1" } },
    project: (d) => ({ uuid: d.account.uuid, email: nn(d.account.email) }),
  },
  { id: "profile/blank-uuid", schema: ProfileResponseSchema, input: { account: { uuid: "" } } },
  { id: "profile/no-uuid", schema: ProfileResponseSchema, input: { account: {} } },
  { id: "profile/no-account", schema: ProfileResponseSchema, input: {} },
  {
    id: "profile/observed-siblings",
    schema: ProfileResponseSchema,
    input: {
      account: {
        uuid: "acct-uuid-1",
        email: "alan@example.com",
        organization: { uuid: "org-1" },
        application: { name: "claude" },
        enabled_plugins: [],
      },
    },
    project: (d) => ({ uuid: d.account.uuid, email: nn(d.account.email) }),
  },
  {
    id: "profile/email-number",
    schema: ProfileResponseSchema,
    input: { account: { uuid: "acct-uuid-1", email: 42 } },
  },
  { id: "profile/account-null", schema: ProfileResponseSchema, input: { account: null } },

  {
    id: "window/loose-siblings",
    schema: UsageWindowSchema,
    input: { utilization: 50, resets_at: null, limit_dollars: null },
    project: (d) => ({ utilization: d.utilization, resets_at: nn(d.resets_at) }),
  },
  {
    id: "window/utilization-null",
    schema: UsageWindowSchema,
    input: { utilization: null, resets_at: null },
  },
]

export const STANDING: Readonly<Record<string, Record<string, unknown>>> = {
  "token/canonical": { success: true, access_token: "at", refresh_token: "rt", expires_in: 3600 },
  "token/unknown-keys": { success: true },
  "token/no-access-token": { success: false },
  "token/expires-in-string": { success: false },
  "token/empty-object": { success: false },
  "token/blank-access-token": { success: false },
  "token/blank-refresh-token": { success: false },
  "oauth-error/canonical": {
    success: true,
    error: "invalid_grant",
    error_description: "Refresh token expired",
  },
  "oauth-error/only-error": { success: true },
  "oauth-error/empty-object": { success: true },
  "oauth-error/unknown-keys": { success: true },
  "oauth-error/error-number": { success: false },
  "usage/real-body": {
    success: true,
    fiveHourUtilization: 0,
    sevenDayUtilization: 0,
    sevenDayResetsAt: "2026-07-18T09:59:59.962676+00:00",
  },
  "usage/null-resets-at": { success: true, fiveHourResetsAt: null },
  "usage/mid-window": { success: true, sevenDayUtilization: 92 },
  "usage/window-missing-utilization": { success: false },
  "usage/utilization-non-numeric": { success: false },
  "usage/window-absent": { success: false },
  "usage/window-null": { success: false },
  "anthropic-error/canonical": {
    success: true,
    errorType: "permission_error",
    errorMessage: PERMISSION_MESSAGE,
  },
  "anthropic-error/no-message": { success: true },
  "anthropic-error/other-type": { success: true, errorType: "rate_limit_error" },
  "anthropic-error/no-outer-type": { success: false },
  "anthropic-error/outer-type-not-error": { success: false },
  "anthropic-error/no-error-type": { success: false },
  "anthropic-error/error-not-object": { success: false },
  "anthropic-error/unknown-keys": { success: true },
  "profile/canonical": { success: true, uuid: "acct-uuid-1", email: "alan@example.com" },
  "profile/no-email": { success: true, uuid: "acct-uuid-1", email: null },
  "profile/blank-uuid": { success: false },
  "profile/no-uuid": { success: false },
  "profile/no-account": { success: false },
  "profile/observed-siblings": { success: true, uuid: "acct-uuid-1", email: "alan@example.com" },
  "profile/email-number": { success: false },
  "profile/account-null": { success: false },
  "window/loose-siblings": { success: true, utilization: 50, resets_at: null },
  "window/utilization-null": { success: false },
}
