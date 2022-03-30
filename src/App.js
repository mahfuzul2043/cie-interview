import Autocomplete from "./components/Autocomplete";
import CommonMovies from "./components/CommonMovies";
import Header from "./components/Header";
import SelectedActors from "./components/SelectedActors";

function App() {
  return (
    <>
      <Header />
      <main>
        <Autocomplete />
        <br />
        <SelectedActors />
        <br />
        <CommonMovies />
      </main>
    </>
  );
}

export default App;
