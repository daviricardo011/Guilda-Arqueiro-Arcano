import { useCallback, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

interface Adventurer {
  id: string;
  name: string;
  characterClass: string;
  level: number;
  gold: number;
  createdAt: string;
}

const validClasses = [
  "Arqueiro Arcano",
  "Guerreiro",
  "Clérigo",
  "Bardo",
  "Ladino",
];

const generateAdventurer = (index: number) => {
  if ((index + 1) % 3 === 0) {
    return {
      name: `Cultista Infiltrado ${index}`,
      characterClass: "Necromante",
    };
  }

  const selectedClass = validClasses[index % validClasses.length];
  return {
    name: `Herói Recruta ${index}`,
    characterClass: selectedClass,
  };
};

const baseUrl = "http://localhost:3000";

const fetchAdventurersData = async (): Promise<{ data: Adventurer[] }> => {
  const response = await fetch(`${baseUrl}/adventurers`);
  return response.json();
};

function App() {
  const [counter, setCounter] = useState<number>(0);
  const [adventurers, setAdventurers] = useState<Adventurer[]>([]);

  const getAdventurers = useCallback(async () => {
    try {
      const response = await fetchAdventurersData();
      setAdventurers(response.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await fetchAdventurersData();
        setAdventurers(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadInitialData();
  }, []);

  const newAdventurer = async () => {
    try {
      const payload = generateAdventurer(counter);
      const response = await fetch(`${baseUrl}/adventurers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      setCounter((prev) => prev + 1);

      if (!response.ok) {
        const errorData = await response.json();
        alert(
          `FALHA NA INJEÇÃO: ${errorData.message} (${payload.characterClass})`,
        );
        return;
      }

      await getAdventurers();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>AVENTUREIROS</h1>
          <p></p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => newAdventurer()}
        >
          Add aventureiro
        </button>
        <div className="party-grid">
          {adventurers.map((a) => (
            <div key={a.id} className="adventurer-card">
              <h3>{a.name}</h3>
              <div className="stats">
                <p>
                  <strong>Classe:</strong> {a.characterClass}
                </p>
                <p>
                  <strong>Nível:</strong> {a.level}
                </p>
                <p>
                  <strong>Ouro:</strong> {a.gold} PO
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
