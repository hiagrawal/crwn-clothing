
import React from 'react';
import './sign-in.styles.scss';

import Forminput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

class SignIn extends React.Component{
    constructor(props){
      super(props);
      this.state= {
          email:"",
          password:""
      }
    }

    handleChange = (event) =>{
        const {name,value} = event.target;
         this.setState({[name]:value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({email:'', password:''})
    }

    render(){
        return(
            <div className="sign-in">
                <h2 className="title">I already have an account</h2>
                <span className="sub-title">Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <Forminput 
                        type="email"
                        name="email"
                        value={this.state.email}
                        label="Email"
                        handleChange={this.handleChange}
                        required />
                    <Forminput 
                        type="password"
                        name="password"
                        value={this.state.password}
                        label="Password"
                        handleChange={this.handleChange}
                        required />
                    <CustomButton type="submit">Sign In</CustomButton>
                </form>

            </div>

        )
    }
}

export default SignIn;
