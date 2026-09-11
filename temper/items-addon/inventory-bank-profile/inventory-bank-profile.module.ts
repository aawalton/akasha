import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryBankProfile = {
  id: "01a06258-b528-7319-9474-9104dd1e0e97",
  type: "module",
  slug: "inventory-bank-profile",
  definition: "recording a profiler capture over one bank session and finalizing it afterwards",
  code: "ts",
} as const satisfies Module
