import './App.css'
import AboutMe from './components/AboutMe';
import Certificate from './components/Certificate';
import Contact from './components/Contact';
import Education from './components/Education';
import HeroReveal from './components/HeroReveal';
import Project from './components/Project';

function App() {
  return (
    <>
      <HeroReveal />
      <AboutMe />
      <Education />
      <Certificate />
      <Project />
      <Contact />
    </>
  )
}

export default App