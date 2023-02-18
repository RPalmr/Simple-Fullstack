
export interface ITxtInputProps extends React.ComponentPropsWithoutRef<"input"> {
    label : string, 
    id : string,
    name : string,
    placeholder  :string,
    hint : string
    value : string
    onChangeTxt : Function
    hasError : boolean,
    isOptional :  boolean,
    isDisabled : boolean,
    isLightMode : boolean
}

const TextInput: React.FC<ITxtInputProps> = ({  label, id, name, placeholder, hint, value,     isLightMode, onChangeTxt, hasError, isOptional, isDisabled, ...inputProps }) => {
    
    return (
        <div className={`form-element ${hasError ? 'form-has-error' : '' } form-input mt-md`}>
        <input
            className={`form-element-field body2 ${isLightMode ? 'black' : 'primaryLight'} `}
            id={id}
            placeholder={placeholder}
            type="text"
            name={name}
            value={value}
            onChange={(e) => {
                let userInput = e.target.value;
                onChangeTxt(userInput)
            }}

            required = {!isOptional}
            disabled = {isDisabled}
        />

        <div className="form-element-bar"></div>
        <label
            className={`form-element-label subtitle2 ${isLightMode ? 'black' : 'white'}`}
            htmlFor={id}
        >
          {label}
          {isOptional && (
            <sup className={`caption primaryDark `}>optional</sup>
          )}
        </label>
        <span className={`caption form-element-hint pr-sm pl-sm ${isLightMode ? 'black' : 'white'}`}>
           {hint}
        </span>
    </div>
    )
}

export default TextInput