import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { auth } from "../config/firebase_config";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>(null);
export const useAuth = () => {
  return useContext(AuthContext);
};
interface IUserAuthContextProviderProps {
  children: React.ReactNode;
}

interface CredentialUserApp {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

const UserAuthContextProvider = ({
  children,
}: IUserAuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CredentialUserApp | null>(
    null
  );
  const [loading, setLoading] = useState(true); // loading state
  const navigate = useNavigate();
  const { removeItem, setItem } = useLocalStorage();

  const logout = async () => {
    // console.log("logging out");
    removeItem("uid");
    await signOut(auth);
    navigate("/login");
  };

  const setCredentialUserForApp = useCallback(
    (user: CredentialUserApp | null): void => {
      setCurrentUser(user);
      setItem("uid", user?.uid || "");
      setLoading(false);
    },

    []
  );

  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCredentialUserForApp(
        user
          ? {
              uid: user.uid as string,
              email: user.email as string,
              displayName: user.displayName as string,
              photoURL: user.photoURL as string,
            }
          : null
      );
    });

    return () => unsubscribe();
  }, [setCredentialUserForApp]);

  const value = {
    currentUser,
    setCredentialUserForApp,
    logout,
  };

  if (loading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default UserAuthContextProvider;
