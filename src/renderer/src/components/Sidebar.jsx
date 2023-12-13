import { IoIosArrowBack } from 'react-icons/io'

export function Sidebar() {
  return (
    <section aria-label="maps and variants sidebar" className="sidebar">
        <IoIosArrowBack className="sidebarArrow"/>
      <div>
        <h2>VARIANTS</h2>
        <ul></ul>
      </div>
      <div>
        <h2>MAPS</h2>
        <ul></ul>
      </div>
    </section>
  )
}
