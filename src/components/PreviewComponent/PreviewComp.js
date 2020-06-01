import React from 'react';
import '../../sass/main.scss';

const PreviewComp = (props) => {
    
    let redirect = null;
    if(props.text === 'MUŠKI PARFEMI'){
        redirect = '/muški-testeri/page=1'
    }else if(props.text === 'ŽENSKI PARFEMI') {
        redirect = '/ženski-testeri/page=1'
    }

    return <div onClick={() => props.router.history.push(redirect) } className="Preview-Comp">
                <img  src={require(`../../assets/images/${props.img}.jpg`)} alt="Vestige-parfemi"/>
                <h3> { props.text } </h3>
           </div>
}

export default PreviewComp;