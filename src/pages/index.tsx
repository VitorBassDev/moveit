import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CountdownProvider } from '../contexts/CountdownContext'
import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../contexts/ChallengesContex'
import { Col, Row } from 'reactstrap'


interface HomeProps {
  level: number
  challengeCompleted: number
  currenteExperience: number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      challengeCompleted={props.challengeCompleted}
      currenteExperience={props.currenteExperience}
    >
      <div className={styles.container}>
        <Head>
          <title> Move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          
            <section>
              
                <div>
                  <Profile />
                  <CompletedChallenges />
                  <Countdown />
                </div>
            
                <div>
                  <ChallengeBox />
                </div>
              
            </section>
          
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const user = {
    level: 1,
    currenteExperience: 50,
    challengeCompleted: 2,
  }

  const { level, challengeCompleted, currenteExperience } = ctx.req.cookies
  return {
    props: {
      level: Number(level),
      challengeCompleted: Number(challengeCompleted),
      currenteExperience: Number(currenteExperience)
    }
  }
}