import * as actionTypes from './actionTypes';

// UTILITY FUNCTION FOR ONE PURPOSE
export const utility = (type, purpose) => {

    return {
        type: type,
        purpose: purpose
    }
}


// ADD ITEM TO LOCAL STORAGE 
export const itemToLocalStorage = (cartObj) => {

    const cartItem = {
        'parfumData': cartObj,
        'price': cartObj.activePrice
    }

    let oldData = null;
    if (JSON.parse(localStorage.getItem("cartItem"))) {
        oldData = JSON.parse(localStorage.getItem("cartItem"))
    } else {
        oldData = [];
    }

    let lsObj = null;
    lsObj = [...oldData, cartItem];

    localStorage.setItem('cartItem', JSON.stringify(lsObj))

    return {
        type: null
    }

}

// UPDATE STATE WITH LOCAL STORAGE
export const addToCart = () => {

    const cartList = JSON.parse(localStorage.getItem("cartItem"));

    return {
        type: actionTypes.ADD_TO_CART,
        cartList: cartList,

    }
}

export const updateCart = () => {

    return {
        type: actionTypes.CART_UPDATED,
        purpose: true,
    }
}
