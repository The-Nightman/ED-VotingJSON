import { IoIosArrowBack } from 'react-icons/io'

export function Sidebar() {
  const variants = []
  const maps = []
  return (
    <section aria-label="maps and variants sidebar" className="sidebar">
      <IoIosArrowBack className="sidebarArrow" />
      <div className="sidebarVariants">
        <h2>VARIANTS</h2>
        <ul>
          {variants.map((i, index) => {
            return (
              <li>
                <label>
                  <input type="checkbox" name={index} id={index} />
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
