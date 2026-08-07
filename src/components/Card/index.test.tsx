import { render, screen } from '@testing-library/react'

import { Card } from '.'

describe('Card component', () => {
  it('should render its children', () => {
    render(
      <Card>
        <span>Content</span>
      </Card>,
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
