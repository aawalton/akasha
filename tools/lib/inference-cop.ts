import * as copAdminModule from "./inference/cli/cop-admin.ts"


export async function inferenceCop(): Promise<typeof copAdminModule> {
  return copAdminModule
}
