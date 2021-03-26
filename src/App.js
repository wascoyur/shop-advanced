import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import {Switch, Route} from 'react-router-dom'
import Header from "./components/nav/Header";
import { Fragment } from "react";

const App = () => {
  return (
    <Fragment>
      <Header/>
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path="/login" component={Login} exact />
      <Route path='/register' component={Register} exact/>
    </Switch>
    </Fragment>
    
  )
}

export default App;
