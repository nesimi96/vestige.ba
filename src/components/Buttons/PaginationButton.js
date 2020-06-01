import React from 'react';
import '../../sass/main.scss';

const PaginationButton = (props) => {

    if(props.diff){
        return null
    }else {
        return <div onClick={() => props.text !== '...' ? props.changePage(props.text) : null } className="PaginationButton" style={props.style} >
                    { props.text } 
                </div>
    }

}

export default PaginationButton