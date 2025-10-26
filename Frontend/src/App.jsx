import "./App.css";
import "./styles/ui.css";
import AppRoutes from "./routes/AppRoutes";
import axios from "axios";
axios.defaults.withCredentials = true;


function App() {
    return (
        <>
            <AppRoutes />
        </>
    );
}

export default App;
