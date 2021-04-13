import { useState, useEffect, useContext} from 'react'
import { ChallengesContext } from '../contexts/ChallengesContex';
import styles from '../styles/components/Countdown.module.css'


let countdownTimeout: NodeJS.Timeout;

export function Countdown(){

  const {startNewChalenge} = useContext(ChallengesContext)

  const [time, setTime]     = useState(0.1 * 60)
  const [isActive, setisActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)
   
  const minutes = Math.floor(time / 60)
  const seconts = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('')  
  const [secondLeft, secondRight] = String(seconts).padStart(2,'0').split('')

  function startCountdown(){
    setisActive(true)
  }

  function resetContdown(){
    clearTimeout(countdownTimeout)
    setisActive(false)
    setTime(0.1 * 60)
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
    <div>
      <div className={styles.countdownContainer}>

        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        
          <span>:</span>
        
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button
          disabled
          className={`${styles.countdownButton}`}
        >
          Ciclo Encerrado
        </button>

      ) : (
      <>
        {isActive ? (
          <button
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
          onClick={resetContdown}
          >
            Abandonar Ciclo
          </button>
        ) : (
          <button
          type="button"
          className={styles.countdownButton}
          onClick={startCountdown}
          >
            Iniciar Ciclo
          </button>
        )}
      </>
      )}
    </div>
  )
}