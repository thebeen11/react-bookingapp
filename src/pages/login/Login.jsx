import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/authContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const {  loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate()

  const handleClick = async (e) =>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try {
        const res = await axios.post("/auth/login", credentials)
        dispatch({type:"LOGIN_SUCCESS", payload: res.data})
        navigate("/")
    } catch (error) {
        dispatch({type:"LOGIN_FAILURE", payload: error.response.data})
    }
  }

  return (
    <div className="login">
      <div className="loginContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          className="loginInput"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="loginInput"
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleClick} className="loginButton">Login</button>
        {error && (
          <>
            <span>{error.message}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
