import { useState, useEffect, useRef } from 'react'

export const useTextToSpeech = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)
  const [text, setText] = useState('')
  const textRef = useRef('Look stright')

  useEffect(() => {
    textRef.current = text
  }, [text])

  useEffect(() => {
    console.log('recText: ', text)
    const synth = window.speechSynthesis
    const u = new SpeechSynthesisUtterance(textRef.current)
    u.lang = 'en-US'
    console.log('u: ', u)
    setUtterance(u)

    return () => {
      synth.cancel()
    }
  }, [text])

  const speak = (text: string) => {
    setText(text)
    handlePlay()
  }

  const handlePlay = () => {
    const synth = window.speechSynthesis
    if (isPaused) {
      synth.resume()
    } else {
      // If there's a new text, update the utterance
      const u = new SpeechSynthesisUtterance(textRef.current)
      u.lang = 'en-US'
      setUtterance(u)
      synth.speak(u)
    }
    setIsPaused(false)
  }

  const handlePause = () => {
    const synth = window.speechSynthesis

    synth.pause()

    setIsPaused(true)
  }

  const handleStop = () => {
    const synth = window.speechSynthesis

    synth.cancel()

    setIsPaused(false)
  }
  return { setText, handlePlay, handlePause, handleStop, speak }
}
