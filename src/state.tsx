import { createContext, useContext, useState, type PropsWithChildren } from 'react';

/** Initial state type. */
export type InitialState = Window['__STATE__'];

/** Virtual state context type. */
export type VirtualStateContext = {
  /** Current theme of the application. */
  currentTheme: ThemeType;
  /** Function to set the current theme of the application. */
  setCurrentTheme: (theme: ThemeType) => void;
};

/** State context interface. */
export type StateContext = Omit<InitialState, keyof VirtualStateContext | 'theme'> &
  VirtualStateContext;

/** Context for sharing state between server and client. */
const Context = createContext<StateContext | null>(null);

/** Props for the StateProvider component. */
export type StateProviderProps = PropsWithChildren<{
  value: InitialState;
}>;

/** Provider for sharing state between server and client. */
export function AppStateProvider({ children, value }: StateProviderProps) {
  const [theme, setTheme] = useState(value.theme);

  return (
    <Context
      value={{
        ...value,
        currentTheme: theme,
        setCurrentTheme: (theme: ThemeType) => setTheme(theme),
      }}
    >
      {children}
    </Context>
  );
}

/** Hook for accessing the application state. */
export function useAppState() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useAppState must be used within a StateProvider');
  }

  return context;
}
