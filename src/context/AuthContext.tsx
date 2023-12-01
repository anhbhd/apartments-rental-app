import { onAuthStateChanged, signOut } from "firebase/auth";
import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import { auth } from "../config/firebase_config";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { getDocument } from "../services/getDocument";
import { User } from "../type/User";
import { toast } from "react-toastify";

const AuthContext = createContext<any>(null);
export const useAuth = () => {
  return useContext(AuthContext);
};
interface IUserAuthContextProviderProps {
  children: React.ReactNode;
}

export interface CredentialUserApp {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  isAdmin: boolean;
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

  const logout: () => Promise<void> = async () => {
    removeItem("uid");
    await signOut(auth);
    setCurrentUser(null);
    toast.success("Logout successfully!", {
      position: "bottom-right",
      autoClose: 1500,
      style: {
        fontSize: "15px",
      },
    });
    navigate("/login");
  };
  const setCredentialUserForApp = (user: CredentialUserApp | null): void => {
    setCurrentUser(user);
    setItem("uid", user?.uid || "");
    setLoading(false);
  };
  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const userData: User = await getDocument("users", user?.uid as string);

      if (userData) {
        setCredentialUserForApp(
          user && userData.active
            ? {
                uid: user.uid as string,
                email: user.email as string,
                displayName: user.displayName as string,
                photoURL: user.photoURL as string,
                isAdmin: userData.isAdmin as boolean,
              }
            : null
        );

        if (user && !userData?.active) {
          toast.error("Your account has been deactivate by administrator :(", {
            position: "bottom-right",
            autoClose: 1500,
            style: { fontSize: "15px" },
          });
          logout();
        }
      } else {
        setCredentialUserForApp(
          user
            ? {
                uid: user.uid as string,
                email: user.email as string,
                displayName: user.displayName as string,
                photoURL: user.photoURL as string,
                isAdmin: false,
              }
            : null
        );
      }
    });

    return () => unsubscribe();
  }, []);

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
