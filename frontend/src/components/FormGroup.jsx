const FormGroup = ({ inputInfo }) => {
  const inputClass = 'form-control';
  return (
    <div className="form-floating mb-3">
      <input
        name={inputInfo.name}
        required={inputInfo.name}
        placeholder={inputInfo.name}
        type={inputInfo.type}
        id={inputInfo.name}
        className={inputClass}
        onChange={inputInfo.onChange}
        value={inputInfo.value}
      />
      <label className="labelForm" htmlFor={inputInfo.name}>{inputInfo.labelText}</label>
    </div>
  );
};

export default FormGroup;
