import React, { useState } from 'react'
import emojis from 'emojis-json'
import styles from './styles.module.scss'

const EmojiPicker = ({ onClick }) => {
  const [hovered, setHovered] = useState({ name: '', emoji: '' })

  return (
    <div className={styles.emoji_picker}>
      <div className={styles.emoji_picker__main}>
        <Header />
        <div className={styles.emoji_picker__container}>
          {emojis.map((item, index) => (
            <EmojiList
              key={index}
              {...item}
              onHover={setHovered}
              onClick={onClick}
            />
          ))}
        </div>
        <Footer {...hovered} />
      </div>
    </div>
  )
}

const Header = () => {
  return <div className={styles.emoji_picker__header}></div>
}
const Footer = ({ name, emoji }) => {
  return (
    <div className={styles.emoji_picker__footer}>
      <span>{emoji}</span>
      <small>{name}</small>
    </div>
  )
}

const EmojiList = ({ name: title, emojis, onHover, onClick }) => {
  return (
    <div>
      <h2 className={styles.emoji_picker__title}>{title}</h2>
      <div className={styles.emoji_picker__list}>
        {emojis.map((item, index) => (
          <Emoji key={index} {...item} onHover={onHover} onClick={onClick} />
        ))}
      </div>
    </div>
  )
}

const Emoji = ({ name, emoji, onHover, onClick }) => {
  return (
    <div
      onMouseEnter={() => onHover({ name, emoji })}
      className={styles.emoji_picker__list__item}
      onClick={() => onClick(emoji)}
    >
      {emoji}
    </div>
  )
}

export default EmojiPicker
