# Profile module

Owns the portfolio introduction and interactive cat model shown in the home profile section.

## Interface

```tsx
import { ProfileSection } from '@/modules/profile';

<ProfileSection />;
```

`ProfileSection` is server-compatible. `CatModel` is its client-only interactive child and is not part of the module's public interface.

## Files

- `index.ts`: public module export.
- `components/profile/index.ts`: profile component export.
- `components/profile/profile.component.tsx`: profile copy, portrait, and cat-model composition.
- `components/profile/profile.styles.scss`: profile layout and responsive styles.
- `components/profile/profile.test.tsx`: profile content and asset tests.
- `components/cat-model/index.ts`: internal cat-model export.
- `components/cat-model/cat-model.component.tsx`: interactive Three.js cat viewer.
- `components/cat-model/cat-model.styles.scss`: cat-viewer presentation.
- `components/cat-model/cat-model.test.tsx`: cat-viewer interaction tests.
