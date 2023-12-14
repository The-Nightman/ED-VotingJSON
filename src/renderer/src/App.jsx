import { useState } from 'react'
import { Sidebar, VariantForm } from './components'

function App() {
  const [selectedVariants, setSelectedVariants] = useState([])

  return (
    <>
      <h1>ElDewrito Voting JSON Builder</h1>
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
