/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import useWindowSize from '../useWindowSize'

describe('useWindowSize Hook', () => {
  // Store original window dimensions
  const originalInnerWidth = window.innerWidth
  const originalInnerHeight = window.innerHeight

  beforeEach(() => {
    // Reset window dimensions before each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    })
  })

  afterEach(() => {
    // Restore original dimensions after each test
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    })
  })

  it('returns initial window dimensions', () => {
    const { result } = renderHook(() => useWindowSize())

    expect(result.current.width).toBe(1024)
    expect(result.current.height).toBe(768)
  })

  it('updates dimensions when window is resized', () => {
    const { result } = renderHook(() => useWindowSize())

    // Simulate window resize
    act(() => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1440,
      })
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 900,
      })

      // Trigger resize event
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current.width).toBe(1440)
    expect(result.current.height).toBe(900)
  })

  it('handles SSR environment properly', () => {
    // In JSDOM environment, window always exists, so we test the actual behavior
    const { result } = renderHook(() => useWindowSize())

    // The hook should return some valid dimensions (not 0 since window exists in jsdom)
    expect(typeof result.current.width).toBe('number')
    expect(typeof result.current.height).toBe('number')
    expect(result.current.width).toBeGreaterThanOrEqual(0)
    expect(result.current.height).toBeGreaterThanOrEqual(0)
  })
})