import React, { useState } from "react";
import axios from "axios";
import "../stylesheets/WordDetail.css";

import CloseIcon from "@material-ui/icons/Close";

function WordDetail({ word, definitions, update }) {
  const [wordDetailsOpen, setWordDetailsOpen] = useState(false);

  const deleteWord = () => {
    axios
      .delete(`https://vocabularybackend.herokuapp.com/words/delete/${word}`)
      .then((res) => {
        // console.log(res);
        console.log("Word DELETED");
        update();
      })
      .catch((e) => {
        console.log("AXIOS ERROR = " + e);
      });
  };

  return (
    <div>
      <div
        className="wordDetails"
        onClick={() => setWordDetailsOpen(!wordDetailsOpen)}
      >
        <div>
          <h2>{word}</h2>
          <p style={{ fontSize: "18px" }}>{definitions}</p>
        </div>
      </div>


      {wordDetailsOpen ? (
        <div className="wordsDetailsFull">
          <div className="wordsDetailInner">
            <div className="wordHeading">
              <h2>{word}</h2>
              <CloseIcon
                className="closeIcon"
                onClick={() => setWordDetailsOpen(!wordDetailsOpen)}
              />
            </div>
            <div className="definitionInner">
              <p style={{ fontSize: "18px" }}>{definitions}</p>
            </div>
            <div className="removeButtonDiv">
              <button className="removeButton" onClick={deleteWord}>
                delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default WordDetail;
