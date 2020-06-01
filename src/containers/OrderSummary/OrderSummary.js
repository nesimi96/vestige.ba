import React, { useEffect, useState } from 'react';
import { PriceForUI } from '../../components/helpFuncs/PriceForUI';
import '../../sass/main.scss';
import axios from 'axios';

const OrderSummary = () => {


    const [order, setOrder] = useState(null);

    useEffect(() => {
      axios.get('https://vestige-2172c.firebaseio.com/orders.json')
      .then(res => {
          const orderID = localStorage.getItem('orderID')
          const extractData = Object.values(res.data);
              let userOrder = extractData.find(curOrder => curOrder.orderID === +orderID)
              setOrder(userOrder);
      })
      .catch(error => console.log(error))
    }, [])

    let orderSummary = null;
    if(order){
        orderSummary = order.cartList.map((order, orderInd) => {
        const price = PriceForUI(order.price.price);
        return <div className="Order-summary">
                        <p className="Order-summary-articalName">{order.parfumData.parfumData.brand} {order.parfumData.parfumData.names.UI} {order.price.ml} </p>
                        <p className="Order-summary-price">{price} KM</p>
                </div>
        })
    }

    return <div className="OrderSummary">
                  {order ? <div>
                              <h3>Hvala na narudžbi!</h3>
                              <div className="Order">
                                   { orderSummary }
                                   <div className="Order-total">
                                       <p className="Order-total-total-word">Ukupno:</p>
                                       <p className="Order-total-price"> {PriceForUI(`${order.money.total}`)} KM </p>
                                   </div>
                              </div>
                              <p className="totalPriceAlert">U ukupan iznos uračunata dostava koja iznosi: <b>6.00KM</b>, kao i promo vaučer ako je on postojan.</p>
                              <p className="parasID">Šifra narudžbe: {order.orderID}</p>
                              <p className="parasID">Datum i vrijeme: {order.time.date} - {order.time.time}</p>
                              <p className="Advice">Savjetujemo vam da uslikate ili zapišete Šifru narudžbe kako bi mogli pronaći vašu narudžbu ukoliko dođe do nekih problema.</p>
                              <div className="Work">
                                  <h4>Želite saradnju sa nama?</h4>
                                  <h5>Poslije preuzimanja parfema potrebno je da slikate parfem i objavite na vaš Instagram ili Facebook story 24h, također morate naznačiti našu web stranicu. Nakon toga nam pošaljete Screen Shot i automatski dobijate Vestige GOLD vaučer koji će vam omogućiti 15% popusta na sljedeću narudžbu. Hvala, vaš Vestige tim. </h5>
                              </div>
                           </div> : <h3>Loading...</h3>}
            </div>

}

export default OrderSummary;