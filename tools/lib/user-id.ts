
import { shape } from "./shape.ts"

export const USER_ID = shape
  .string()
  .default("9ba554f7-cb18-48bb-a709-ec935a895ca7")
  .parse(process.env.USER_ID)
