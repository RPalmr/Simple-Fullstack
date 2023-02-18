import { User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { register } from "../../lib/fire_operations/authenticate";
import { setUserProfile } from "../../lib/fire_operations/fire_profile";
import { getEmptyProfile } from "../../models/UserProfile";
import CircleProgress from "../animations/progress/circular_progress";
import styles from "./Register.module.css";

export interface IRegisterProps extends React.ComponentPropsWithoutRef<"div"> {}

const Register: React.FC<IRegisterProps> = ({ ...divProps }) => {
  
  const router = useRouter();

  const {user, isAuthReady} = useContext(AuthContext);

  //redirect if logged in
  useEffect(() => {
    if(user != null && isAuthReady) router.push('/');
 }, [])

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userPassword2, setUserPassword2] = useState<string>("");
  const [signUpErr, setSignUpError] = useState<string|null>(null);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  
  const clearErrorIfAny = ()=> {
    if(signUpErr)
    setSignUpError(null);
  }

  const onSignUpClicked = async() => {
    if(isSigningUp)return;

    setIsSigningUp(true);

    var email = userEmail.trim();
    var password = userPassword.trim();
    if(email.length == 0 || password.length == 0){
      setSignUpError("please enter your email & password");
      setIsSigningUp(false);
      return;
    }

    var password2 = userPassword2.trim();
    if(password != password2){
      setSignUpError("your passwords do not match");
      setIsSigningUp(false);
      return;
    }

    register(email, password, onSignedIn, onSignInError);
  }

  const onSignedIn = async(user: User) => {
    //redirect to profile
    setIsSigningUp(false);
    await setUserProfile(user, getEmptyProfile(user.uid));
    router.push('/profile');
  }

  const onSignInError = (errMsg : string)=> {
    setSignUpError(errMsg);
    setIsSigningUp(false);
  }

  return (
    <div {...divProps} className={`containerParent`}>
      <div className={`container centerInContainer`}>
        <div className={`${styles.registerFormContainer}`}>
          <h1 className="white headline5 mb-std textCenter">WELCOME 2 COSMIC</h1>
          <button className="primaryGradientBtn button mt-std">
            <i className="bi bi-google"></i>
            <span className="ml-sm">Sign Up With Google</span>
          </button>
          <h6 className="mt-std mb-std headline6 white textCenter">OR</h6>

          <input
            type="email"
            name="email"
            id="id_email"
            placeholder="Email"
            className="primaryInputs mb-std body2"
            value={userEmail}
            onChange={(e) => {
              var email : string = e.target.value;
              setUserEmail(email);
              clearErrorIfAny();
            }}
          />
          <input
            type="password"
            name="password"
            id="id_password"
            placeholder="Password"
            className="primaryInputs mb-std body2"
            value={userPassword}
            onChange={(e) => {
              var pass : string = e.target.value;
              setUserPassword(pass);
              clearErrorIfAny();
            }}
          />

        <input
            type="password"
            name="password2"
            id="id_password2"
            placeholder="Confirm Password"
            className="primaryInputs mb-std body2"
            value={userPassword2}
            onChange={(e) => {
              var pass : string = e.target.value;
              setUserPassword2(pass);
              clearErrorIfAny();
            }}
          />

        {signUpErr && (
          <p className="body1 accent mb-std">
            {signUpErr}
          </p>)}

         <button 
           onClick={onSignUpClicked}
         className="button primaryGradientFilledBtn mt-std mb-std">
         {isSigningUp && (<CircleProgress />)}
            <span className="ml-sm">REGISTER</span>
         </button>   

          <p className="body1 white mt-std mb-std">
            <span className="mr-sm">Already Registered?</span>
            <Link href={"/login"}>
              <a className="button primaryLight shrinkOnHover">Log In</a>
            </Link>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Register;
