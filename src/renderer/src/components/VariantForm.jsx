import { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

export function VariantForm({ name, maps, formIndex, jsonData, setJsonData }) {
  const [teamsEnabled, setTeamsEnabled] = useState(false)
  const teamVals = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const handleOverrides = (e) => {
    const variantObj = jsonData.Types[formIndex]
    const { value } = e.target
    const command = value.slice(0, -1)
    const index = variantObj.commands.findIndex((i) => i.includes(command))
    if (variantObj.commands[index].charAt(value.length - 1) == '0') {
      variantObj.commands[index] = value
      setJsonData(jsonData)
    } else {
      variantObj.commands[index] = `${command} 0`
      setJsonData(jsonData)
    }
  }

  const handleTeamOverrides = (e) => {
    const variantObj = jsonData.Types[formIndex]
    const { value } = e.target
    if (e.target.id === 'TeamsNum') {
      const teamCount = Number(value)
      if (teamCount > 1 && teamCount <= 8) {
        setTeamsEnabled(true)
        const index = variantObj.commands.findIndex((i) => i.includes('Server.NumberOfTeams'))
        if (index > -1) {
          variantObj.commands[index] = `Server.NumberOfTeams ${value}`
        } else {
          variantObj.commands.splice(-1, 0, `Server.NumberOfTeams ${value}`)
        }
        setJsonData(jsonData)
      } else {
        setTeamsEnabled(false)
        if (variantObj.commands.findIndex((i) => i.includes('Server.NumberOfTeams')) > -1) {
          if (variantObj.commands.findIndex((i) => i.includes('Server.TeamSize')) > -1) {
            variantObj.commands.splice(
              variantObj.commands.findIndex((i) => i.includes('Server.TeamSize')),
              1
            )
          }
          variantObj.commands.splice(
            variantObj.commands.findIndex((i) => i.includes('Server.NumberOfTeams')),
            1
          )
        }
        setJsonData(jsonData)
      }
    } else if (e.target.id === 'TeamSize') {
      if (value > 8) {
        e.target.value = 8
      } else if (value < 1) {
        e.target.value = 1
      }
      const index = variantObj.commands.findIndex((i) => i.includes('Server.TeamSize'))
      if (index > -1) {
        variantObj.commands[index] = `Server.TeamSize ${value}`
      } else {
        variantObj.commands.splice(-1, 0, `Server.TeamSize ${value}`)
      }
      setJsonData(jsonData)
    }
  }

  const handleMaps = (e) => {
    let variantObj = jsonData.Types[formIndex]
    const { value } = e.target
    const mapObj = {
      displayName: value,
      mapName: value
    }
    const index = variantObj.SpecificMaps.findIndex((i) => i.mapName === value)
    if (index > -1) {
      variantObj.SpecificMaps.splice(index, 1)
      setJsonData(jsonData)
    } else {
      variantObj.SpecificMaps.splice(-1, 0, mapObj)
      setJsonData(jsonData)
    }
  }

  return (
    <>
      <div className="variantFormContainer">
        <div className="variantFormTitleCard">
          {/* <IoIosArrowUp
            className="variantFormCollapseButton"
            title="collapse"
            aria-label="collapse"
          /> */}
          <h2>{name}</h2>
        </div>
        <form className="variantForm">
          <fieldset>
            <legend>Server Overrides</legend>
            <div className="serverOverrideSettings">
              <label>
                <input
                  type="checkbox"
                  name="Sprint Enabled Toggle"
                  id="SprintEnable"
                  className="checkbox"
                  value={'Server.SprintEnabled 1'}
                  onChange={handleOverrides}
                />
                Toggle Sprint
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Unlimited Sprint Toggle"
                  id="SprintUnlim"
                  className="checkbox"
                  value={'Server.UnlimitedSprint 1'}
                  onChange={handleOverrides}
                />
                Toggle Unlimited Sprint
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Assassinations Toggle"
                  id="Assass"
                  className="checkbox"
                  value={'Server.AssassinationEnabled 1'}
                  onChange={handleOverrides}
                />
                Toggle Assassinations
              </label>
              <label>
                Number of Teams
                <select name="Number of Teams" id="TeamsNum" on onChange={handleTeamOverrides}>
                  {teamVals.map((i) => {
                    return <option value={i}>{i}</option>
                  })}
                </select>
              </label>
              <label>
                Team Size
                <input
                  type="number"
                  name="Team Size"
                  id="TeamSize"
                  disabled={!teamsEnabled}
                  placeholder="1"
                  min={1}
                  max={8}
                  onChange={handleTeamOverrides}
                />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Maps</legend>
            <div className="mapSelection">
              {maps.map((i) => {
                return (
                  <label>
                    <input type="checkbox" className="checkbox" name={i} id={i} value={i} onChange={handleMaps} />
                    {i}
                  </label>
                )
              })}
            </div>
          </fieldset>
        </form>
      </div>
    </>
  )
}
