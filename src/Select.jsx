import { useState, useRef, useEffect, useCallback } from "react"
import "./Select.css"

function Select({ label, options, value, onChange, placeholder }) {

  const [isOpen, setIsOpen] = useState(false)

      const [highlightedIndex, setHighlightedIndex] = useState(0)

    const selectRef = useRef(null)
    const optionRefs = useRef([])

    useEffect(() => {

  if (isOpen && optionRefs.current[highlightedIndex]) {

    optionRefs.current[highlightedIndex].scrollIntoView({
      block: "nearest"
    })

  }

}, [highlightedIndex, isOpen])

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
    },[])

const handleSelect = useCallback((option) => {
    onChange(option)
    setIsOpen(false)
}, [onChange]) 
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
                className={`custom-option ${
  index === highlightedIndex ? "active" : ""
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