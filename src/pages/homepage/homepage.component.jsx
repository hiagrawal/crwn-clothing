
import React, {Profiler} from 'react';

import './homepage.styles.scss';

import Directory from '../../components/directory/directory.component'

const HomePage = () => {
    return(
        <div className="homepage">
            <Profiler id="Directory" onRender={(id, phase, actualDuration)=> console.log({id,phase, actualDuration})}>
                <Directory />
            </Profiler>
        </div>
    )
}
export default HomePage;

//Profiler is a tool which is used to measure the render time as we see in Profiler tab in dev tools
//it takes 2 paramters which is mandatory: 
//one is id which is used to give a name to your profiler so you can check in logs for which component it is logging
//and second is onRender function which takes many arguments of which 3 are important:
//one is id which is id given to the profiler
//second is phase which is mount phase or update phase. Update phase is re-render phase only
//and third is actualDuration which is the time it took to render in milliseconds