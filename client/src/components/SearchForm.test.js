import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';


afterEach(cleanup);

const setup = () => {
  const utils = render(<SearchForm />);
  const subject = utils.getByText('Subject');
  const filter = utils.getByText('Filter');
  const value = utils.getByText('Value');

  const subjectInput = subject.nextSibling.firstChild;
  const subjectInputValue = subjectInput.nextSibling.textContent;

  return {
    subject,
    subjectInput,
    subjectInputValue,
    filter,
    value,
    ...utils
  };
}

describe('Search', function () {
  test('Insert text to subject', async function () {
    const { subjectInput } = setup();
    fireEvent.change(subjectInput, { target: { value: 'Category' } });
    expect(subjectInput.value).toBe('Category');
  });

  test('Clear search', async function () {
    const { subjectInputValue, getByText } = setup();
    getByText('Reset').click();
    expect(subjectInputValue).toBe('Title');
  });
});
