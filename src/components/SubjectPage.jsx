import { Link, useParams, useNavigate } from 'react-router-dom'
import Subjects from '../data/Subjects'
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

function SubjectPage() {
  const navigate = useNavigate()
  const { subject } = useParams()
  const data = subjectDataMap[subject]

  if (!data) return <h1 className="text-white">Předmět nenalezen</h1>

  return (
    <div className="h-screen bg-gradient-to-tr from-neutral-800 to-neutral-700">

        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 text-white flex items-center gap-2">
        <span className="text-2xl">←</span>
        <span>Back</span>
      </button>

        <div className="flex items-center justify-center h-1/4">
            <h1 className="text-3xl font-bold text-white ">{data.name}</h1>
        </div>
            
        <div className="flex flex-col items-center justify-center gap-4">
             {data.lessons.map((lesson, index) => (
                <Link
                    key={index}
                    to={`/${subject}/${index + 1}`}
                    className="w-60 text-center py-4 rounded-xl bg-gradient-to-tr from-neutral-800 to-neutral-600 text-white font-medium shadow-[0_6px_6px_rgba(0,0,0,0.4)] hover:brightness-110 transition"
                >
                    {lesson.title}
                </Link>
             ))}
        </div>

    </div>
  )
}

export default SubjectPage
