import {createContext, useState, ReactNode} from 'react'

export const ChallengesContext = createContext({})

interface ChallengesProviderProps{
  children: ReactNode
}

export function ChallengesProvider({children}: ChallengesProviderProps){

  const [level, setLevel] = useState(1);
  const [currenteExperience, setCurrenteExperience] = useState(0)
  const [challengeCompleted, setChalengeCompleted]  = useState(0)



  function levelUp(){
    setLevel(level + 1)
  }

  function startNewChalenge() {
    
  }

  return (
    <ChallengesContext.Provider value={
      { 
        level,
        levelUp,
        currenteExperience,
        challengeCompleted,
        startNewChalenge
        }
      }>
      {children}
    </ChallengesContext.Provider>
  )
}