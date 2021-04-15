import '../styles/global.css'
import {ChallengesProvider} from '../contexts/ChallengesContex'
import {CountdownProvider } from '../contexts/CountdownContext'
import 'bootstrap/dist/css/bootstrap.min.css'
/**
 * ARQUIVO QUE CHAMA TODO O RESTO DA APLICAÇÃO
 */
function MyApp({ Component, pageProps }) {

  return (
    <Component {...pageProps} />
  )
}

export default MyApp

