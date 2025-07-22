/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '../layout/Navigation'

// Mock the scrollIntoView function
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: jest.fn(),
  writable: true,
})

describe('Navigation Component', () => {
  it('renders the navigation with correct brand name', () => {
    render(<Navigation />)
    
    // Check if brand name is rendered
    expect(screen.getByText('Destiny Khongraj')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navigation />)
    
    // Check if all navigation buttons are present
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
  })

  it('calls scrollToSection when navigation button is clicked', () => {
    render(<Navigation />)
    
    // Mock getElementById to return a fake element
    const mockElement = { scrollIntoView: jest.fn() }
    document.getElementById = jest.fn().mockReturnValue(mockElement)
    
    // Click on Home button
    fireEvent.click(screen.getByText('Home'))
    
    // Check if scrollIntoView was called
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('applies correct CSS classes for styling', () => {
    render(<Navigation />)
    
    // Check if navigation has correct classes for backdrop blur and positioning
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('fixed', 'top-0', 'backdrop-blur-lg')
  })
})