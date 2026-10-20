import { connection } from "next/server"

const jinjaTime = { timeZone: "Africa/Kampala" } as const

async function jinjaNow() {
  await connection()
  return new Date()
}

export async function CurrentMonth() {
  const now = await jinjaNow()
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    ...jinjaTime,
  }).format(now)
}

export async function CurrentYear() {
  const now = await jinjaNow()
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    ...jinjaTime,
  }).format(now)
}
