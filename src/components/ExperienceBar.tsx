import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContex'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar() {

  const {currenteExperience, experienceToNextLevel} = useContext(ChallengesContext)

  const percentToNextLevel = Math.round(currenteExperience * 100 )/ experienceToNextLevel
  return (
    /**SYLES É A IMPORTAÇÃO DO CSS MODULE  */
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      
      <div>
        <div style={{width: `${percentToNextLevel}%`}}/>

        <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}} >
          {currenteExperience} xp
        </span>
      </div>
      <span> {experienceToNextLevel} xp</span>
    </header>
  )
}