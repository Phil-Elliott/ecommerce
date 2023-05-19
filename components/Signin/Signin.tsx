import React, { useState } from "react";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

type signInProps = {
  closeModal: () => void;
};

const Signin = ({ closeModal }: signInProps) => {
  const [login, setLogin] = useState(true);

  const handleFormChange = () => {
    setLogin(!login);
  };

  return (
    <div>
      {login ? (
        <Login
          closeModal={closeModal}
          handleFormChange={() => handleFormChange()}
        />
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
