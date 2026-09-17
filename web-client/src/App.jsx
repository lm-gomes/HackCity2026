import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'
import TelaInicial from './pages/TelaInicial/TelaInicial'


function App() {
 return(
 <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path='/Inicial' element={<TelaInicial />}/>

    </Routes>

  </BrowserRouter> 
 )


}

export default App
