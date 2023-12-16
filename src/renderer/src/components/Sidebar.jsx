import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { AnimatePresence, motion } from 'framer-motion'

export function Sidebar({ data, jsonData, setJsonData }) {
  const { maps, variants } = data

  const [menuState, setMenuState] = useState(false)

  const animVariants = {
    menu: {
      closed: { x: '16rem' },
      open: { x: '0rem' }
    },
    button: {
      closed: { x: '0rem', rotate: 0 },
      open: { x: '-16rem', rotate: 180 }
    }
  }

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
    <>
      <motion.div
        role="button"
        tabIndex={0}
        className="sidebarArrowCont"
        animate={menuState ? 'open' : 'closed'}
        variants={animVariants.button}
        transition={{ ease: 'linear', duration: 0.15 }}
        onClick={() => setMenuState(!menuState)}
        onKeyDown={() => setMenuState(!menuState)}
      >
        <IoIosArrowBack className="sidebarArrow" />
      </motion.div>
      <AnimatePresence>
        {menuState && (
          <motion.section
            aria-label="maps and variants sidebar"
            className="sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={animVariants.menu}
            transition={{ ease: 'linear', duration: 0.15 }}
          >
            <div className="sidebarContainer">
              <div className="sidebarVariants" role="menubar">
                <h2>GAMETYPES</h2>
                <ul>
                  {variants.map((i) => {
                    return (
                      <li>
                        <label>
                          <input
                            type="checkbox"
                            name={`checkbox_${i}`}
                            className="checkbox"
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
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  )
}
