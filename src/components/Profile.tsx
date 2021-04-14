import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContex'
import styles from '../styles/components/Profile.module.css'

export function Profile(){
  const {level} = useContext(ChallengesContext)
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/VitorBassDev.png" alt="Vítor Guedes"/>
      <div>
        <strong>Vítor Guedes </strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level {level}
        </p>
      </div>
    </div> 
  )
}