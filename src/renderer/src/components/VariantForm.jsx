import { IoIosArrowUp } from 'react-icons/io'

export function VariantForm({ name, maps }) {
  const teamVals = [0, 1, 2, 3, 4, 5, 6, 7, 8]

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
                />
                Toggle Sprint
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Unlimited Sprint Toggle"
                  id="SprintUnlim"
                  value={'Server.UnlimitedSprint 1'}
                />
                Toggle Unlimited Sprint
              </label>
              <label>
                <input
                  type="checkbox"
                  name="Assassinations Toggle"
                  id="Assass"
                  value={'Server.AssassinationEnabled 1'}
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
