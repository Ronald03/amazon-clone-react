import React from "react";
import "./OrderedProducts.css";
import GradeIcon from "@material-ui/icons/Grade";
import { useStateValue } from "./StateProvider";

function OrderedProduct({ id, image, title, price, rating, hideButton }) {
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    //remove the item from the basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="orderedProduct">
      <img className="orderedProduct__image" src={image} alt="" />

      <div className="orderedProduct__info">
        <p className="orderedProduct__title">{title}</p>
        <p className="orderedProduct__price">
          <small>$</small>
          <small>{price}</small>
        </p>
        <div className="orderedProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <GradeIcon />
            ))}
        </div>
        {!hideButton && (
          <button onClick={removeFromBasket}>Remove from Basket</button>
        )}
      </div>
    </div>
  );
}

export default OrderedProduct;
