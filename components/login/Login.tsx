import { User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { login } from "../../lib/fire_operations/authenticate";
import CircleProgress from "../animations/progress/circular_progress";
import styles from "./Login.module.css";

export interface ILoginProps extends React.ComponentPropsWithoutRef<"div"> {}

const Login: React.FC<ILoginProps> = ({ ...divProps }) => {

  const router = useRouter();


  const {user, isAuthReady} = useContext(AuthContext);
    //redirect if logged in
    useEffect(() => {
      if(user != null  && isAuthReady ) router.push('/');
   }, [])

   

  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [signInErr, setSignInError] = useState<string|null>(null);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);

  const clearErrorIfAny = ()=> {
    if(signInErr)
    setSignInError(null);
  }

  const onSignInClicked = async () =>{
    if(isSigningIn)return;

    setIsSigningIn(true);

    var email = userEmail.trim();
    var password = userPassword.trim();
    if(email.length == 0 || password.length == 0){
      setSignInError("please enter your email & password");
      setIsSigningIn(false);
      return;
    }

    login(email, password, onSignedIn, onSignInError);

  }

  const onSignedIn = (user: User) => {
    //redirect to home
    setIsSigningIn(false);
    router.push('/');
  }
  const onSignInError = (errMsg : string)=> {
    setSignInError(errMsg);
    setIsSigningIn(false);
  }




  return (
    <div {...divProps} className={`containerParent`}>
      <div className={`container centerInContainer`}>
        <div className={`${styles.loginFormContainer}`}>
          <h1 className="white headline5 mb-std textCenter">WELCOME BACK</h1>
          <button className="primaryGradientBtn button mt-std">
            <i className="bi bi-google"></i>
            <span className="ml-sm">Continue With Google</span>
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
            value={userPassword}
            onChange={(e) => {
              var pass : string = e.target.value;
              setUserPassword(pass);
              clearErrorIfAny();
            }}
            className="primaryInputs mb-std body2"
          />

          {signInErr && (
          <p className="body1 accent mb-std">
            {signInErr}
          </p>)}

         

         <button 
           onClick={onSignInClicked}
          className="button primaryGradientFilledBtn mt-std mb-std">
             {isSigningIn && (<CircleProgress />)}
            <span className="ml-sm">SIGN IN</span>
         </button>   

          <p className="body1 white mt-std mb-std">
            <span className="mr-sm">New Here?</span>
            <Link href={"/register"}>
              <a className="button primaryLight shrinkOnHover"> Sign Up</a>
            </Link>
          </p>
          <p className="body1 ">
            <Link href={"/"}>
              <a className="button primaryLight shrinkOnHover"> Forgot Password?</a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
