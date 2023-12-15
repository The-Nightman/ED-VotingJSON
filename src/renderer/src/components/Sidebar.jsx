import { IoIosArrowBack } from 'react-icons/io'

export function Sidebar({ data, jsonData, setJsonData }) {
  const { maps, variants } = data

  const handleSelectVariants = (e) => {
    const { value } = e.target
    const index = jsonData.Types.findIndex((i) => i.typeName === value)
    if (index > -1) {
      setJsonData({ ...jsonData, Types: jsonData.Types.filter((i) => i.typeName !== value) })
    } else {
      const typeObj = {
        displayName: value,
        typeName: value,
        commands: [
          'Server.SprintEnabled 0',
          'Server.UnlimitedSprint 0',
          'Server.AssassinationEnabled 0'
        ],
        SpecificMaps: []
      }
      setJsonData({ ...jsonData, Types: [...jsonData.Types, typeObj] })
    }
  }

  return (
    <section aria-label="maps and variants sidebar" className="sidebar">
      <IoIosArrowBack className="sidebarArrow" />
      <div className="sidebarVariants">
        <h2>GAMETYPES</h2>
        <ul>
          {variants.map((i) => {
            return (
              <li>
                <label>
                  <input
                    type="checkbox"
                    name={`checkbox_${i}`}
                    value={i}
                    onChange={handleSelectVariants}
                  />
                  {i}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="sidebarMaps">
        <h2>MAPS</h2>
        <ul>
          {maps.map((i) => {
            return (
              <li>
                <p>{i}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
