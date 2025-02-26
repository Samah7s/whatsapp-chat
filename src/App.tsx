import { GlobalStyles } from "./styles/global";
import Login from "./components/Login/Login";
import Chat from "./components/Chat/Chat";
import { useChatContext } from "./context/ChatContext";

function App() {
  const { isLogged } = useChatContext();

  return (
    <>
      <GlobalStyles />
      <div>{!isLogged ? <Login /> : <Chat />}</div>
    </>
  );
}

export default App;
