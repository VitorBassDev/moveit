import '../styles/global.css'
import {ChallengesProvider} from '../contexts/ChallengesContex'
import {CountdownProvider } from '../contexts/CountdownContext'

/**
 * ARQUIVO QUE CHAMA TODO O RESTO DA APLICAÇÃO
 */
function MyApp({ Component, pageProps }) {

  return (
    <ChallengesProvider>
      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp

