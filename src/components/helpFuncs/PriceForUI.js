export const PriceForUI = (number) => {

       const splitedPrice = number.split('');
       const firstNum = number.slice(0, number.length - 2);
      
       return firstNum + '.' + number.slice(number.length - 2, 100)
       
}

/*
 if(isNaN(number)){
              return '6.00';
       }else {
              return firstNum + '.' + number.slice(number.length - 2, 100)
       }
       */