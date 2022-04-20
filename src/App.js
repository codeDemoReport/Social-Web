import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BackdropSimple from "./components/BackdropSimple";
import Header from "./components/Header";
import VerifyEmail from "./components/VerifyEmail";
import PrivateRouter from "./Layouts/PrivateRouter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Register from "./pages/Register";
import { checkToken, getNotify } from "./redux/action";


import history from "./utils/history";

function App() {
  const dispatch = useDispatch();
  const {reducer} = useSelector(state=>state)

  useEffect(() => {
     const token = localStorage.getItem("token");
    if (token) {
      dispatch(checkToken(token));
    }
  }, [dispatch]);

  useEffect(() => {
    if (reducer.infoUser)
      dispatch(getNotify())
  }, [reducer.infoUser])

  return (
    <div className="App">
      <BackdropSimple />
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/register" component={Register} exact />
          <Route path="/verify-email" component={VerifyEmail} exact />

          <PrivateRouter path="/post" component={Post} exact />
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
