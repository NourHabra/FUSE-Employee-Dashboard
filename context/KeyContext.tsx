// context/KeyContext.tsx

"use client"

import { createContext, useContext, useState, ReactNode } from 'react';

interface KeyContextType {
  publicKey: string | null;
  privateKey: string | null;
  serverPublicKey: string | null;
  sharedKey: string | null;
  jwt: string | null; // Add JWT token state
  setPublicKey: (key: string | null) => void;
  setPrivateKey: (key: string | null) => void;
  setServerPublicKey: (key: string | null) => void;
  setSharedKey: (key: string | null) => void;
  setJwt: (token: string | null) => void; // Add setter for JWT token
}

const KeyContext = createContext<KeyContextType>({
  publicKey: null,
  privateKey: null,
  serverPublicKey: null,
  sharedKey: null,
  jwt: null, // Initialize JWT token state
  setPublicKey: () => {},
  setPrivateKey: () => {},
  setServerPublicKey: () => {},
  setSharedKey: () => {},
  setJwt: () => {}, // Initialize setter for JWT token
});

export const useKeyContext = () => useContext(KeyContext);

export const KeyProvider = ({ children }: { children: ReactNode }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const [serverPublicKey, setServerPublicKey] = useState<string | null>(null);
  const [sharedKey, setSharedKey] = useState<string | null>(null);
  const [jwt, setJwt] = useState<string | null>(null); // Add state for JWT token

  return (
    <KeyContext.Provider
      value={{ publicKey, privateKey, serverPublicKey, sharedKey, jwt, setPublicKey, setPrivateKey, setServerPublicKey, setSharedKey, setJwt }}
    >
      {children}
    </KeyContext.Provider>
  );
};