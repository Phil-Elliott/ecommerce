import React, { useState } from "react";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import ForgotPassword from "./Login/ForgotPassword";

type signInProps = {
  closeModal: () => void;
};

const Signin = ({ closeModal }: signInProps) => {
  const [login, setLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  // changes the form from login to signup
  const handleFormChange = () => {
    setLogin(!login);
  };

  // changes the form from login to forgot password
  const handleForgotPassword = () => {
    setForgotPassword(!forgotPassword);
  };

  return (
    <div>
      {login ? (
        !forgotPassword ? (
          <Login
            closeModal={closeModal}
            handleFormChange={() => handleFormChange()}
            handleForgotPassword={() => handleForgotPassword()}
          />
        ) : (
          <ForgotPassword
          // closeModal={closeModal}
          // handleFormChange={() => handleFormChange()}
          />
        )
      ) : (
        <Signup
          closeModal={closeModal}
          handleFormChange={() => handleFormChange()}
        />
      )}
    </div>
  );
};

export default Signin;

/*

// const jwt = useSelector((state: RootState) => state.project.jwt);

  // useEffect(() => {
  //   if (localStorage.getItem("jwt") !== null) {
  //     navigate("/dashboard/");
  //   }
  // }, [jwt]);

  // console.log(jwt, "signin jwt");




*/
