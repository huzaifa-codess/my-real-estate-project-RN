import { Children, createContext, ReactNode, useContext } from "react";
import { useAppwrite } from "./useAppwrite";
import { getCurrentUser } from "./appwrite";
interface user {
  $id: string;
  name: string;
  email: string;
}
interface globalContextType {
  isLoggedIn: boolean;
  user: user | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}
const GlobalContext = createContext<globalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });

  const isLoggedIn = !!user;
  console.log(JSON.stringify(user, null, 2));
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): globalContextType => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
export default GlobalProvider;
