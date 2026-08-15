export const DEFAULT_PORT = 3000

export function readPort(raw: string | undefined): number {
  if (raw === undefined) return DEFAULT_PORT
  const port = Number(raw)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`Invalid PORT: "${raw}" (expected an integer between 1 and 65535)`)
  }
  return port
}