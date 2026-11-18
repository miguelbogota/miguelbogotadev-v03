# Shared module

Owns reusable layout, navigation, state, hooks, configuration, and request contracts used by multiple application modules.

## Interface

```tsx
import { AppStateProvider, Container, Footer, Navigation } from '@/modules/shared';
```

The home route uses the shared provider for theme and temporary legacy drawer state. Project lists are passed directly to the work module and are not read there from global state.

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
- `components/container/*`: polymorphic layout wrapper, styles, and tests.
- `components/navigation/*`: responsive home navigation, active-section hook, styles, and tests.
- `components/footer/*`: shared footer, styles, and tests.
- `components/global-error/*`: root application failure presentation, styles, and tests.
- `components/not-found/*`: reusable missing-content presentation, styles, and tests.
- `components/error-boundary/*`: reusable client error boundary.
- `config/constants.ts`: public portfolio API URL and environment-aware site origin.
- `errors/request.error.ts`: shared request error implementation.
- `errors/request.error.test.ts`: constructor contract tests.
- `hooks/use-scroll-spy/*`: reusable section-observation hook and tests.
- `providers/app-state/app-state.provider.tsx`: temporary theme and drawer client state.
