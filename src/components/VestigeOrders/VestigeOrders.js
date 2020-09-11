import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Orders from './Orders';

const VestigeOrders = () => {

  const [data, setData] = useState(null);

   useEffect(() => {
      axios.get('https://vestige-2172c.firebaseio.com/perfums.json')
      .then(res => {
          const extract = Object.values(res.data);
          setData(extract)
      })
      .catch(err => console.log(err))
   }, [])

   let orders = null;
   if(data){
       orders = data.map((cur, ind) => {
           return <Orders key={ind} order={cur} />
       })
   }

    return <div>
                { orders }
            </div>
}

export default VestigeOrders;