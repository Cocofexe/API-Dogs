import { render, screen } from '@testing-library/react';
import Base  from '../src/components/Base/Base.jsx'
import { MemoryRouter } from 'react-router-dom'

test('Rederiza texto de bienvenida', () => {
  render(<Base />, { wrapper: MemoryRouter })

  expect(screen.getByText('En esta API podras buscar diferentes razas de perros y crear tus propias razas')).toBeInTheDocument()
})

test('Debe tener un boton que te lleve al home', () => {
  render(<Base />, { wrapper: MemoryRouter })

  expect(screen.getAllByRole('button')).toHaveLength(1)
})

