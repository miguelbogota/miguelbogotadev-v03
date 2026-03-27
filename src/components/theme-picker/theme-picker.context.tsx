import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';
import type { ThemeType } from './theme-type.type';

/** Simple context to get and store the theme. */
const Context = createContext<{
  currentTheme: ThemeType;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>>;
}>({
  currentTheme: 'system',
  setCurrentTheme: () => {}, // noop
});

/**
 * Component to provide the context of the theme.
 */
export const ThemePickerProvider = ({
  theme,
  children,
}: PropsWithChildren<{ theme: ThemeType }>) => {
  const [currentTheme, setCurrentTheme] = useState(theme);

  return <Context value={{ currentTheme, setCurrentTheme }}>{children}</Context>;
};

/**
 * Returns the information from the context for the theme.
 */
export const useThemePicker = () => useContext(Context);
