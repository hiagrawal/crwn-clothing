
import React, {useState} from 'react';
import './sign-in.styles.scss';

import Forminput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth,signInWithGoogle} from '../../firebase/firebase.utils';

import {connect} from 'react-redux';
import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'

/*class SignIn extends React.Component{
    constructor(props){
      super(props);
      this.state= {
          email:"",
          password:""
      }
    }

    handleChange = event =>{
        const {name,value} = event.target;
         this.setState({[name]:value});
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;
        const {emailSignInStart} = this.props;
        emailSignInStart(email,password);
        // try{
        //     await auth.signInWithEmailAndPassword(email,password)
        //     this.setState({email:'', password:''})
        // }
        // catch(error){
        //     console.log(error);
        // }
    }

    render(){
        const {googleSignInStart} = this.props;
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
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                    
                </form>

            </div>

        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: ()=> dispatch(googleSignInStart()),
    emailSignInStart: (email,password)=>dispatch(emailSignInStart({email,password}))
})

export default connect(null, mapDispatchToProps)(SignIn);*/

//converted class component to function component and used useState hook for local states
const SignIn = ({emailSignInStart, googleSignInStart}) => {
    const [userCrenentials, setUserCredentials] = useState({email:"",password:""})

    const {email, password} = userCrenentials;

    const handleChange = event =>{
        const {name,value} = event.target;
        setUserCredentials({...userCrenentials, [name]:value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        emailSignInStart(email,password);
    }

    return(
        <div className="sign-in">
            <h2 className="title">I already have an account</h2>
            <span className="sub-title">Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <Forminput 
                    type="email"
                    name="email"
                    value={email}
                    label="Email"
                    handleChange={handleChange}
                    required />
                <Forminput 
                    type="password"
                    name="password"
                    value={password}
                    label="Password"
                    handleChange={handleChange}
                    required />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign In With Google</CustomButton>
                </div>
                
            </form>

        </div>

    )
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: ()=> dispatch(googleSignInStart()),
    emailSignInStart: (email,password)=>dispatch(emailSignInStart({email,password}))
})

export default connect(null, mapDispatchToProps)(SignIn);
