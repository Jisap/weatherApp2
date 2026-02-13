import { createContext, useContext, useState, useEffect } from "react";


/**
 * Types
 */
type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);  // Crea el contexto del tema

export const ThemeProvider = ({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) => {

  const [theme, setTheme] = useState<Theme>(                                   // Estado inicial del tema
    () => localStorage.getItem(storageKey) as Theme || defaultTheme            // Busca el tema en localStorage o usa el tema por defecto
  );


  /*
  * Este useEffect se encarga de sincronizar el estado del tema (theme) con el DOM, 
  * actualizando las clases CSS en el elemento raíz (<html>) del documento. 
  * Se ejecuta cada vez que cambia el valor de theme o storageKey. 
  */
  useEffect(() => {
    const root = window.document.documentElement;                                                         // Obtiene una referencia al elemtento <html>
    root.classList.remove('light', 'dark');                                                               // Elimina las clases light y dark del mismo
    if (theme === 'system') {                                                                             // Si el usuario elige la opción "sytem"
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';   // se detecta si el sistema prefiere el modo oscuro y si asi es  
      root.classList.add(systemTheme)                                                                     // se agrega la clase dark, sino agrega la clase light
      return
    }

    root.classList.add(theme);
  }, [theme, storageKey]);


  const value = {                                                                                          // Valor que se pasa al contexto
    theme,                                                                                                    // Tema actual
    setTheme: (theme: Theme) => {                                                                             // Función para cambiar el tema
      localStorage.setItem(storageKey, theme);                                                                   // Guarda el tema en localStorage
      setTheme(theme);                                                                                           // Actualiza el estado del tema
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);                     // Hook personalizado para acceder al contexto del tema
  if (context === undefined) {                                          // Si el contexto es undefined, lanza un error
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
