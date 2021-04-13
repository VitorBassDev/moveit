import styles from '../styles/components/Profile.module.css'

export function Profile(){
  return(
    <div className={styles.profileContainer}>
      <img src="https://github.com/VitorBassDev.png" alt="Vítor Guedes"/>
      <div>
        <strong>Vítor Guedes </strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Leve 1
        </p>
      </div>
    </div> 
  )
}