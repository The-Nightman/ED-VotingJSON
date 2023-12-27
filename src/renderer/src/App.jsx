import { useState } from 'react'
import { Sidebar, VariantForm } from './components'
import background from '../src/assets/background.webm'

function App() {
  const [data, setData] = useState({ maps: [], variants: [] })
  const [selectedVariants, setSelectedVariants] = useState([])
  const [jsonData, setJsonData] = useState({ Types: [] })

  const handleFolder = async () => {
    const res = await window.electronAPI.openFolder()
    if (Array.isArray(res.maps) && Array.isArray(res.variants)) {
      setSelectedVariants([])
      setJsonData({ Types: [] })
      setData(res)
    }
  }

  const handleSave = () => {
    const selectedMaps = jsonData.Types.flatMap((variant) => variant.SpecificMaps)
    .filter((obj, index, self) =>
      index === self.findIndex((t) => (t.mapName === obj.mapName))
    );
    const votingJson = { Maps: selectedMaps, ...jsonData }
    window.electronAPI.saveFile(votingJson)
  }

  const handleBuildVariant = (formData) => {
    const index = jsonData.Types.findIndex((i) => i.typeName === formData.typeName)
    if (index > -1) {
      const updatedTypes = jsonData.Types.map((item, i) => {
        if (i !== index) {
          return item
        }
        return formData
      })
      setJsonData(({ ...prevState }) => {
        return {
          ...prevState,
          Types: updatedTypes
        }
      })
    } else {
      setJsonData(({ ...prevState }) => {
        return {
          ...prevState,
          Types: [...prevState.Types, formData]
        }
      })
    }
  }

  return (
    <>
      <video autoPlay loop muted className="background">
        <source src={background} type="video/webm" />
      </video>
      <h1>ElDewrito Voting JSON Builder</h1>
      <Sidebar
        data={data}
        selectedVariants={selectedVariants}
        setSelectedVariants={setSelectedVariants}
        jsonData={jsonData}
        setJsonData={setJsonData}
      />
      <div className="container">
        <button id="button" className="openFolder" onClick={handleFolder}>
          Open Folder
        </button>
        <button id="button" className="saveJson" onClick={handleSave}>
          Save JSON
        </button>
        {selectedVariants.map((i, index) => {
          return (
            <VariantForm
              key={index}
              name={i}
              maps={data.maps}
              formIndex={index}
              addToJson={handleBuildVariant}
            />
          )
        })}
      </div>
    </>
  )
}

export default App
