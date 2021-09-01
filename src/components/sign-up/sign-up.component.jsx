
import React, {useState} from 'react';
import './sign-up.styles.scss';

import Forminput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';

import {connect} from 'react-redux';
import {signUpStart} from '../../redux/user/user.actions';


/*class SignUp extends React.Component{
    constructor(){
      super();
      this.state= {
          displayName:"",
          email:"",
          password:"",
          confirmPassword:""
      }
    }

    handleChange = event =>{
        const {name,value} = event.target;
         this.setState({[name]:value});
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        const {signUpStart} = this.props;

        if(password !== confirmPassword){
            alert('Password do not match');
            return;
        }
        signUpStart(email,password,displayName);

        // try{
        //     const {user} = await auth.createUserWithEmailAndPassword(email,password);
        //     await createUserProfileDocument(user, {displayName});
        //     this.setState({
        //         displayName:"",
        //         email:"",
        //         password:"",
        //         confirmPassword:""
        //     })
        // }
        // catch(error){
        //     console.error(error);
        // }
    }

    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <Forminput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        label="Display Name"
                        onChange={this.handleChange}
                        required /> 
                    <Forminput 
                        type="email"
                        name="email"
                        value={email}
                        label="Email"
                        onChange={this.handleChange}
                        required />
                    <Forminput 
                        type="password"
                        name="password"
                        value={password}
                        label="Password"
                        onChange={this.handleChange}
                        required />
                    <Forminput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        label="Confirm Password"
                        onChange={this.handleChange}
                        required />
                    <CustomButton type="submit">Sign Up</CustomButton>
                   
                    
                </form>

            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (email,password,displayName) => dispatch(signUpStart({email,password,displayName}))
})

export default connect(null,mapDispatchToProps)(SignUp);*/

//converted class component to function component and used useState hook for local states
const SignUp = ({signUpStart}) => {

    const [userCredentials, setUserCredentials] = useState({
        displayName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleChange = event =>{
        const {name,value} = event.target;
        setUserCredentials({...userCredentials,[name]:value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('Password do not match');
            return;
        }
        signUpStart(email,password,displayName);
    }

        return(
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={handleSubmit}>
                    <Forminput 
                        type="text"
                        name="displayName"
                        value={displayName}
                        label="Display Name"
                        onChange={handleChange}
                        required /> 
                    <Forminput 
                        type="email"
                        name="email"
                        value={email}
                        label="Email"
                        onChange={handleChange}
                        required />
                    <Forminput 
                        type="password"
                        name="password"
                        value={password}
                        label="Password"
                        onChange={handleChange}
                        required />
                    <Forminput 
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        label="Confirm Password"
                        onChange={handleChange}
                        required />
                    <CustomButton type="submit">Sign Up</CustomButton>
                   
                    
                </form>

            </div>

        )
    }

const mapDispatchToProps = dispatch => ({
    signUpStart: (email,password,displayName) => dispatch(signUpStart({email,password,displayName}))
})

export default connect(null,mapDispatchToProps)(SignUp);
