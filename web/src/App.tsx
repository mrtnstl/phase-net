import { Dummy, DummyButton } from '@phase-net/ui'

function App() {
  return (
    <>
      <section id="center" className='bg-blue-900'>
        <Dummy onClick={()=>alert("dumeee")}>
          <p>Some dummy component</p>
        </Dummy>
        <DummyButton />
      </section>
    </>
  )
}

export default App
