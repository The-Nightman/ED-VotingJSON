import { useEffect, useState } from 'react'
import { Sidebar, VariantForm } from './components'

function App() {
  const [selectedVariants, setSelectedVariants] = useState([])

    async function handleFolder() {
      const filePath = await window.electronAPI.openFolder()
      console.log(filePath)
    }

  return (
    <>
      <h1>ElDewrito Voting JSON Builder</h1>
      <button id='button' onClick={handleFolder}>open folder</button>
      <Sidebar />
      <div className="container">
        {selectedVariants.map((i) => {
          return <VariantForm />
        })}
      </div>
    </>
  )
}

export default App
