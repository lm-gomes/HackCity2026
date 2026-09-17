import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import TelaInicial from './pages/TelaInicial/TelaInicial'
import ProntuarioForm from './pages/CadastroPaciente/ProntuarioForm'

function App() {
 return(
 <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path='/Inicial' element={<TelaInicial />}/>
        <Route path='/cadastrar-paciente' element={<ProntuarioForm />}></Route>

    </Routes>

  </BrowserRouter> 
 )


}

export default App
