import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Debounce } from '../src/utils/index'
let clock = vi.useFakeTimers() as any
beforeEach(() => {
  clock = vi.useFakeTimers()
})
afterEach(() => {
  vi.useRealTimers()
})
describe('debounce basic', () => {
  it('should return a function', () => {
    const fn = vi.fn<() => void>()
    const debounceFn = Debounce(fn, 10000)
    debounceFn()
    debounceFn()
    debounceFn()
    debounceFn()
    expect(fn).not.toHaveBeenCalled()
    expect(fn).not.toHaveBeenCalledTimes(1)
    expect(typeof debounceFn).toBe('function')
  })
})
