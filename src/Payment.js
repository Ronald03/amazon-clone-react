import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import CheckoutHeader from "./CheckoutHeader";
import { useStateValue } from "./StateProvider";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import "./Payment.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import { db } from "./firebase";
import { Container } from "@material-ui/core";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [disabled, setdisabled] = useState(true);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        // Stripe expects the total in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("The Secrect is >>>", clientSecret);

  const handleSubmit = async (e) => {
    //Stripe stuffs
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };

  const handleChange = (event) => {
    // do stuffs
    setdisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  return (
    <div className="">
      <CheckoutHeader />
      <Container className="payment">
        <div className="payment__container">
          {/* Payment section - delivery addess */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Shipping address</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>650 Leora Lane</p>
              <p>Lewisville, TX</p>
            </div>
          </div>
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              {/* Stripe magic will go */}
              <CardElement onChange={handleChange} />
            </div>
          </div>
          {/* payment section - Review Items */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review items and delivery address</h3>
            </div>
            <div className="payment__items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          {/* Payment section - payment method */}
        </div>

        <div className="payment__placeOrder">
          <div className="payment__submitOrder">
            <form onSubmit={handleSubmit}>
              {/*  */}
              <button disabled={processing || disabled || succeeded}>
                <span>
                  {processing ? <p>Processing</p> : "Place your order"}
                </span>
              </button>
              {error && <div>{error}</div>}
              <p>
                By placing you order you agree to this Clone's FAKE
                <span> Privacy notice </span>
                and <span>condition of use</span>.
              </p>
            </form>

            <hr />

            <div className="payment__summary">
              <div>
                <h3 className="payment__SummaryHeader">Order Summary</h3>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span>Items:</span>
                    </td>
                    <td>
                      <CurrencyFormat
                        renderText={(value) => <>{value}</>}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span>Shipping & handling:</span>
                    </td>
                    <td>$4.99</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td>Total before tax:</td>
                    <td>
                      <CurrencyFormat
                        renderText={(value) => <>{value}</>}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Estimated tax to be collected: </td>
                    <td>$2.65</td>
                  </tr>

                  <tr>
                    <td>
                      <hr />
                    </td>
                    <td>
                      <hr />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => (
                  <h3 className="payment__orderTotal">Order total: {value}</h3>
                )}
                decimalScale={2}
                value={getBasketTotal(basket) + 7.64}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Payment;
