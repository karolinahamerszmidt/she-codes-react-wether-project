import "./styles.css";

import Search from "./Search";

export default function App() {
  return (
    <div className="App">
      <h1>Weather Search Engine</h1>
      <Search />
      <div className="footer">
        This website was coded by{" "}
        <a
          href="https://github.com/karolinahamerszmidt"
          rel="noreferrer"
          target="_blank"
        >
          Karolina Hamerszmidt
        </a>{" "}
        and is{" "}
        <a
          href="https://github.com/karolinahamerszmidt/she-codes-react-wether-project"
          rel="noreferrer"
          target="_blank"
        >
          open sourced on Github
        </a>{" "}
        and hosted on Netlify
      </div>
    </div>
  );
}
