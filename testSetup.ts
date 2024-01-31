import { expect, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";

const fetchMocker = createFetchMock(vi);

// sets globalThis.fetch and globalThis.fetchMock to our mocked version
fetchMocker.enableMocks();

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

beforeEach(() => {
  fetchMocker.doMock();
});
// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
