/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/consistent-type-imports */

/// <reference types="vitest" />

export interface CustomMatchers<T> extends Record<string, any> {
  toHaveBeenCalledAfter(
    mock: jest.MockInstance<any, any[]> | import('vitest').MockInstance<any, any[]>,
    failIfNoFirstInvocation?: boolean,
  ): T;

  toHaveBeenCalledBefore(
    mock: jest.MockInstance<any, any[]> | import('vitest').MockInstance<any, any[]>,
    failIfNoSecondInvocation?: boolean,
  ): T;

  toHaveBeenCalledExactlyOnceWith(...args: unknown[]): T;
}

declare module 'vitest' {
  interface Assertion<T = unknown> extends CustomMatchers<T> {}
}
