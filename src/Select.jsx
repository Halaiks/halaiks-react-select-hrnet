import { useState, useRef, useEffect, useCallback } from "react"
import "./Select.css"

/**
 * Composant de liste déroulante personnalisée, développé en remplacement du plugin jQuery Select2 de l'ancienne version de HRnet.
 *
 * @param {string}   props.label         - Label affiché au-dessus du champ
 * @param {Array<{value: string|number, label: string}>} props.options - Liste des options
 * @param {{value: string|number, label: string}|null}  props.value   - Option sélectionnée
 * @param {(option: {value, label}) => void}            props.onChange - Callback appelé à la sélection
 * @param {string}   [props.placeholder] - Texte affiché si aucune option sélectionnée
 */

function Select({ label, options, value, onChange, placeholder }) {

  const [isOpen, setIsOpen] = useState(false)

  const [highlightedIndex, setHighlightedIndex] = useState(0)

  const selectRef = useRef(null)
  const optionRefs = useRef([])

  // Scroll l'option mise en surbrillance dans la vue lorsque la liste est ouverte
  useEffect(() => {

    if (isOpen && optionRefs.current[highlightedIndex]) {

      optionRefs.current[highlightedIndex].scrollIntoView({
        block: "nearest"
      })

    }

  }, [highlightedIndex, isOpen])

  // Ferme la liste déroulante si un clic est détecté en dehors du composant
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = useCallback((option) => {
    onChange(option)
    setIsOpen(false)
  }, [onChange])

  // Navigation clavier : ↑ ↓ pour naviguer, Enter pour valider, Escape pour fermer
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (event) => {
        if (event.key === "ArrowDown") {
          setHighlightedIndex((prevIndex) =>
            prevIndex < options.length - 1 ? prevIndex + 1 : 0
          )
        } else if (event.key === "ArrowUp") {
          setHighlightedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : options.length - 1
          )
        } else if (event.key === "Enter") {
          handleSelect(options[highlightedIndex])
        } else if (event.key === "Escape") {
          setIsOpen(false)
        }

      }

      document.addEventListener("keydown", handleKeyDown)

      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [isOpen, highlightedIndex, options, onChange, handleSelect])


  return (
    <div className="form-group">
      <label>{label}</label>

      <div className="custom-select-container" ref={selectRef}>

        <div className="custom-select"
          style={selectStyle}
          onClick={() => {
            setIsOpen((prev) => !prev)
            setHighlightedIndex(0)
          }}>
          <div className="select-content">
            <span>{value ? value.label : placeholder}</span>
            <span className={`select-arrow ${isOpen ? "open" : ""}`}>
              ▼
            </span>
          </div>
        </div>

        {isOpen && (
          <ul className="custom-dropdown">
            {options.map((option, index) => (
              <li
                ref={(el) => (optionRefs.current[index] = el)}
                key={option.value}
                className={`custom-option ${index === highlightedIndex ? "active" : ""
                  }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  )
}



const selectStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  cursor: "pointer",
  backgroundColor: "white"
}

export default Select