import React, { useState, useEffect, ReactElement } from 'react'
import axios from 'axios'
import * as styles from './Conversion.module.css'
import { useNetwork } from 'wagmi'

export async function getFiat(
  amount: number,
  tokenId = 'ethereum'
): Promise<{ [key: string]: string }> {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=eur%2Cusd`
  const response = await axios(url)

  if (!response) console.error(response.statusText)
  const { usd, eur } = response.data[tokenId]
  const dollar = (amount * usd).toFixed(2)
  const euro = (amount * eur).toFixed(2)

  return { dollar, euro }
}

export default function Conversion({
  amount
}: {
  amount: string
}): ReactElement {
  const { chain } = useNetwork()

  const [conversion, setConversion] = useState({
    euro: '0.00',
    dollar: '0.00'
  })
  const { dollar, euro } = conversion

  useEffect(() => {
    if (!chain?.nativeCurrency?.symbol) return

    async function getFiatResponse() {
      try {
        const tokenId =
          chain?.nativeCurrency?.symbol === 'MATIC'
            ? 'matic-network'
            : 'ethereum'
        const { dollar, euro } = await getFiat(Number(amount), tokenId)
        setConversion({ euro, dollar })
      } catch (error) {
        console.error(error.message)
      }
    }

    getFiatResponse()
  }, [amount, chain?.nativeCurrency?.symbol])

  return (
    <div className={styles.conversion}>
      <span>{dollar !== '0.00' && `= $ ${dollar}`}</span>
      <span>{euro !== '0.00' && `= € ${euro}`}</span>
    </div>
  )
}
