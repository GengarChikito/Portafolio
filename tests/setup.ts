// test/setup.ts
import '@testing-library/jest-dom'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Limpia el DOM entre tests (evita fugas de estado/estilos)
afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
})

// --- matchMedia (AntD usa esto para responsive) ---
if (!('matchMedia' in window)) {
    // @ts-expect-error polyfill
    window.matchMedia = (query: string) => {
        let listeners: Array<(e: MediaQueryListEvent) => void> = []

        const mql: MediaQueryList = {
            media: query,
            matches: false,
            onchange: null,
            addEventListener: (_type: 'change', fn: (e: MediaQueryListEvent) => void) => {
                listeners.push(fn)
            },
            removeEventListener: (_type: 'change', fn: (e: MediaQueryListEvent) => void) => {
                listeners = listeners.filter(l => l !== fn)
            },
            dispatchEvent: (_e: Event) => true,
            // Métodos legacy (algunos componentes aún los consultan)
            addListener: vi.fn(),
            removeListener: vi.fn()
        } as unknown as MediaQueryList

        return mql
    }
}

// --- ResizeObserver (AntD Table/Componentes que miden layout) ---
if (!('ResizeObserver' in window)) {
    class RO implements ResizeObserver {
        observe: ResizeObserver['observe'] = vi.fn()
        unobserve: ResizeObserver['unobserve'] = vi.fn()
        disconnect: ResizeObserver['disconnect'] = vi.fn()
    }
    // @ts-expect-error polyfill
    window.ResizeObserver = RO
}

// --- Noops útiles para JSDOM ---
if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = () => {}
}

if (!('scrollTo' in window)) {
    // @ts-expect-error noop
    window.scrollTo = () => {}
}
