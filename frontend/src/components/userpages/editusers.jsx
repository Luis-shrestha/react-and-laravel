import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class EditUsers extends Component {
  state = {
    name: "",
    email: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  async componentDidMount() {
    // const user_id = this.props.match.params.id;
    // console.log(user_id);
    const res = await axios.get(
      `http://127.0.0.1:8000/api/edituser/${user_id}`
    );
    if (res.data.status === 200) {
      this.setState({
        name: res.data.user.name,
        email: res.data.user.email,
      });
    }
  }

  updateUsers = async (e) => {
    e.preventDefault();
    document.getElementById("updatebtn").disabled = true;
    document.getElementById("updatebtn").innerText = "Updating";
    // const user_id = this.props.match.params.id;
    const res = await axios.put(
      `http://127.0.0.1:8000/api/updateuser/${user_id}`,
      this.state
    );
    if (res.data.status === 200) {
      console.log(res.data.message);
      document.getElementById("updatebtn").disabled = false;
      document.getElementById("updatebtn").innerText = "Update Users";
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Users data
                  <Link to={"/"}>
                    <button className="btn btn-primary btn-sm float-end">
                      Back
                    </button>
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.updateUsers} method="post">
                  <div className="form-group mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      className="form-control"
                      onChange={this.handleInput}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={this.state.email}
                      className="form-control"
                      onChange={this.handleInput}
                    />
                  </div>
                  {/* <div className="form-group mb-3">
                    <label>password</label>
                    <input
                      type="password"
                      name="password"
                      value={this.state.password}
                      className="form-control"
                      onChange={this.handleInput}
                    />
                  </div> */}
                  <button
                    type="submit"
                    className="btn btn-success"
                    id="updatebtn"
                  >
                    Update Users
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditUsers;
