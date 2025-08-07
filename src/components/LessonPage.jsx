import { useParams, Link, useNavigate } from 'react-router-dom'
import { Atom, FlaskConical, Scale, WalletCards, TrendingDown } from 'lucide-react'
import chemie from '../data/Chemie'
import docker from '../data/Docker'
import ucetnictvi from '../data/Ucetnictvi'

// Mapování názvu na komponentu
const iconMap = {
  Atom: Atom,
  FlaskConical: FlaskConical,
  Scale: Scale,
  WalletCards: WalletCards,
  TrendingDown: TrendingDown,

}

const subjectDataMap = {
  chemie,
  docker,
  ucetnictvi,
}

function LessonPage() {
  const navigate = useNavigate()
  const { subject, lesson } = useParams()
  const data = subjectDataMap[subject]

  const lessonIndex = parseInt(lesson) - 1
  const currentLesson = data?.lessons[lessonIndex]

  if (!currentLesson) {
    return <h1 className="text-white p-6">Lekce nenalezena</h1>
  }

  const Icon = iconMap[currentLesson.image] || null

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-neutral-800 to-neutral-700 text-white px-4 py-6 relative">
      {/* Zpět tlačítko */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-white flex items-center gap-1 text-sm"
      >
        <span className="text-xl">←</span>
        <span>Zpět</span>
      </button>

      {/* Nadpis */}
      <h1 className="text-2xl font-bold text-center pt-8 mb-4">
        {currentLesson.title}
      </h1>

      {/* Ikona */}
      <div className="flex justify-center mb-4">
        {Icon && <Icon size={96} strokeWidth={1.5} className="text-white" />}
      </div>

      {/* Odkaz na PDF */}
      <div className="text-center mb-6">
        <a
          href={currentLesson.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline text-sm"
        >
          Otevřít PDF dokument
        </a>
      </div>

      {/* Tlačítko Spustit test */}
      <div className="text-center">
        <Link
          to={`/${subject}/${lesson}/test`}
          className="inline-block w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
          Spustit test
        </Link>
      </div>
    </div>
  )
}

export default LessonPage
