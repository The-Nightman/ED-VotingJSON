import { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'

export function VariantForm({ name, maps, addToJson }) {
  const [teamsEnabled, setTeamsEnabled] = useState(false)
  const [formData, setFormData] = useState({
    displayName: name,
    typeName: name,
    commands: [
      'Server.SprintEnabled 0',
      'Server.UnlimitedSprint 0',
      'Server.AssassinationEnabled 0'
    ],
    SpecificMaps: []
  })
  const teamVals = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const handleOverrides = (e) => {
    const { value } = e.target
    const command = value.slice(0, -1)
    const index = formData.commands.findIndex((i) => i.includes(command))
    const overridesArr = formData.commands.map((item, i) => {
      if (i !== index) {
        return item
      }
      return formData.commands[index].charAt(value.length - 1) == '0' ? value : `${command}0`
    })
    setFormData({ ...formData, commands: overridesArr })
  }

  const handleTeamOverrides = (e) => {
    const { value } = e.target
    if (e.target.id === 'TeamsNum') {
      const teamCount = Number(value)
      if (teamCount > 1 && teamCount <= 8) {
        setTeamsEnabled(true)
        const index = formData.commands.findIndex((i) => i.includes('Server.NumberOfTeams'))
        if (index > -1) {
          const overridesArr = formData.commands.map((item, i) => {
            if (i !== index) {
              return item
            }
            return `Server.NumberOfTeams ${value}`
          })
          setFormData({ ...formData, commands: overridesArr })
        } else {
          const overridesArr = [...formData.commands, `Server.NumberOfTeams ${value}`]
          setFormData({ ...formData, commands: overridesArr })
        }
      } else {
        setTeamsEnabled(false)
        const overridesArr = formData.commands.filter(
          (i) => !i.includes('NumberOfTeams') && !i.includes('TeamSize')
        )
        setFormData({ ...formData, commands: overridesArr })
      }
    } else if (e.target.id === 'TeamSize') {
      if (value > 8) {
        e.target.value = 8
      } else if (value < 1) {
        e.target.value = 1
      }
      const index = formData.commands.findIndex((i) => i.includes('Server.TeamSize'))
      let overridesArr = []
      if (index > -1) {
        overridesArr = formData.commands.map((item, i) => {
          if (i !== index) {
            return item
          }
          return `Server.TeamSize ${value}`
        })
      } else {
        overridesArr = [...formData.commands, `Server.TeamSize ${value}`]
      }
      setFormData({ ...formData, commands: overridesArr })
    }
  }

  const handleMaps = (e) => {
    const { value } = e.target
    const mapObj = {
      displayName: value,
      mapName: value
    }
    const index = formData.SpecificMaps.findIndex((i) => i.mapName === value)
    if (index > -1) {
      const mapsArr = formData.SpecificMaps.filter((i) => i.mapName !== value)
      setFormData({ ...formData, SpecificMaps: mapsArr })
    } else {
      const mapsArr = [...formData.SpecificMaps, mapObj]
      setFormData({ ...formData, SpecificMaps: mapsArr })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addToJson(formData)
  }

  return (
    <>
      <form className="variantFormContainer" onSubmit={handleSubmit}>
        <div className="variantFormTitleCard">
          <IoIosArrowUp
            className="variantFormCollapseButton"
            title="collapse"
            aria-label="collapse"
          />
          <div className="variantFormName">
            <h2>{name}</h2>
            <button type="submit">OK</button>
          </div>
        </div>
        <div className="variantForm">
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
                <select name="Number of Teams" id="TeamsNum" onChange={handleTeamOverrides}>
                  {teamVals.map((i, index) => {
                    return (
                      <option key={index} value={i}>
                        {i}
                      </option>
                    )
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
              {maps.map((i, index) => {
                return (
                  <label key={index}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      name={i}
                      id={i}
                      value={i}
                      onChange={handleMaps}
                    />
                    {i}
                  </label>
                )
              })}
            </div>
          </fieldset>
        </div>
      </form>
    </>
  )
}
