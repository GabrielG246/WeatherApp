import React from 'react';

import '../../assets/css/Body-Style/loading.scss'

const Loading= () =>{

    return(
        <div className='loader__container'>
            <div class="lds-ripple">
                <div> </div>
                <div> </div>
            </div>
        </div>
    )
}

export default Loading;