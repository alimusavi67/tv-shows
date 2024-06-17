/* eslint-disable jest/no-conditional-expect */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import '@testing-library/jest-dom';

describe('Pagination component', () => {
  const setup = (currentPage: number, isLastPage: boolean) => {
    const setPage = jest.fn();
    const utils = render(<Pagination currentPage={currentPage} setPage={setPage} isLastPage={isLastPage} />);
    const previousButton = utils.getByText('Previous');
    const nextButton = utils.getByText('Next');
    const pageButtons = utils.queryAllByText(/^\d+$/);
    return {
      ...utils,
      previousButton,
      nextButton,
      pageButtons,
      setPage,
    };
  };

  it('renders the correct number of page buttons', () => {
    const currentPage = 3;
    const { pageButtons } = setup(currentPage, false);

    expect(pageButtons.length).toBe(currentPage);
  });

  it('calls setPage with the correct arguments when page buttons are clicked', () => {
    const currentPage = 3;
    const { pageButtons, setPage } = setup(currentPage, false);

    fireEvent.click(pageButtons[0]);
    expect(setPage).toHaveBeenCalledWith(1);

    fireEvent.click(pageButtons[2]);
    expect(setPage).toHaveBeenCalledWith(3);
  });

  it('disables the Previous button on the first page', () => {
    const { previousButton } = setup(1, false);

    expect(previousButton).toBeDisabled();
  });

  it('disables the Next button on the last page', () => {
    const currentPage = 3;
    const { nextButton } = setup(currentPage, true);

    expect(nextButton).toBeDisabled();
  });

  it('calls setPage with the correct argument when Previous button is clicked', () => {
    const currentPage = 3;
    const { previousButton, setPage } = setup(currentPage, false);

    fireEvent.click(previousButton);
    expect(setPage).toHaveBeenCalledWith(currentPage - 1);
  });

  it('calls setPage with the correct argument when Next button is clicked', () => {
    const currentPage = 3;
    const { nextButton, setPage } = setup(currentPage, false);

    fireEvent.click(nextButton);
    expect(setPage).toHaveBeenCalledWith(currentPage + 1);
  });

  it('applies the correct classes to the current page button', () => {
    const currentPage = 3;
    const { pageButtons } = setup(currentPage, false);

    pageButtons.forEach((button, index) => {
      if (index + 1 === currentPage) {
        expect(button).toHaveClass('bg-blue-500 text-white');
      } else {
        expect(button).toHaveClass('bg-gray-200');
      }
    });
  });
});
