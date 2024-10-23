import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './componentes/Login';
import GestorTareas from './componentes/GestorTareas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="login" element={<Login />} />
        <Route path="gestor-tareas" element={<GestorTareas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
