import {createContext, useState, ReactNode} from 'react'
import challenges from '../../challenges.json'


interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number
}
interface ChallengesContexData{
  level: number,
  levelUp: () => void,
  currenteExperience: number,
  challengeCompleted: number,
  startNewChalenge: () => void,
  activeChallenge: Challenge
}


interface ChallengesProviderProps{
  children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengesContexData)

export function ChallengesProvider({children}: ChallengesProviderProps){

  const [level, setLevel] = useState(1);
  const [currenteExperience, setCurrenteExperience] = useState(0)
  const [challengeCompleted, setChalengeCompleted]  = useState(0)

  const [activeChallenge, setActiveChallenge]       = useState(null)

  function levelUp(){
    setLevel(level + 1)
  }

  function startNewChalenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)
  }

  return (
    <ChallengesContext.Provider value={
      { 
        level,
        levelUp,
        currenteExperience,
        challengeCompleted,
        startNewChalenge,
        activeChallenge
        }
      }>
      {children}
    </ChallengesContext.Provider>
  )
}