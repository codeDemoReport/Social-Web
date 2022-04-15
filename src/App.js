import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import history from "./utils/history";
import Register from "./pages/Register"
import VerifyEmail from "./components/VerifyEmai";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "./redux/action";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token)
      dispatch(checkToken(token))
  }, [dispatch])

  return (
    <div className="App">
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path={"/register"} component={Register} />
          <Route path="/verify-email" component={VerifyEmail}/>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
