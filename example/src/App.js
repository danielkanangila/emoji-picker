import React from 'react'

import EmojiPicker from 'emoji-picker'
import 'emoji-picker/dist/index.css'

const App = () => {
  return (
    <>
      <EmojiPicker onClick={(emoji) => console.log(emoji)} />
    </>
  )
}

export default App
