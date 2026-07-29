import './App.css'
import { Dummy } from '@phase-net/ui'

function App() {
  return (
    <>
      <section id="center">
        <Dummy onClick={()=>alert("dumeee")}>
          <p>Some dummy component</p>
        </Dummy>
      </section>
    </>
  )
}

export default App
