import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider } from "firebase/auth";

export const login = (): Promise<void> => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithRedirect(auth, provider);
};

export const logout = (): Promise<void> => {
  const auth = getAuth();
  return signOut(auth);
};
