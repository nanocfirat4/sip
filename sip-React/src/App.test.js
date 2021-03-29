import { render, screen } from '@testing-library/react'
import App from './App'
test('not logged in does not render courses link', () => {
render(<App />)
const loginButton = screen.getByText('Login')
expect(loginButton).toBeInTheDocument()
const linkElement = screen.queryByText(/manage courses/i)
expect(linkElement).toBeNull()
})