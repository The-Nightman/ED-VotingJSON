import { useEffect, useState } from 'react'
import { Sidebar, VariantForm } from './components'

function App() {
  const [data, setData] = useState({ maps: [], variants: [] })
  const [jsonData, setJsonData] = useState({ Maps: [], Types: [] })

  async function handleFolder() {
    const res = await window.electronAPI.openFolder()
    if (Array.isArray(res.maps) && Array.isArray(res.variants)) {
      setData(res)
    }
    const mapObjects = data.maps.map((i) => ({ displayName: i, mapName: i }))
    setJsonData({ ...jsonData, Maps: mapObjects })
  }

  async function handleSave() {
    const res = await window.electronAPI.saveFile(jsonData)
  }

  return (
    <>
      <h1>ElDewrito Voting JSON Builder</h1>
      <Sidebar data={data} jsonData={jsonData} setJsonData={setJsonData} />
      <div className="container">
        <button id="button" onClick={handleFolder}>
          Open Folder
        </button>
        <button id="button" onClick={handleSave}>
          Save JSON
        </button>
        {jsonData.Types.map((i, index) => {
          return (
            <VariantForm
              name={i.displayName}
              maps={data.maps}
              formIndex={index}
              jsonData={jsonData}
              setJsonData={setJsonData}
            />
          )
        })}
      </div>
    </>
  )
}

export default App
