import { Routes, Route, Link } from 'react-router-dom'
import Landing from './components/Landing';
import SubjectPage from './components/SubjectPage';
import LessonPage from './components/LessonPage'
import TestPage from './components/TestPage'

function App() {
  
  return (
   <div className="">
    
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/:subject" element={<SubjectPage />} />
      <Route path="/:subject/:lesson" element={<LessonPage />} />
      <Route path="/:subject/:lesson/test" element={<TestPage />} />
    </Routes>

   </div> 
  )
}

export default App
