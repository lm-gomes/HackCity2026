import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import TelaInicial from './pages/TelaInicial/TelaInicial'
import ProntuarioForm from './pages/CadastroPaciente/ProntuarioForm'
import PatientDashboard from './pages/DashboardPaciente/PatientDashboard'
import WaitingQueue from './pages/FilaDeEspera/WaitingQueue'
import SolicitarAgendamento from './pages/SolicitarAgendamento/SolicitarAgendamento'

function App() {
 return(
 <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path='/Inicial' element={<TelaInicial />}/>
        <Route path='/cadastrar-paciente' element={<ProntuarioForm/>}></Route>
        <Route path='/meus-atendimentos' element={<PatientDashboard/>}></Route>
        <Route path='/filas-atendimento' element={<WaitingQueue/>}></Route>
        <Route path='/solicitar-atendimento' element={<SolicitarAgendamento/>}></Route>

    </Routes>

  </BrowserRouter> 
 )


}

export default App
