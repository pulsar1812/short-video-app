import React from 'react'

type NoResultsProps = {
  text: string
}

export default function NoResults({ text }: NoResultsProps) {
  return <div>{text}</div>
}
