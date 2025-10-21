import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import { ConfigProvider, theme as antdTheme } from 'antd'
import { corporateLightTheme } from '~/theme'

type UI = React.ReactElement
interface ExtraOptions {
    routerProps?: MemoryRouterProps
}

export function renderWithTheme(
    ui: UI,
    options?: RenderOptions & ExtraOptions
) {
    const { routerProps, ...rest } = options ?? {}
    return render(
        <ConfigProvider
            theme={corporateLightTheme ?? {
                algorithm: antdTheme.defaultAlgorithm
            }}
        >
            <MemoryRouter {...routerProps}>{ui}</MemoryRouter>
        </ConfigProvider>,
        rest
    )
}
