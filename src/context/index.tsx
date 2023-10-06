"use client";
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";

interface GlobalContextInterface {
  showNavModal: boolean
  setShowNavModal: Dispatch<SetStateAction<boolean>>
}

export const GlobalContext = createContext<GlobalContextInterface>({
  showNavModal: false,
  setShowNavModal: () => {}
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)
  if (!context){
    throw new Error('useGlobalContext must be used within a GlobalContextProvider.')
  }
  return context
}

export default function GlobalState({ children }: {children: React.ReactNode}) {
  const [showNavModal, setShowNavModal] = useState(false)

  return (
    <GlobalContext.Provider value={{
      showNavModal,
      setShowNavModal
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
