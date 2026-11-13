# Shared module

Owns small, domain-independent contracts used by multiple application modules.

## Request error

`RequestError` represents a request failure with a numeric `code` and readable `message`.

```ts
import { RequestError } from '@/modules/shared';

throw new RequestError({
  code: 404,
  message: 'Project not found.',
});
```

## Files

- `index.ts`: public exports for the shared module.
- `errors/request.error.ts`: shared request error implementation.
- `errors/request.error.test.ts`: constructor contract tests.
