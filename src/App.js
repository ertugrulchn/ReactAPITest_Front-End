import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Modal from 'react-modal';

const api = axios.create({
  baseURL: `https://localhost:44368/api/User/`,
});

class App extends Component {
  state = {
    users: [],
  };

  constructor() {
    super();
    this.getUsers();
  }

  getUsers = async () => {
    try {
      let data = await api.get("/").then(({ data }) => data);
      this.setState({ users: data });
    } catch (err) {
      console.log(err);
    }
  };

  createUser = async () => {
    let res = await api
      .post("/", {
        firstName: "Test Name",
        lastName: "Test",
        age: 18,
        city: "İstanbul/Türkiye",
      })
      .catch((err) => console.log(err));
    console.log(res);
    this.getUsers();
  };

  deleteUser = async (id) => {
    let data = await api.delete(`/${id}`);
    this.getUsers();
  };

  updateUser = async (id, val) => {
    let data = await api.put(`/${id}`, { firstName: val });
    this.getUsers();
  };

  render() {
    return (
      <div className="App">
        <button style={{marginTop: "20px"}} className="btn" onClick={this.createUser}>Create New User</button>
        <header className="App-header">
          {this.state.users.map((user) => (
            <div className="user">
              <h2
                key={user.id}
                onClick={() =>
                  this.updateUser(
                    user.id,
                    ` ${user.firstName} ${user.lastName}a`
                  )
                }
              >
                {user.firstName} {user.lastName}
              </h2>
              <p>{user.age}</p>
              <p>{user.city}</p>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteUser(user.id)}
              >
                X
              </button>
            </div>
          ))}
        </header>
      </div>
    );
  }
}

export default App;
