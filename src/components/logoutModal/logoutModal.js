import style from "./logoutModal.module.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import { userContext } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";
function LogoutModal({ closeHandler }) {
  const { user, setUser } = useContext(userContext);

  async function handleLogout() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH}api/logout`
      );
      if (response) {
        console.log(response.data);
        toast.success(response.data);
        setUser(null);
        closeHandler();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <motion.div className={style.logoutModalContainer}>
      <motion.div className={style.logoutModalWrapper}>
        <h3>Leaving so soon?</h3>
        <p>
          You are logging out from {user.firstName} {user.lastName}
        </p>
        <div className={style.modalBtnContainer}>
          <button className={style.logoutBtn} onClick={handleLogout}>
            Log Out
          </button>
          <button className={style.logoutCancelBtn} onClick={closeHandler}>
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LogoutModal;
