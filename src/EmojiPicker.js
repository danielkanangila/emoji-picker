import React, { useState } from 'react'
import { useLocalStorage } from 'react-hooks'
import emojis from 'emojis-json'

import styles from './styles.module.scss'
import SearchIcon from './SearchIcon'

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
  return (
    <div className={styles.emoji_picker__header}>
      <SearchBar />
      <Tabs />
    </div>
  )
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
    <div id={title.replace(/&|\s/g, '')}>
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

const Tabs = () => {
  const [activeIndex, setIsActiveIndex] = useState(0)
  const handleClick = (to, index) => {
    setIsActiveIndex(index)
  }
  return (
    <div className={styles.emoji_picker__tabs}>
      {emojis.map((item, idx) => (
        <TabLink
          key={idx}
          emoji={item.illustration}
          title={item.name}
          onClick={handleClick}
          isActive={activeIndex === idx}
          index={idx}
        />
      ))}
    </div>
  )
}

const TabLink = ({ index, isActive, title, emoji, onClick }) => {
  const activeClassName = styles.emoji_picker__tabs__item__active

  const handleClick = () => {
    onClick(title.replace(/&|\s/g, ''), index)
  }
  return (
    <div
      onClick={handleClick}
      className={`${styles.emoji_picker__tabs__item} ${
        isActive ? activeClassName : ''
      }`}
    >
      {emoji}
    </div>
  )
}

const SearchBar = () => {
  const [query, setQuery] = useState()

  return (
    <div className={styles.emoji_picker__search}>
      <input
        type='text'
        name='search'
        value={query}
        onChange={setQuery}
        placeholder='Search emojis'
      />
      <span>
        <SearchIcon />
      </span>
    </div>
  )
}

export default EmojiPicker
