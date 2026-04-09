import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomeClient from '@/components/HomeClient';

test('Page', () => {
  render(<HomeClient />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'To get started, edit the page.tsx file.' }),
  ).toBeDefined();
});
