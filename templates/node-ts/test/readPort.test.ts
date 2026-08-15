import { describe, expect, it } from 'vitest'
import { DEFAULT_PORT, readPort } from '../src/readPort'

describe('readPort', () => {
  it('returns the default when unset', () => {
    expect(readPort(undefined)).toBe(DEFAULT_PORT)
  })
  it('parses a valid port', () => {
    expect(readPort('8080')).toBe(8080)
  })
  it('rejects invalid ports', () => {
    expect(() => readPort('not-a-number')).toThrow()
    expect(() => readPort('0')).toThrow()
    expect(() => readPort('70000')).toThrow()
  })
})