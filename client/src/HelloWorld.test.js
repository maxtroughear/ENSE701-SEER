import React from 'react';
import { act, render, cleanup, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';
import axios from 'axios';
import HelloWorld from './HelloWorld';

const stubbedResponse = {
  message: 'Hello MongoDB'
}

beforeEach(function () {
  axios.get = jest.fn(function () {
    return Promise.resolve({ data: stubbedResponse })
  });
})

afterEach(cleanup);

describe('HelloWorld', function () {
  test('displays text "loading..." while fetching', async function () {
    await act(async function () {
      const { getByText } = render(<HelloWorld />);
      getByText('loading...');
    });
  });

  test('removes text "loading..." after fetching', async function () {
    await act(async function () {
      const { getByText } = render(<HelloWorld />);
      await waitForElementToBeRemoved(function () {
        return getByText('loading...');
      });
    });
  });

  test('displays "Hello MongoDB" response from DB', async function () {
    await act(async function () {
      const { getByText } = render(<HelloWorld />);

      await waitForElement(function () {
        return getByText('Hello MongoDB');
      });
    });
  });

  // test('renders learn react link', () => {
  //   const { getByText } = render(<HelloWorld />);
  //   const linkElement = getByText(/Hello MongoDB/i);
  //   expect(linkElement).toBeInTheDocument();
  // });
});