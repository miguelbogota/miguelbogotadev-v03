import { RequestError } from './request.error';

describe('shared / request error', () => {
  it('should preserve its code and message', () => {
    const error = new RequestError({ code: 404, message: 'Project not found.' });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('RequestError');
    expect(error.code).toBe(404);
    expect(error.message).toBe('Project not found.');
  });
});
