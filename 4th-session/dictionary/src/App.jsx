import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [word, setWord] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word, { method: "GET" }).then(
      (response) => {
        if (response.ok)
          return response.json().then((response) => {
            setIsLoading(false);
            setData(response);
          });
        else {
          setIsLoading(false);
          setData(undefined);
        }
      }
    );
  }, [word]);
  return (
    <div>
      <input
        onChange={(event) => {
          const word = event.target.value;
          setWord(word);
        }}
      ></input>
      {isLoading ? "Loading..." : undefined}
      {data?.map((word, index) => {
        return (
          <div className="word" key={word.word + index}>
            <p>{word.word}</p>
            <div className="meanings">
              {word.meanings.map((meaning, index) => {
                return (
                  <div className="meaning" key={word.word + meaning.partOfSpeech + index}>
                    <p className="part-of-speech">{meaning.partOfSpeech}</p>
                    <ul className="definitions">
                      {meaning.definitions.map((definition) => {
                        return (
                          <li className="definition" key={definition.definition}>
                            {definition.definition}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
