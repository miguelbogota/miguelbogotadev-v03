/**
 * Represents a failed request with a numeric status code and readable message.
 *
 * @example
 * ```tsx
 * throw new RequestError({
 *   code: 404,
 *   message: 'Project not found.',
 * });
 * ```
 */
export class RequestError extends Error {
  /** Numeric status associated with the request failure. */
  readonly code: number;

  /**
   * Creates a request error.
   *
   * @param data - Status code and message describing the request failure.
   */
  constructor(data: { code: number; message: string }) {
    super(data.message);
    this.name = 'RequestError';
    this.code = data.code;
  }
}
