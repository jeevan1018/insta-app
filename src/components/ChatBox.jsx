import React, { useEffect, useRef, useState } from 'react'

const ChatBox = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [error, setError] = useState(null)

  const recognitionRef = useRef(null)

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition

      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event) => {
        const lastIndex = event.results.length - 1
        const result = event.results[lastIndex]

        if (result.isFinal) {
          const text = result[0].transcript
          setTranscription((prev) => prev + ' ' + text)
        }
      }

      recognition.onerror = (event) => {
        setError(event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    } else {
      alert('Speech Recognition not supported in this browser')
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Start
      </button>

      <button onClick={stopListening} disabled={!isListening}>
        Stop
      </button>

      <br />

      <input
        value={transcription}
        readOnly
        placeholder="Speech text will appear here"
      />

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  )
}

export default ChatBox
