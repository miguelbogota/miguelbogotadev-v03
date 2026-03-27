import * as matchers from 'jest-extended';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { expect } from 'vitest';

global.React = React;
expect.extend(matchers);
