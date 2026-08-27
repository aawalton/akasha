import * as appiumClientModule from "../../alanwalton/mobile-cli/src/lib/appium-client.ts"
import * as simDriverModule from "../../alanwalton/mobile-cli/src/lib/sim-driver.ts"
import * as simMacbookModule from "../../alanwalton/mobile-cli/src/lib/sim-macbook.ts"
import * as simSessionModule from "../../alanwalton/mobile-cli/src/lib/sim-session.ts"


export type SimMacbook = typeof simMacbookModule
export type AppiumClient = typeof appiumClientModule
export type SimDriver = typeof simDriverModule
export type SimSession = typeof simSessionModule

export async function simMacbook(): Promise<SimMacbook> {
  return simMacbookModule
}

export async function appiumClient(): Promise<AppiumClient> {
  return appiumClientModule
}

export async function simDriver(): Promise<SimDriver> {
  return simDriverModule
}

export async function simSession(): Promise<SimSession> {
  return simSessionModule
}
