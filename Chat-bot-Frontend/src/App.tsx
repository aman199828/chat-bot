import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { getAllQuestions } from "./redux/thunks/vacancy";
import Bot from "./components/bot";
import "./App.css";
import "./assets/bootstrap/bootstrap.min.css";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllQuestions());
  }, [dispatch]);
  return <Bot />;
}

export default App;
