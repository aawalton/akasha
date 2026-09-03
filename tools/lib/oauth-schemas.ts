import { shape } from "@akasha/utils-narrow/shape"

export const OAuthTokenResponseSchema = shape.looseObject({
  access_token: shape.string().min(1),
  refresh_token: shape.string().min(1),
  expires_in: shape.number(),
})

export const OAuthErrorEnvelopeSchema = shape.looseObject({
  error: shape.string().optional(),
  error_description: shape.string().optional(),
})

export const UsageWindowSchema = shape.looseObject({
  utilization: shape.number(),
  resets_at: shape.string().nullable(),
})

export const UsageResponseSchema = shape.looseObject({
  five_hour: UsageWindowSchema,
  seven_day: UsageWindowSchema,
})

export const ProfileResponseSchema = shape.looseObject({
  account: shape.looseObject({
    uuid: shape.string().min(1),
    email: shape.string().optional(),
  }),
})

export const AnthropicErrorEnvelopeSchema = shape.looseObject({
  type: shape.literal("error"),
  error: shape.looseObject({
    type: shape.string(),
    message: shape.string().optional(),
  }),
})
