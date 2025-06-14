import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from "../src/components/Checkbox/Checkbox";
import '@testing-library/jest-dom';

describe('Checkbox', () => {
  test('renders label and checkbox with correct state', () => {
    render(
      <Checkbox
        id="remember"
        label="Запомнить"
        checked={true}
        onChange={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText(/запомнить/i);

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
    expect(label).toBeInTheDocument();
  });

  test('calls onChange when clicked', () => {
    const handleChange = jest.fn();

    render(
      <Checkbox
        id="remember"
        label="Запомнить"
        checked={true}
        onChange={handleChange}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
