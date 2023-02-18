
export interface ITxtAreaProps extends React.ComponentPropsWithoutRef<"textarea"> {
    label : string, 
    id : string,
    name : string,
    placeholder  :string,
    hint : string,
    secondaryHint? : string
    value : string
    onChangeTxt : Function
    hasError : boolean,
    isOptional :  boolean,
    isDisabled : boolean,
    isLightMode : boolean
}

const TextArea: React.FC<ITxtAreaProps> = ({  label, id, name, placeholder,  isLightMode, hint, value, secondaryHint, onChangeTxt, hasError, isOptional, isDisabled, ...inputProps }) => {
    
    return (
        <div className={`form-element textarea ${hasError ? 'form-has-error' : '' }`}>
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={
            (e) => {
                let userInput = e.target.value;
                onChangeTxt(userInput)
            }
        }
          className={`form-element-field body2 ${isLightMode ? 'black' : 'primaryLight'}`}
          disabled={isDisabled}
        ></textarea>
        <div className="form-element-bar"></div>
        <label
          className={`form-element-label subtitle2 ${isLightMode ? 'black' : 'white'}`}
          htmlFor={id}
        >
         {label}

          {isOptional && (
            <sup className="caption primaryDark">
              optional
            </sup>
          )}
         
        </label>
        <div className={`form-element-hint ps-sm pe-sm ${secondaryHint ? 'leftRightFlex' : ''} caption`}>
         {hint}
          {secondaryHint && (
            <span className="primaryDark">
              <b>{secondaryHint}</b>
            </span>
          )}
        </div>
      </div>
    )
}

export default TextArea