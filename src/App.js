import './App.css';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Login from "./login";
import Register from "./register";
import PasswordChange from "./passwordchange";
import Contact from "./contact";
import Pending from './pending';
import Pending2 from './pending2';
import Contactsys from './contactsys';
import Instructor from './instructor';
import Asistant from './asistant';
import Admin from './admin';
import Mudek from './mudek';
import DepartmentDocs from './departmentdocs';
import Lecture from './lecture';
import Lecture_Mudek from './lecture_mudek';
import Depdocs_Mudek from './depdocs_mudek';

function App() {
  return (
    <Router>
      <div className="App">

        <Link to="/"></Link>
        <Link to="/register"></Link>
        <Link to="/passwordchange"></Link>
        <Link to="/contact"></Link>
        <Link to="/pending"></Link>
        <Link to="/pending2"></Link>
        <Link to="/contactsys"></Link>
        <Link to="/instructor"></Link>
        <Link to="/asistant"></Link>
        <Link to="/admin"></Link>
        <Link to="/mudek"></Link>
        <Link to="/departmentdocs"></Link>
        <Link to="/lecture"></Link>
        <Link to="/lecture_mudek"></Link>
        <Link to="/depdocs_mudek"></Link>

      </div>

      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/passwordchange" component={PasswordChange}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/pending" component={Pending}/>
        <Route path="/pending2" component={Pending2}/>
        <Route path="/contactsys" component={Contactsys}/>
        <Route path="/instructor" component={Instructor}/>
        <Route path="/asistant" component={Asistant}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/mudek" component={Mudek}/>
        <Route path="/departmentdocs" component={DepartmentDocs}/>
        <Route path="/lecture" component={Lecture}/>
        <Route path="/lecture_mudek" component={Lecture_Mudek}/>
        <Route path="/depdocs_mudek" component={Depdocs_Mudek}/>
      </Switch>
    </Router>
  );
}

export default App;
