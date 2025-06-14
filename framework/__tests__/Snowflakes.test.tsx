import { render, screen } from '@testing-library/react';
import Snowflakes from '../src/components/Snowflakes/Snowflakes';
import '@testing-library/jest-dom';

describe('Snowflakes', () => {
  test('renders 40 snowflakes', () => {
    render(<Snowflakes />);
    const flakes = screen.getAllByText('﹡');
    expect(flakes).toHaveLength(40);
    flakes.forEach(flake => expect(flake).toHaveClass('snow__flake'));
  });
});
