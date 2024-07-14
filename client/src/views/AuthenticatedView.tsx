import rocket from "../assets/rocket.png";

export const AuthenticatedView = () => {
  return (
    <div>
      <img src={rocket} alt="rocket" />
      <h1>You are authenticated</h1>
    </div>
  );
};
