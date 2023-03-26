import classes from "../../Modules/Input.module.css";

const Input = (props) => {
  return (
    <div className={classes["input-group"]}>
      <label className={classes["label"]} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        value={props.value}
        onChange={props.onChange}
        className={classes["input"]}
        id={props.id}
        type={props.type}
        name={props.name}
      />
    </div>
  );
};

export default Input;
