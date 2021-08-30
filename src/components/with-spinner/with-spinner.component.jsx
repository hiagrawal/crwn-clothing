import React from 'react';
import { SpinnerContainer, SpinnerOverlay } from './with-spinner.styles';

const WithSpinner = WrappedComponent => {
    const Spinner = ({isLoading, ...otherProps}) => {
        return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
        ) : (
          <WrappedComponent {...otherProps}/>
        )
    };
    return Spinner;
};

export default WithSpinner;

//this WithSpinner is Higher Order Component that takes another component (WrappedCpomponent) 
//and returns a new functional component (Spinner) 

//now this new functional Spinner component is checking isLoading paramter
//if true, then it is returning SpinnerContainer or the passed component only (WrappedComponent) with all it's properties