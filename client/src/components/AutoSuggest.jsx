import React from "react";
//
import { useHistory, useLocation } from "react-router-dom";
//
import "./AutoSuggest.scss";

const AutoSuggest = ({ results, inputFocused }) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="auto-suggest bg-light border">
      {inputFocused && (
        <ul>
          {results.map((result) => (
            <li
              key={`${result.email}`}
              onClick={(e) => {
                history.push(`${location.pathname}/${result.email}`);
              }}
            >
              <strong>

              {result.username}
              </strong>
              {" - "}
              {result.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoSuggest;
