import React, { useState } from 'react'
import { useLocalStorage } from 'react-hooks'
import emojis from 'emojis-json'

import styles from './styles.module.scss'
import SearchIcon from './SearchIcon'

const parseId = (title) => {
  return title.replace(/&|\s/g, '')
}

const EmojiPicker = ({ onClick }) => {
  const [hovered, setHovered] = useState({ name: '', emoji: '' })
  const [recentUsedEmoji, setRecentUsedEmoji] = useLocalStorage(
    'recentUsedEmojis',
    {
      name: 'Recent',
      illustration: '🕑',
      emojis: []
    }
  )

  const handleClick = ({ name, emoji }) => {
    onClick(emoji)
    const em = recentUsedEmoji.emojis
    em.push({ name, emoji })
    setRecentUsedEmoji({
      ...recentUsedEmoji,
      emojis: em
    })
  }

  return (
    <div className={styles.emoji_picker}>
      <div className={styles.emoji_picker__main}>
        <Header emojis={[recentUsedEmoji, ...emojis]} />
        <div className={styles.emoji_picker__container}>
          {[recentUsedEmoji, ...emojis].map((item, index) => (
            <EmojiList
              key={index}
              {...item}
              onHover={setHovered}
              onClick={handleClick}
            />
          ))}
        </div>
        <Footer {...hovered} />
      </div>
    </div>
  )
}

const Header = ({ emojis }) => {
  return (
    <div className={styles.emoji_picker__header}>
      <SearchBar />
      <Tabs emojis={emojis} />
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
  const clearStorage = () => {
    window.localStorage.removeItem('recentUsedEmojis')
  }
  return (
    <div id={parseId(title)}>
      <div className={styles.emoji_picker__list__header}>
        <h2 className={styles.emoji_picker__title}>{title}</h2>
        {title === 'Recent' && (
          <button onClick={clearStorage}>Clear All</button>
        )}
      </div>
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
      onClick={() => onClick({ name, emoji })}
    >
      {emoji}
    </div>
  )
}

const Tabs = ({ emojis }) => {
  const [activeIndex, setIsActiveIndex] = useState(0)
  const handleClick = (to, index) => {
    setIsActiveIndex(index)
    document.getElementById(to).scrollIntoView()
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
    onClick(parseId(title), index)
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
