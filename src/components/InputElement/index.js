import './index.css'

import {IoSearch} from 'react-icons/io5'

const InputElement = props => {
  const {value, onChange} = props

  const onChangeInputElement = event => {
    onChange(event.target.value)
  }

  return (
    <div className="input-element-container">
      <label htmlFor="search-input" className="visually-hidden">
        Search
      </label>
      <input
        id="search-input"
        className="input-element"
        type="search"
        onChange={onChangeInputElement}
        value={value}
      />
      <button
        data-testid="searchButton"
        className="search-icon-container"
        aria-label="Search"
      >
        <IoSearch className="search-icon" />
      </button>
    </div>
  )
}

export default InputElement
