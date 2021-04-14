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
  experienceToNextLevel: number,
  activeChallenge: Challenge,
  startNewChalenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
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

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)


  function levelUp(){
    setLevel(level + 1)
  }

  function startNewChalenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)
  }

  function  resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
   if(!activeChallenge){
     return;
   } 
   const {amount} = activeChallenge;
   let finalExperience = currenteExperience + amount

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
   }

   setCurrenteExperience(finalExperience)
   setActiveChallenge(null)
   setChalengeCompleted(challengeCompleted + 1)
   
  }

  return (
    <ChallengesContext.Provider value={
      { 
        level,
        levelUp,
        currenteExperience,
        challengeCompleted,
        startNewChalenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge


        }
      }>
      {children}
    </ChallengesContext.Provider>
  )
}