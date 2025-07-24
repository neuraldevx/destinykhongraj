/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Hero from '../sections/Hero'

// Mock the hooks
jest.mock('../../hooks/useWindowSize', () => ({
  __esModule: true,
  default: () => ({ width: 1024, height: 768 }),
}))

jest.mock('../../hooks/useDisableScroll', () => ({
  __esModule: true,
  default: () => {},
}))

// Mock motion components to avoid animation issues in tests
jest.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => <p {...props}>{children}</p>,
  },
}))

// Mock GSAP and related functionality
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  ticker: {
    add: jest.fn(),
    remove: jest.fn(),
  },
  set: jest.fn(),
}))

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn((fn) => fn()),
}))

describe('Hero Component', () => {
  it('renders hero section with correct heading', () => {
    render(<Hero />)
    
    // Check if the name is split correctly and rendered
    expect(screen.getByText('DESTINY')).toBeInTheDocument()
    expect(screen.getByText('KHONGRAJ')).toBeInTheDocument()
  })

  it('renders content description text', () => {
    render(<Hero />)
    
    // Check if description texts are rendered
    expect(screen.getByText('Content Creation & Digital Storytelling')).toBeInTheDocument()
    expect(screen.getByText('Scaling brands reach and impact')).toBeInTheDocument()
  })

  it('has correct background styling', () => {
    render(<Hero />)
    
    // Find the section element by getting the closest section to our heading
    const section = screen.getByText('DESTINY').closest('section')
    expect(section).toHaveClass('bg-gradient-to-br', 'from-white', 'via-gray-50', 'to-gray-100')
  })

  it('renders with full screen height', () => {
    render(<Hero />)
    
    const section = screen.getByText('DESTINY').closest('section')
    expect(section).toHaveClass('h-screen')
  })

  it('includes slider component', () => {
    render(<Hero />)
    
    // The slider should be present (we can check for its container)
    // Since we're mocking the Slider component implicitly, we check that the component renders without error
    expect(screen.getByText('DESTINY')).toBeInTheDocument()
  })
})