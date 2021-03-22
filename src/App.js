import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import {Switch, Route} from 'react-router-dom'

const App = () => {
  return (
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path="/login" component={Login} exact />
      <Route path='/register' component={Register} exact/>
    </Switch>
  )
}

export default App;
