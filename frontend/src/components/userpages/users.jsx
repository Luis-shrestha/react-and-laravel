import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
class Users extends Component {
  state = {
    user: [],
    loading: true,
  };
  async componentDidMount() {
    const response = await axios.get("http://127.0.0.1:8000/api/showuser");
    if (response.data.status === 200) {
      this.setState({
        user: response.data.user,
        loading: false,
      });
    }
  }
  deleteUser = async (e, id) => {
    const clicked = e.currentTarget;
    clicked.innerText = "deleting";
    const res = await axios.delete(
      `http://127.0.0.1:8000/api/deleteuser/${id}`
    );
    if (res.data.status === 200) {
      clicked.closest("tr").remove();
      console.log(res.data.message);
    }
  };
  render() {
    var user_table = "";
    if (this.state.loading) {
      user_table = (
        <tr>
          <td colSpan="4">
            <h3>Loading</h3>
          </td>
        </tr>
      );
    } else {
      user_table = this.state.user.map((items) => {
        return (
          <tr key={items.id}>
            <td>{items.id}</td>
            <td>{items.name}</td>
            <td>{items.email}</td>
            <td>
              <Link
                to={`editusers/${items.id}`}
                className="btn btn-success btn-sm"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={(e) => this.deleteUser(e, items.id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Users data
                  <Link to={"addusers"}>
                    <button className="btn btn-primary btn-sm float-end">
                      Add Users
                    </button>
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <td>id</td>
                      <td>name</td>
                      <td>email</td>
                      <td>operation</td>
                    </tr>
                  </thead>
                  <tbody>{user_table}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Link to={"/students"}>
          <button className="btn btn-primary btn-sm float-end">
            Students Table
          </button>
        </Link>
      </div>
    );
  }
}

export default Users;
