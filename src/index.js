import React from 'react'
import styles from './styles.module.scss'
import EmojiPicker from './EmojiPicker'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export default EmojiPicker
