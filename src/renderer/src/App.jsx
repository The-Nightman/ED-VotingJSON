import { useEffect, useState } from 'react'
import { Sidebar, VariantForm } from './components'

function App() {
  const [data, setData] = useState({ maps: [], variants: [] })
  const [jsonData, setJsonData] = useState({ Maps: [], Types: [] })

  async function handleFolder() {
    const res = await window.electronAPI.openFolder()
    if (res !== undefined) {
      setData(res)
    }
  }

  return (
    <>
      <h1>ElDewrito Voting JSON Builder</h1>
      <Sidebar data={data} jsonData={jsonData} setJsonData={setJsonData} />
      <div className="container">
        <button id="button" onClick={handleFolder}>
          Open Folder
        </button>
        {jsonData.Types.map((i) => {
          return <VariantForm name={i.displayName} maps={data.maps}/>
        })}
      </div>
    </>
  )
}

export default App
