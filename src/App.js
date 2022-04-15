import { Route, Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import history from "./utils/history";
import Register from "./pages/Register"

function App() {
  return (
    <div className="App">
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route path={"/register"} component={Register}/>
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
