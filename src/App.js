import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import history from "./utils/history";
import Register from "./pages/Register";
import VerifyEmail from "./components/VerifyEmail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkToken } from "./redux/action";
import BackdropSimple from "./components/BackdropSimple";
import PrivateRouter from "./Layouts/PrivateRouter";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(checkToken(token));
  }, [dispatch]);

  return (
    <div className="App">
      <BackdropSimple />
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <PrivateRouter path="/post" component={Post} exact />
          <Route path={"/register"} component={Register} />
          <Route path="/verify-email" component={VerifyEmail} />
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
