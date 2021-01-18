import React, { useState } from "react";
import "../stylesheets/AddWord.css";

import ReactLoading from "react-loading";
import AddIcon from "@material-ui/icons/Add";

function AddWord({ getData }) {
  const [wordAdder, setwordAdder] = useState(false);

  function addWordToDatabase() {
    console.log("start");
    document.querySelector("#loading").style.visibility = "visible";
    getData();
    setTimeout(() => {
      document.querySelector("#loading").style.visibility = "hidden";
      setwordAdder(!wordAdder);
    }, 3500);
  }

  return (
    <div>
      <div className="addWord" onClick={() => setwordAdder(!wordAdder)}>
        <AddIcon />
      </div>

      {wordAdder ? (
        <div className="addWordDiv">
          <div className="addWordInner">
            <p>Add Word</p>
            <input type="text" id="wordInput" placeholder="word" />
            <div id="loading">
              <ReactLoading type="spin" color="purple" height={40} width={40} />
            </div>

            <div className="buttons">
              <button
                className="adderButton"
                onClick={() => setwordAdder(!wordAdder)}
              >
                Cancel
              </button>
              <button className="adderButton" onClick={addWordToDatabase}>
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AddWord;
