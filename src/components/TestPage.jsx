import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import chemie from '../data/Chemie'
import docker from '../data/Docker'
import ucetnictvi from '../data/Ucetnictvi'
import spanelstina from '../data/Spanelstina'
import rectina from '../data/Rectina'
import tailwind from '../data/Tailwind'

const subjectDataMap = {
  chemie,
  docker,
  ucetnictvi,
  spanelstina,
  rectina,
  tailwind,
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function TestPage() {
  const navigate = useNavigate()
  const { subject, lesson } = useParams()
  const data = subjectDataMap[subject]

  const lessonIndex = parseInt(lesson) - 1
  const currentLesson = data?.lessons[lessonIndex]

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    if (currentLesson) {
      const shuffled = shuffleArray(currentLesson.questions)
      setQuestions(shuffled)
    }
  }, [currentLesson])

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setShowAnswer(false)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleFinish = () => {
    navigate(-1)
  }

  if (!currentLesson) return <div className="text-white p-6">Lekce nenalezena</div>

  const question = questions[currentIndex]
  const isFinished = currentIndex >= questions.length

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 relative">
      {/* Back button */}
      <button onClick={() => navigate(-1)} className="absolute top-6 left-6 text-white flex items-center gap-2">
        <span className="text-2xl">←</span>
        <span>Back</span>
      </button>

      {/* Question counter */}
      <div className="absolute top-6 right-6 text-sm text-gray-400">
        {isFinished ? `${questions.length}/${questions.length}` : `${currentIndex + 1}/${questions.length}`}
      </div>

      {/* Subject and lesson titles */}
      <h1 className="text-3xl font-bold text-center mb-2">{data.name}</h1>
      <h2 className="text-lg text-center text-gray-400 mb-8">{currentLesson.title}</h2>

      {/* Flip card */}
      <div className="relative w-full h-60 max-w-xl mx-auto mb-6 perspective">
        <div className={`relative w-full h-full duration-500 transform-style-preserve-3d ${showAnswer ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-white text-xl font-semibold p-6 rounded-xl shadow-lg backface-hidden">
            {question?.question}
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex items-center justify-center bg-green-800 text-white text-xl font-semibold p-6 rounded-xl shadow-lg rotate-y-180 backface-hidden">
            {question?.answer}
          </div>
        </div>
      </div>

      {/* Buttons */}
      {!isFinished && (
        <div className="mt-4 flex justify-center gap-4">
          {!showAnswer && (
            <button
              onClick={() => setShowAnswer(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              Flip
            </button>
          )}

          {showAnswer && (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
            >
              Next
            </button>
          )}
        </div>
      )}

      {/* Finished */}
      {isFinished && (
        <div className="text-center mt-8">
          <p className="text-xl font-semibold mb-4">Test hotov!</p>
          <button
            onClick={handleFinish}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Ukončit test
          </button>
        </div>
      )}
    </div>
  )
}

export default TestPage
