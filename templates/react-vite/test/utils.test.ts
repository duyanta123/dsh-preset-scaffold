import { describe, expect, it } from 'vitest'
import { formatCount } from '../src/utils'

describe('formatCount', () => {
  it('formats a count', () => {
    expect(formatCount(3)).toBe('Count: 3')
  })
})