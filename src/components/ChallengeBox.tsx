import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContex'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
  const {activeChallenge} = useContext(ChallengesContext)

  return (
    <div className={styles.challengeContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>

          <header> Ganhe {activeChallenge.amount} xp </header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`}/>
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}

            >
              Falhei
              </button>

            <button
              type="button"
              className={styles.challengeSucceededButton}
            >
              Completei
              </button>

          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>
            Finalize um clico para receber desafios
            <p>
              <img src="icons/level-up.svg" alt="Level Up" />
                Avance de level completando  desafios
            </p>
          </strong>
        </div>
      )}
    </div>
  )
}