import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

import WordDetail from "./components/WordDetail";
import Header from "./components/Header";
import AddWord from "./components/AddWord";

function App() {
  const [wordsData, setwordsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function updateList() {
    axios
      .get("https://vocabularybackend.herokuapp.com/words/")
      .then((res) => {
        console.log("Data list UPDATED!");
        // console.log(res);
        setwordsData(res.data);
        // console.log(wordsData);
      })
      .catch((e) => {
        console.log("AXIOS ERROR = " + e);
      });
  }

  useEffect(() => {
    axios
      .get("https://vocabularybackend.herokuapp.com/words/")
      .then((res) => {
        console.log("INITIAL DATA RECIEVED");
        setwordsData(res.data);
      })
      .catch((e) => {
        console.log("AXIOS ERROR = " + e);
      });
  }, []);

  const app_id = "90ebe950";
  const app_key = "51cf55a66d5d1fc59263283cd8d17826";

  const getData = () => {
    let word = document.querySelector("#wordInput").value;
    console.log("WORD = ", word);

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word}`,
        {
          params: {
            fields: "definitions",
            strictMatch: "false",
          },
          headers: {
            app_id: app_id,
            app_key: app_key,
          },
        }
      )
      .then((res) => {
        // console.log(res);

        const wordsData = {
          word: res.data.id,
          definitions:
            res.data.results[0].lexicalEntries[0].entries[0].senses[0]
              .definitions[0],
        };

        // console.log(wordsData);

        axios
          .post("https://vocabularybackend.herokuapp.com/words/add", wordsData)
          .then(() => {
            console.log("word added to mongoDB");
            updateList();
          })
          .catch((e) => {
            console.log("AXIOS ERROR = " + e);
          });
      })
      .catch((e) => {
        console.log("ERROR = ", e);
      });
  };

  return (
    <div className="App">
      <Header setSearchTerm={setSearchTerm} />

      <div className="wordList">
        {wordsData
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.word.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((data, index) => (
            <WordDetail
              key={index}
              word={data.word}
              definitions={data.definitions}
              update={updateList}
            />
          ))}

        <AddWord getData={getData} />
      </div>
    </div>
  );
}

export default App;
