import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';


afterEach(cleanup);

const setup = () => {
  const utils = render(<SearchForm />);
  const searchBar = utils.getByPlaceholderText('Search...');
  return {
    searchBar,
    ...utils
  };
}

describe('Search', function () {
  test('Insert text to searchbar', async function () {
    const { searchBar } = setup();
    fireEvent.change(searchBar, { target: { value: 'Programming' } });
    expect(searchBar.value).toBe('Programming');
  });

  test('Clear search', async function () {
    const { searchBar, getByText } = setup();
    getByText('Clear').click();
    expect(searchBar.value).toBe('');
  });
});
