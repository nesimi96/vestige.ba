import React, { useState, useEffect, useMemo } from 'react';
import '../../sass/main.scss';
import axios from 'axios';
import Input from '../Input/Input';
import PrimaryButton from '../Buttons/PrimaryButton';

const Connect = (props) => {
    
    const [inputVal, setInputVal] = useState('');
    const [inputError, setInputError] = useState(null);

    const inputValidation = () => {
        const text = inputVal;

        if(text.length > 5 && text.includes('@')){
            setInputError(null)
        }else {
            setInputError('E-mail adresa nije valjana')
        }
    }

    useMemo(() => {
        inputValidation();
    }, [inputVal])

    const postEmail = () => {
       
        if(!inputError){
            axios.post('https://vestige-2172c.firebaseio.com/emaildiscount.json', {email: inputVal})
        }
    }

    return <div className="Connect">
                <div className="Connect-line"> </div>
                <p> connect </p>
                <div className="Connect-text-holder">
                    <p>Poveži se sa nama. </p>
                    <p>Budi obavješten kada je popust.</p>
                </div>
                <div className="Connect-items-holder">
                     <Input inputVal={(e) => setInputVal(e.target.value)} style={inputStyle} />
                     <PrimaryButton click={postEmail} text="POVEŽI SE" style={buttonStyle}/>
                </div>
           </div>
}

export default Connect;

const inputStyle = () => {
    return  {
        style: `
      margin-top: 10px;
      width: 90%;
      height: 30px;
      letter-spacing: .7px;
      font-size: 16px;
      font-weight: 500;
      border: 1px solid rgba(0, 0, 0, .7);
      padding: 3px 7px;
      border-radius: 3px;
      transition: all .2s ease-in-out;

      @media screen and (min-width: 650px) {
       //transform: translateY(-25px);
     }

      &::placeholder {
          font-weight: 300;
          font-size: 14px;
          font-style: italic;
      }

      &:focus {
        border: 1px solid rgba(0, 0, 0, 1);
      }
        `,
       placeholder: 'E-mail adresa'
    }
}


const buttonStyle = () => {
  
    return `

        // changed
        align-self: center;
        padding: 12px 40px;
        font-size: 16px;
        margin-bottom: 45px;

        position: relative;
        background-color: transparent;
        margin-top: 7%;
        color: #9c8265;
        font-family: 'Neutra';
        border: 1px solid #9c8265;
        transition: all .15s ease-in;

        @media screen and (min-width: 900px) {
            transform: translateY(-40px);
        }

        &::before {
            position: absolute;
            top: -9%;
            left: 1%;
            display: block;
            content: "";
            border: 1px solid #9c8265;
            height: 114%;
            width: 97%;
        }

        &:hover {
            background-color: #e4c7a533;
        }
    `

}
