import { render, screen } from '@testing-library/react';
import { Paginator } from './Paginator';
import userEvent from '@testing-library/user-event';

describe('Paginator', () => {
  it('should render variant next', () => {
    const onChange = jest.fn();

    render(<Paginator page={1} variant="next" onChange={onChange} />);

    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
    expect(screen.getByText(/page: 1/i)).toBeInTheDocument();
  });

  it('should render variant prev', () => {
    const onChange = jest.fn();

    render(<Paginator page={1} variant="prev" onChange={onChange} />);

    expect(screen.getByRole('button', { name: /prev/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    expect(screen.getByText(/page: 1/i)).toBeInTheDocument();
  });

  it('should render variant none', () => {
    const onChange = jest.fn();

    render(<Paginator page={1} variant="none" onChange={onChange} />);

    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
    expect(screen.getByText(/page: 1/i)).toBeInTheDocument();
  });

  it('should render variant prev-next', () => {
    const onChange = jest.fn();

    render(<Paginator page={1} variant="prev-next" onChange={onChange} />);

    expect(screen.getByRole('button', { name: /prev/i })).toBeEnabled();
    expect(screen.getByRole('button', { name: /next/i })).toBeEnabled();
    expect(screen.getByText(/page: 1/i)).toBeInTheDocument();
  });

  it('should call callback when user click next in variant next', () => {
    const onChange = jest.fn();

    render(<Paginator page={1} variant="next" onChange={onChange} />);

    userEvent.click(screen.getByRole('button', { name: /next/i }));
    expect(onChange).toBeCalledWith('next');
  });

  it('should call callback when user click prev in variant prev', () => {
    const onChange = jest.fn();

    render(<Paginator page={1} variant="prev" onChange={onChange} />);

    userEvent.click(screen.getByRole('button', { name: /prev/i }));
    expect(onChange).toBeCalledWith('prev');
  });
});
