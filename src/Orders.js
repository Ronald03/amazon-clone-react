import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Order from "./Order";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import moment from "moment";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className="orders">
      <div className="order__nav">
        <h1>Your Orders</h1>

        <div className="orderSearch__Container">
          <form>
            <input
              type="text"
              className="order__search"
              placeholder="Search orders..."
            />

            <button>Search Order</button>
          </form>
        </div>
      </div>

      <div className="orders__order">
        {orders?.map((order) => (
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
            <Order order={order} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
