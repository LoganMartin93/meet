import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

// List of warning messages to ignore
const MESSAGES_TO_IGNORE = [
  'Warning: An update to',
  'was not wrapped in act(...)',
  'Error:',
  'The above error occurred',
  "When testing, code that causes React state updates should be wrapped into act(...)"
];

// Override console.error to filter out specific warnings
const originalError = console.error.bind(console.error);

console.error = (...args) => {
  const ignoreMessage = MESSAGES_TO_IGNORE.find(message => args.toString().includes(message));
  if (!ignoreMessage) originalError(...args);
};

// Increase test timeout to handle async operations
jest.setTimeout(30000);

const { ResizeObserver } = window;

beforeEach(() => {
  //@ts-ignore
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});
