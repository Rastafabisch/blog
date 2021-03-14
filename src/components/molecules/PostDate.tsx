import React, { ReactElement } from 'react'
import Time from '../atoms/Time'
import { time } from './PostDate.module.css'

export default function PostDate({
  date,
  updated
}: {
  date: string
  updated?: string
}): ReactElement {
  return (
    <div className={time}>
      <Time date={date} />
      {updated && ' • updated '}
      {updated && <Time date={updated} />}
    </div>
  )
}
