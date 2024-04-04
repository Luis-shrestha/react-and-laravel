import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AddUsers = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:8000/api/adduser", state);
    if (res.data.status === 200) {
      console.log(res.data.message);
      setState({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Add Users
                <Link to={"/"}>
                  <button className="btn btn-primary btn-sm float-end">
                    Back
                  </button>
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={saveUser} method="post">
                <div className="form-group mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={state.name}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={state.email}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>password</label>
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
