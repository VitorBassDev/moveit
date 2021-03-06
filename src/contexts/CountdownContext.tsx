import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContex";

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  resetCountdown: () => void;
  startCountdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {

  const {startNewChalenge} = useContext((ChallengesContext))

  const [time, setTime]     = useState(0.1 * 60)
  const [isActive, setisActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
   
  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function startCountdown(){
    setisActive(true)
  }

  function resetCountdown(){
    clearTimeout(countdownTimeout)
    setisActive(false)
    setTime(0.1 * 60)
    setHasFinished(false)
  }

  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if(isActive && time == 0){
      setHasFinished(true)
      setisActive(false)
      startNewChalenge()
    }
  }, [isActive, time])

  return (
    <CountdownContext.Provider value={{
      isActive,
      hasFinished,
      startCountdown,
      resetCountdown,
      minutes,
      seconds
    }}>
      {children}
    </CountdownContext.Provider>
  );
}