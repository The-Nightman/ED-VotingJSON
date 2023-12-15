import { IoIosArrowUp } from 'react-icons/io'

export function VariantForm({ name, maps, formIndex, jsonData, setJsonData }) {
  const teamVals = [0, 1, 2, 3, 4, 5, 6, 7, 8]

  const handleOverrides = (e) => {
    const variantObj = jsonData.Types[formIndex]
    console.log(variantObj)
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

  return (
    <>
      <div className="variantFormContainer">
        <div className="variantFormTitleCard">
          <IoIosArrowUp
            className="variantFormCollapseButton"
            title="collapse"
            aria-label="collapse"
          />
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
                  value={'Server.AssassinationEnabled 1'}
                  onChange={handleOverrides}
                />
                Toggle Assassinations
              </label>
              <label>
                Number of Teams
                <select name="Number of Teams" id="TeamsNum">
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
                  disabled={true}
                  value={1}
                  min={1}
                  max={8}
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
                    <input type="checkbox" name={i} id={i} value={i} />
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
