import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [numberInSpace, setNumberInSpace] = useState(0);
  const [peopleInSpace, setPeopleInSpace] = useState([]);
  const [activeCraft, setActiveCraft] = useState("All");

  useEffect(() => {
    async function fetchPeopleInSpace() {
      const response = await fetch("http://api.open-notify.org/astros.json");
      const data = await response.json();
      setNumberInSpace(data.number);
      setPeopleInSpace(data.people);
    }
    fetchPeopleInSpace();
  }, []);

  const filteredPeople =
    activeCraft === "All"
      ? peopleInSpace
      : peopleInSpace.filter((person) => person.craft === activeCraft);

  return (
    <main>
      <h1>People in Space: {numberInSpace}</h1>
      <h2>active craft : {activeCraft}</h2>
      <section>
        <button type="button" onClick={() => setActiveCraft("All")}>
          All
        </button>
        <button type="button" onClick={() => setActiveCraft("ISS")}>
          ISS
        </button>
        <button type="button" onClick={() => setActiveCraft("Tiangong")}>
          Tiangong
        </button>
      </section>
      {filteredPeople.length > 0 && (
        <ul>
          {filteredPeople.map((person) => (
            <li key={person.name}>{person.name}</li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
