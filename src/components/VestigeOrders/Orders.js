import React from 'react';

const Orders = (props) => {
    
    const order = props.order;

    console.log(order)

    return <div>
        <p>articalID: {order.articalID},</p>
        <p>bought: {order.articalID},</p>
    </div>
}

export default Orders