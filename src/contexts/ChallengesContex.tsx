import {createContext, useState, ReactNode, useEffect} from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'


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
  level: number
  challengeCompleted: number
  currenteExperience: number
  
}

export const ChallengesContext = createContext({} as ChallengesContexData)

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){

  const [level, setLevel] = useState(rest.level ?? 1);
  const [currenteExperience, setCurrenteExperience] = useState(rest.currenteExperience ?? 0)
  const [challengeCompleted, setChalengeCompleted]  = useState(rest.challengeCompleted ?? 0)

  const [activeChallenge, setActiveChallenge]       = useState(null)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])


  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currenteExperience', String(currenteExperience))
    Cookies.set('challengeCompleted', String(challengeCompleted))
  }, [level, currenteExperience, challengeCompleted])

  function levelUp(){
    setLevel(level + 1)
  }

  function startNewChalenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted'){
      new Notification(` Novo Desafio`, {
        body: `Valendo ${challenge.amount}xp`
      })
    }
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