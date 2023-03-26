import classes from "../../Modules/ProductItem.module.css";
import {useState} from "react";


const ProductItem = (props) => {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
      if (checked) {
        props.onUncheck(props.sku);
      } else {
        props.onCheck(props.sku);
      }
      setChecked(prevValue => !prevValue);
    }

    const products = {
      DVD: `Size: ${props.value} MB`,
      Book: `Weight: ${props.value} KG`,
      Furniture: `Dimension: ${props.value}`
    };
    

  
    return (
      <div className={classes['product-item']}>
        <input checked={checked} onChange={handleChange}  value={props.sku} type="checkbox" className="delete-checkbox"  />
        <span>{props.sku}</span>
        <span>{props.name}</span>
        <span>{props.price} $</span>
        <span>{products[props.product]}</span>
      </div>
    )
}

export default ProductItem