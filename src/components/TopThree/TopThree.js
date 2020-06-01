import React, { useEffect, useState, useMemo } from 'react';
import '../../sass/main.scss';
import TopThreeComponent from './TopThreeComponent/TopThreeComponent';
import axios from 'axios';
import ReactSwipe from 'react-swipe';

const TopThree = (props) => {

    const [parfumData, setParfumData] = useState(null);
    const [elementPosition, setElementPostion] = useState(0);

    useEffect(() => {
        axios.get('https://vestige-2172c.firebaseio.com/perfums.json')
        .then(res => {
            const extractedData = Object.values(res.data);
            const sortedByBought = extractedData.sort((a, b) => a.bought - b.bought).reverse();
            const onlyThree = sortedByBought.slice(0, 3);
            setParfumData(onlyThree);
        })
        .catch(error => console.log(error))
    }, [])

    let componentRoute = null;

    let content = null;
    if(parfumData){
        content = parfumData.map((cur, ind) => {
            return <div key={ind} style={{
                marginTop: props.notTopThree ? 20 : null
            }} className="TopThree-Slider">
                        <TopThreeComponent key={ind} router={props.route}
                        brand={cur.brand} img={cur.names.img} route={cur.names.route}
                        UIname={cur.names.UI} price={cur.price.big.price}/>
                    </div>
         })
    }
    
    const startSlide = 0;
    const swipeOptions = {
        startSlide: parfumData ? startSlide < parfumData.length && startSlide >= 0 ? startSlide : 0 : null,
        auto: 0,
        speed: 500,
        disableScroll: false,
        continuous: false,
    };

    const style = { marginTop: props.notTopThree ? 35 : null }


    let scrollable =  <ReactSwipe ref={reactSwipe => (reactSwipe = reactSwipe)} swipeOptions={swipeOptions}>
                        { content }
                    </ReactSwipe>

    let notScrollable
    if(window.innerWidth > 650 && parfumData){
        notScrollable = parfumData.map((cur, ind) => {
           return <TopThreeComponent key={ind} router={props.route}
           brand={cur.brand} img={cur.names.img} route={cur.names.route}
           UIname={cur.names.UI} price={cur.price.big.price}/>
       })
    }

    return <div style={style} className="TopThree">
               <h1> NAJPRODAVANIJI - TOP 3 </h1>
               <div className="TopThree-nonScrollable">
                  { window.innerWidth > 650 ? notScrollable : scrollable }
               </div>
           </div>

}

export default TopThree;
