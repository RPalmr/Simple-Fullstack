type RadioGroupProps<T> = {
  label: string;
  name: string;
  choices: { key : string, hint:string, valueOnChecked: T }[];
  checked: T;
  setChecked: (value: T) => void;
  isDisabled: boolean;
  hasError: boolean;
  id: string;
};

const RadioBtn = <T extends string>({
  choices,
  checked,
  setChecked,
  label,
  name,
  hasError,
  id,
  isDisabled,
}: RadioGroupProps<T>) => {
  return (
    <>
      <div
        className={`${
          hasError ? "form-has-error" : ""
        } form-radio form-radio-block mt-md`}
      >
        <div className="form-radio-legend subtitle2 white">{label}</div>
        {choices.map(({ valueOnChecked, key, hint }) => (
          <label className="form-radio-label" key={id ? `${key}+${id}` : key}>
            <input
              name={name}
              className="form-radio-field"
              type="radio"
              id={id}
              checked={valueOnChecked === checked}
              value={valueOnChecked}
              onChange={() => setChecked(valueOnChecked)}
              disabled={isDisabled && !(valueOnChecked === checked)}
            />
            <i className="form-radio-button offWhite"></i>
            <span className="body2 primaryLight">{hint}</span>
          </label>
        ))}
      </div>
      <div className="spaceElemStd"></div>
    </>
  );
};

export default RadioBtn;
