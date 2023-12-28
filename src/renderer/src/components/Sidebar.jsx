import { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { AnimatePresence, motion } from 'framer-motion'

export function Sidebar({ data, selectedVariants, setSelectedVariants, jsonData, setJsonData }) {
  const { maps, variants } = data
  const savedState = JSON.parse(sessionStorage.getItem('checkboxes')) || {}
  const [menuState, setMenuState] = useState(false)
  const [checkboxState, setCheckboxState] = useState(savedState)

  useEffect(() => {
    if (variants.length > 0) {
      setMenuState(true)
    }
    sessionStorage.setItem('checkboxes', JSON.stringify(checkboxState))
  }, [checkboxState, variants])

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
    const { value, checked } = e.target
    setCheckboxState({ ...checkboxState, [value]: checked })
    if (selectedVariants.findIndex((i) => i === value) > -1) {
      setSelectedVariants(selectedVariants.filter((i) => i !== value))
      setJsonData({ ...jsonData, Types: jsonData.Types.filter((i) => i.typeName !== value) })
    } else {
      setSelectedVariants([...selectedVariants, value])
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
                  {variants.map((i, index) => {
                    return (
                      <li key={index}>
                        <label>
                          <input
                            type="checkbox"
                            name={`checkbox_${i}`}
                            className="checkbox"
                            value={i}
                            checked={!!checkboxState[i]}
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
                  {maps.map((i, index) => {
                    return (
                      <li key={index}>
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
