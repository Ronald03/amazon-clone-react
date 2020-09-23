import React from "react";
import "./Order.css";
import moment from "moment";
import OrderedProducts from "./OrderedProducts";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  let test = Array(order);
  /* console.log(test); */
  return (
    <div className="order">
      {order.data.basket?.map((item) => (
        <div>
          {
            <OrderedProducts
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              hideButton
            />
          }
        </div>
      ))}
    </div>
  );
}

export default Order;
