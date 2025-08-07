import { Link } from 'react-router-dom'
import subjects from '../data/Subjects.jsx'
console.log("subjects:", subjects)



function Landing() {
  return (
    <div className="h-screen bg-gradient-to-tr from-neutral-800 to-neutral-700">
        
        <div className="flex items-center justify-center h-1/4">
            <h1 className="text-3xl font-bold text-white ">Subjects</h1>
        </div>
            
        <div className="flex flex-col items-center justify-center gap-4">
             {subjects.map((s, i) => {
                console.log("Subject:", s)
                return (
                    <Link
                        key={i}
                        to={`/${s.path}`}
                        className="w-60 text-center py-4 rounded-xl bg-gradient-to-tr from-neutral-800 to-neutral-600 text-white font-medium shadow-[0_6px_6px_rgba(0,0,0,0.4)] hover:brightness-110 transition"
                    >
                        {s.name}
                    </Link>
                )
            })}
        </div>
      
    </div>
  );
}

export default Landing;