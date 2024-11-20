import React, { createContext, useState, ReactNode } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

interface AppContextProps {
  state: { count: number; loading: boolean };
  setState: React.Dispatch<React.SetStateAction<{ count: number; loading: boolean }>>;
  setLoading: (loading: boolean) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState({ count: 0, loading: false });

  const setLoading = (loading: boolean) => {
    setState((prevState) => ({ ...prevState, loading }));
  };

  return (
    <AppContext.Provider value={{ state, setState, setLoading }}>
      {children}
      {state.loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#979797" />
        </View>
      )}
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});