import './App.css';
import Contact from './Contact/Contact';
import CreateItem from './CRUD/CreateItem'
import ReadAll from './CRUD/ReadAll';
import NavigationBar from './BASE/NavigationBar';
import {Routes, Route} from "react-router-dom"
import ReadOne from "./CRUD/ReadOne"
import UpdateOne from './CRUD/UpdateOne';
function App() {
  return (
    <div>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<ReadAll/>}/>
        <Route path="/contact/" element={<Contact/> }/>
        <Route path="/createItem/" element={<CreateItem/>}/>
        <Route path="/readOne/:id" element={<ReadOne/>}/>
        <Route path="/updateOne/:id" element={<UpdateOne/>}/>
      </Routes>
    </div>
  );
}

export default App;
