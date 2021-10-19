import React, { useState, useEffect } from "react";
//
import { useDispatch, useSelector } from "react-redux";
import { asyncOnQueryUsers } from "../redux/manage/manage.utils";
import { onClearUsers } from "../redux/manage/manage.actions";
//
import MySpinner from "../components/MySpinner";
//
import "./ManageUsers.scss";
import UsersTable from "../components/UsersTable";
import AutoSuggest from "../components/AutoSuggest";

export default function ManageUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [inputFocused, setInputFocused] = useState(true);
  const [displayAutoSuggest, setDisplayAutoSuggest] = useState(false);

  const { users, loading } = useSelector((state) => state.manage);
  const dispatch = useDispatch();

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.length) {
        dispatch(asyncOnQueryUsers(query));
        setDisplayAutoSuggest(true);
      }
    }, 1500);

    return () => {
      clearTimeout(delayedSearch);
      dispatch(onClearUsers());
    };
  }, [query, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncOnQueryUsers(query));
  };

  return (
    <div className="manage-users">
      {loading && <MySpinner />}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for user or leave blank to get all users"
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setInputFocused(false);
              }, 200)
            }
          />
          <div className="input-group-append">
            <button
              className="input-group-text"
              id="basic-addon2"
              onClick={() => {
                setDisplayAutoSuggest(false);
                setResults(users);
              }}
            >
              SEND
            </button>
          </div>
        </div>
        <div className="position-relative">
          {users.length !== 0 && displayAutoSuggest && (
            <AutoSuggest results={users} inputFocused={inputFocused} />
          )}
        </div>

        {results !== 0 && <UsersTable users={results} />}
      </form>
    </div>
  );
}
