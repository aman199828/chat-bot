import { Provider } from "react-redux";
import { store } from "./redux/store";

// import { decryptData } from "./utils/utils";
function App() {
  // const token = decryptData("token");
  return (
    <Provider store={store}>
      <></>
    </Provider>
  );
}

export default App;
