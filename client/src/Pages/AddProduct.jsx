import classes from "../Modules/AddProduct.module.css";
import Button from "../Components/UI/Button";
import { Link, useNavigate } from "react-router-dom";
import { Input } from '@nextui-org/react';
import { useState, useEffect } from "react";
 
const AddProduct = (props) => {
  const navigate = useNavigate();
  const [productType, setProductType] = useState();
  const [option, setOption] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    setWarning("");
  }, [option,
    size,
    weight,
    height,
    width,
    length,
    sku,
    name,
    price])

  const products = {
    DVD: <Input value={size} onChange={(e) => setSize(e.target.value)}  width={300}  id="size" labelPlaceholder="Size" name="DVD" type="number" />,
    Book: <Input value={weight} onChange={(e) => setWeight(e.target.value)} width={300} id="weight" labelPlaceholder="Weight (KG)" name="Book" type="number" />,
    Furniture: <div className={classes['furniture-div']}>
      <Input value={height} onChange={(e) => setHeight(e.target.value)}  width={300}  id="height" labelPlaceholder="Height" name="height" type="number" />
      <Input value={width} onChange={(e) => setWidth(e.target.value)}  width={300}  id="width" labelPlaceholder="Width" name="width" type="number" />
      <Input value={length} onChange={(e) => setLength(e.target.value)}  width={300}  id="length" labelPlaceholder="Length" name="length" type="number" />
    </div>
  };
  const productsDescription = {
    DVD: "Please provide DVD size",
    Book: "Please provide Book's weight",
    Furniture: "Please provide dimensions in HxWxL format"
  };

  const handleChange = (e) => {
    setProductType(e.target.value);
    setOption(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (sku === ""){
      setWarning("Please provide SKU!");
    } else if (name === ""){
      setWarning("Please provide Name!");
    } else if (price === "") {
      setWarning("Please provide Price!")
    } else if (option === "") {
      setWarning("Please Select an Option!");
    } else if (option === "DVD" && size === "") {
      setWarning("Please provide Size!");
    } else if (option === "Book" && weight === "") {
      setWarning("Please provide Weight!");
    } else if (option === "Furniture" && height === "") {
      setWarning("Please provide Height!");
    } else if (option === "Furniture" && width === "") {
      setWarning("Please provide Width!");
    } else if (option === "Furniture" && length === "") {
      setWarning("Please provide Length!");
    } else {
      console.log("Submitted")
      fetch("http://localhost:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: productType,
          size: size,
          weight: weight,
          height: height,
          width: width,
          length: length,
          sku: sku,
          name: name,
          price: price
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setWarning(data);
        setTimeout(() => {
          if (data === "Success") {
            navigate("/");
          }
        }, 1000);
      })

    }

  }



  return (
    <form onSubmit={handleSubmit} id="product_form">
      <div className={classes['add-product-div']}>
        <div className={classes['heading']}>
              <strong>Product Add</strong>
              <div className={classes['buttons']}>
                <Button type="submit" onClick={() => {}} variant="success">Save</Button>
                <Link to="/"><Button type="button" variant="danger">Cancel</Button></Link>
              </div>
          </div>
        
          <div className={classes['add-product-form']}>
            <Input value={sku} onChange={(e) => setSku(e.target.value)}  width={300}  id="sku" labelPlaceholder="SKU" name="sku" type="text" />
            <Input value={name} onChange={(e) => setName(e.target.value)}  width={300}  id="name" labelPlaceholder="NAME" name="name" type="text" />
            <Input value={price} onChange={(e) => setPrice(e.target.value)}  width={300}  id="price" labelPlaceholder="PRICE" name="price" type="number" />
            <select value={option} onChange={handleChange} id="productType" style={{width: "15%", fontSize: "1.5rem"}}>
              <option value="">Product Type</option>
              <option id="DVD" value="DVD">DVD</option>
              <option id="Book" value="Book">Book</option>
              <option id="Furniture" value="Furniture">Furniture</option>
            </select>
            <div>
                {products[productType] || ""}
                <br />
                <br />
                {productsDescription[productType] || ""}
            </div>
          </div>
          <div className={classes['toasts']}>
            <div hidden={warning === "" ? true : false} className={classes['toast']}>{warning}</div>
          </div>
      </div>
    </form>
  )
}

export default AddProduct