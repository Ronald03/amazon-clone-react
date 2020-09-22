import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
  let test = Array(order);
  console.log(test);
  return (
    <div className="order">
      {/* <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p> */}
      {order.data.basket?.map((item) => (
        <div>
          <div className="order__details">
            <div className="order__info">
              <span>ORDER PLACED</span>
              <span>
                {moment.unix(order.data.created).format("MMM Do YYYY")}
              </span>
            </div>
            <div className="order__info">
              <span>TOTAL</span>
              <span>
                <CurrencyFormat
                  renderText={(value) => <p>Order Total: {value}</p>}
                  decimalScale={2}
                  value={order.data.amount / 100}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </span>
            </div>
            <div className="order__info">
              <span>SHIP TO</span>
              <span>123 Address St, Dallas, TX</span>
            </div>
            <div className="order__info">
              <span>ORDER #</span>
              <span>{order.id}</span>
            </div>
          </div>
          {/* <CheckoutProduct
            id={item.id}
            title={item.title}
            image={item.image}
            price={item.price}
            rating={item.rating}
            hideButton
          /> */}
        </div>
      ))}
    </div>
  );
}

export default Order;
