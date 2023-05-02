/**
 * Built by Sam Ayoub, Reallexi.com
 * https://github.com/melayyoub
 * https://apidocpro.com
 * Important: To use this code please leave the copyright in place
 * Reallexi LLC, https://reallexi.com
 */
import { render, screen } from '@testing-library/react';
import App from './App';

test('APIDOCPRO copyright', () => {
  render(<App />);
  const linkElement = screen.getByText(/ApidDocPro Editor/i);
  expect(linkElement).toBeInTheDocument();
});
