import { useEffect, useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { AnimatePresence, motion } from 'framer-motion'

export function VariantForm({ name, maps, addToJson }) {
  const savedState = JSON.parse(sessionStorage.getItem(`checkboxes${name}`)) || {}
  const [checkboxState, setCheckboxState] = useState(savedState)
  const [collapsed, setCollapsed] = useState(false)
  const [teamsEnabled, setTeamsEnabled] = useState(false)
  const [teamOverridesState, setTeamOverridesState] = useState({ number: 0, size: 1 })
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

  const animVariants = {
    form: {
      closed: { height: 0, opacity: 0 },
      open: { height: 'auto', opacity: 1 }
    },
    button: {
      closed: { rotateX: 0 },
      open: { rotateX: 180 }
    }
  }

  useEffect(() => {
    sessionStorage.setItem(`checkboxes${name}`, JSON.stringify(checkboxState))
  }, [checkboxState])

  const handleOverrides = (e) => {
    const { value, checked } = e.target
    setCheckboxState({ ...checkboxState, [value]: checked })
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
      setTeamOverridesState({ ...teamOverridesState, number: value })
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
      setTeamOverridesState({ ...teamOverridesState, size: value })
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
    const { value, checked } = e.target
    const mapObj = {
      displayName: value,
      mapName: value
    }
    setCheckboxState({ ...checkboxState, [value]: checked })
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
          <motion.div
            tabIndex={0}
            role="button"
            className="collapseButtonCont"
            title="collapse"
            aria-label="collapse"
            animate={collapsed ? 'open' : 'closed'}
            variants={animVariants.button}
            transition={{ ease: 'linear', duration: 0.15 }}
            onClick={() => setCollapsed(!collapsed)}
          >
            <IoIosArrowUp
              className="variantFormCollapseButton"
            />
          </motion.div>
          <div className="variantFormName">
            <h2>{name}</h2>
            <button type="submit">OK</button>
          </div>
        </div>
        {collapsed && (
          <motion.div
            className="variantForm"
            animate={collapsed ? 'open' : 'closed'}
            initial="closed"
            variants={animVariants.form}
            transition={{ ease: 'linear', duration: 0.3 }}
          >
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
                    checked={!!checkboxState['Server.SprintEnabled 1']}
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
                    checked={!!checkboxState['Server.UnlimitedSprint 1']}
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
                    checked={!!checkboxState['Server.AssassinationEnabled 1']}
                    onChange={handleOverrides}
                  />
                  Toggle Assassinations
                </label>
                <label>
                  Number of Teams
                  <select
                    name="Number of Teams"
                    id="TeamsNum"
                    value={teamOverridesState.number}
                    onChange={handleTeamOverrides}
                  >
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
                    value={teamOverridesState.size}
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
                        checked={!!checkboxState[i]}
                        onChange={handleMaps}
                      />
                      {i}
                    </label>
                  )
                })}
              </div>
            </fieldset>
          </motion.div>
        )}
      </form>
    </>
  )
}
