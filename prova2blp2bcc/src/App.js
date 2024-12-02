import { Provider } from "react-redux";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TelaUsuario from "./componentes/telas/TelaUsuario";
import Mensagens from "./componentes/telas/Mensagens.jsx";
import TelaMenu from "./componentes/telas/TelaMenu"
import Tela404 from "./componentes/telas/Tela404"
import store from "./redux/store.js"
import TelaMensagem from "./componentes/telas/telaMensagem.jsx";



function App() {
  return (
    <div >
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/usuario" element={<TelaUsuario />} />
            <Route path="/mensagem" element={<TelaMensagem />} />
            <Route path="/" element={<TelaMenu />} />
            <Route path="*" element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
