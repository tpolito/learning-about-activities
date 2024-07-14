import "./App.css";
import rocket from "./assets/rocket.png";
import { useSetupAndAuthDiscord } from "./hooks/useSetupAndAuthDiscord";
import { AuthenticatedView } from "./views/AuthenticatedView";

function App() {
  const { auth, isLoading, error } = useSetupAndAuthDiscord();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!auth) {
    return (
      <div>
        <img src={rocket} alt="rocket" />
        <h1>Not authenticated</h1>
      </div>
    );
  }

  return <AuthenticatedView />;
}

export default App;
