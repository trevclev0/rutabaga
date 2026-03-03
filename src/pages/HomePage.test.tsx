import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { Provider } from 'jotai'
import { HomePage } from '@/pages/HomePage'

describe('HomePage', () => {
  it('renders the welcome message', () => {
    render(
      <Provider>
        <HomePage />
      </Provider>
    )
    expect(screen.getByText(/Welcome to Rutabaga/i)).toBeInTheDocument()
  })

  it('increments the counter on click', async () => {
    const user = userEvent.setup()

    render(
      <Provider>
        <HomePage />
      </Provider>
    )

    const button = screen.getByRole('button', { name: /Count: 0/i })
    await user.click(button)
    expect(screen.getByRole('button', { name: /Count: 1/i })).toBeInTheDocument()
  })
})
