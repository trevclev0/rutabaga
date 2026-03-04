import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, it, expect } from 'vitest'
import { Provider } from 'jotai'
import { HomePage } from '@/pages/HomePage'

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <Provider>
        <HomePage />
      </Provider>
    )
  });

  it('renders the welcome message', () => {
    expect(screen.getByText(/^Welcome to Rutabaga 🥔$/i)).toBeInTheDocument()
  })

  it('increments the counter on click', async () => {
    const user = userEvent.setup()

    expect(screen.getByRole('button', { name: /^Count: 0$/i })).toBeInTheDocument()
    expect(screen.getByText(/^\(doubled: 0\)$/i)).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /^Count: 0$/i })
    await user.click(button)
    expect(screen.getByRole('button', { name: /^Count: 1$/i })).toBeInTheDocument()
    expect(screen.getByText(/^\(doubled: 2\)$/i)).toBeInTheDocument()
  })
})
