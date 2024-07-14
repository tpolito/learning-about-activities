import "./App.css";
import rocket from "./assets/rocket.png";
import { useSetupAndAuthDiscord } from "./hooks/useSetupAndAuthDiscord";

function App() {
  const { auth, isLoading, error } = useSetupAndAuthDiscord();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <img src={rocket} alt="rocket" />
      <h1>Hello worlds</h1>
      {auth && <p>Authenticated successfully!</p>}
    </div>
  );
}

export default App;
