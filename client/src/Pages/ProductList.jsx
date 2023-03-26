import ProductItem from '../Components/Product/ProductItem';
import Button from '../Components/UI/Button';
import classes from "../Modules/ProductList.module.css";
import {Link} from "react-router-dom";
import { useEffect, useState } from 'react';

const ProductList = () => {
  const [productList, setProductList] = useState([]);


  let items = [];
  const addItem = (sku) => {
    items.push(sku);
    console.log(items);

  }
  const removeItem = (sku) => {
    items = items.filter((e) => e != sku);
    console.log(items);
  }

  useEffect(() => {
    fetch("http://localhost:8000/products")
    .then(response => response.json())
    .then(data => {
      setProductList(data)
    })
  }, [])



  const handleMassDelete = (e) => {
      e.preventDefault();
      fetch("http://localhost:8000/products", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setProductList(prevValue => prevValue.filter(e => !(items.includes(e['SKU']))))
      });
  }

  return (
    <form onSubmit={handleMassDelete}>
      <main>
        <div className={classes['heading']}>
            <strong>Product List</strong>
            <div className={classes['buttons']}>
              <Link to="/add-product"> <Button type="button" onClick={() => {}} variant="success">ADD</Button> </Link>
              <Button type="submit" id="delete-product-btn" variant="danger">MASS DELETE</Button>
            </div>
        </div>

        <div className={classes['product-list']}>
          {productList.map((item, i) => 
          <ProductItem 
            key={item['SKU']}
            onUncheck={removeItem}
            sku={item['SKU']}
            onCheck={addItem}
            name={item['Name']}
            price={item['Price']}
            product={item['Type']}
            value={item['Value']}
          />
          )}
        </div>
      </main>
      </form>
  )
}

export default ProductList