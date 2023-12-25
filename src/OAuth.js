import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "./firebase";
import Styles from "./OAuth.module.css";
import googleIcon from "./assets/icons/googleIcon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function OAuth() {
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await axios.post(
        ` ${process.env.REACT_APP_PATH}api/google-auth`,
        {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }
      );
      if (res) {
        console.log(res.data);
      }
      toast.success(`Welcome Back ${res.data.firstName}`);

      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className={Styles.googleButton}
    >
      <img src={googleIcon} /> <span>Continue with google</span>
    </button>
  );
}
