import React from 'react'
import loadable from '@loadable/component'
import shortid from 'shortid'
import Helmet from 'react-helmet'
import { Author } from '../@types/Site'
import { useSiteMetadata } from '../hooks/use-site-metadata'
import Qr from '../components/atoms/Qr'
import Icon from '../components/atoms/Icon'
import connectors from '../components/molecules/Web3Donation/connectors'
import styles from './thanks.module.scss'

const Web3Provider = loadable(() => import('web3-react'))
const Web3Donation = loadable(() =>
  import('../components/molecules/Web3Donation')
)

const Coin = ({ address, author }: { address: string; author: Author }) => (
  <div className={styles.coin}>
    <Qr title={address} address={(author as any)[address]} />
  </div>
)

const BackButton = () => (
  <button
    className={`link ${styles.buttonBack}`}
    onClick={() => window.history.back()}
  >
    <Icon name="ChevronLeft" /> Go Back
  </button>
)

export default function Thanks() {
  const { author } = useSiteMetadata()
  const coins = Object.keys(author).filter(
    key => key === 'bitcoin' || key === 'ether'
  )

  return (
    <>
      <Helmet>
        <title>Say thanks</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <article className={styles.thanks}>
        <BackButton />
        <header>
          <h1 className={styles.title}>Say Thanks</h1>
        </header>
        
        <Web3Provider connectors={connectors} libraryName={'ethers.js'}>
              <div className={styles.web3}>
                <header>
                  <h4>Web3 Wallet</h4>
                  <p>Send Ether with MetaMask or Brave.</p>
                </header>

                <Web3Donation fallback={<div className={styles.loading}>Loading...</div>} address={author.ether} />
              </div>

              <div className={styles.coins}>
                <header>
                  <h4>Any other wallets</h4>
                  <p>Send Bitcoin or Ether from any wallet.</p>
                </header>

                {coins.map((address: string) => (
                  <Coin
                    key={shortid.generate()}
                    address={address}
                    author={author}
                  />
                ))}
              </div>
            </Web3Provider>
      </article>
    </>
  )
}
