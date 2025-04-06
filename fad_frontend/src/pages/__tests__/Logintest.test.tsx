import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import Logintest from '../Login';


test('renders email input and sign in button', () => {
  render(
    <MantineProvider>
      <Logintest />
    </MantineProvider>
  );

  const emailInput = screen.getByLabelText(/email/i);
  console.log(emailInput.innerText); 

  expect(screen.getByLabelText(/email/i)).toBeInstanceOf(HTMLElement)

  //expect(screen.getByRole('button', { name: /sign in/i }));
});


