import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Jednoduché TTS tlačítko.
 * - Nepředává žádný default lang (žádné es-ES napevno).
 * - Pokud lang chybí, použije se jazyk prohlížeče jako fallback.
 */
export default function PronounceButton({ text, lang, rate = 1, pitch = 1 }) {
  const [voices, setVoices] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const utterRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return

    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices()
      setVoices(v)
    }

    loadVoices()
    // některé prohlížeče načítají hlasy asynchronně
    window.speechSynthesis.onvoiceschanged = loadVoices
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const chosenVoice = useMemo(() => {
    if (!voices.length) return null
    const wanted = lang || (typeof navigator !== 'undefined' ? navigator.language : '')
    const base = (wanted || '').split('-')[0]

    let v = voices.find((voice) => voice.lang === wanted)
    if (v) return v
    v = voices.find((voice) => (voice.lang || '').startsWith(base))
    return v || voices[0]
  }, [voices, lang])

  const speak = () => {
    if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(text)
    u.lang = (chosenVoice && chosenVoice.lang) || lang || (typeof navigator !== 'undefined' ? navigator.language : '')
    if (chosenVoice) u.voice = chosenVoice
    u.rate = rate
    u.pitch = pitch
    u.onstart = () => setIsSpeaking(true)
    u.onend = () => setIsSpeaking(false)
    u.onerror = () => setIsSpeaking(false)
    utterRef.current = u
    window.speechSynthesis.speak(u)
  }

  const stop = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window
  if (!supported) {
    return <div className="text-sm text-red-300">TTS není v tomto prohlížeči podporováno.</div>
  }

  return (
    <div className="mt-3 flex items-center gap-3">
      <button
        onClick={isSpeaking ? stop : speak}
        className="px-3 py-2 rounded bg-neutral-700 hover:bg-neutral-600"
        aria-label="Přehrát výslovnost"
      >
        {isSpeaking ? 'Stop' : 'Přehrát výslovnost'}
      </button>
      <span className="text-xs text-gray-400">
        {chosenVoice ? `Hlas: ${chosenVoice.name} (${chosenVoice.lang})` : 'Načítám hlasy…'}
      </span>
    </div>
  )
}
