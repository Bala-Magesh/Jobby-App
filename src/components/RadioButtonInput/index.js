import './index.css'

const RadioButtonInput = props => {
  const {label, id, name, checked, onChange, type} = props

  const onChangeRadioBtn = event => {
    onChange(event.target.value)
  }

  return (
    <li>
      <input
        type={type}
        id={id}
        name={name}
        value={id}
        checked={checked}
        onChange={onChangeRadioBtn}
      />
      <label className="radio-label" htmlFor={id}>
        {label}
      </label>
    </li>
  )
}

export default RadioButtonInput
