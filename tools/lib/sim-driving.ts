import * as appiumClientModule from "@akasha/mobile-cli/appium-client"
import * as simDriverModule from "@akasha/mobile-cli/sim-driver"
import * as simMacbookModule from "@akasha/mobile-cli/sim-macbook"
import * as simSessionModule from "@akasha/mobile-cli/sim-session"


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
