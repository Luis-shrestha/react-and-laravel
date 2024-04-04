import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Students extends Component {
  state = {
    user: [],
    loading: true,
  };
  async componentDidMount() {
    const response = await axios.get("http://127.0.0.1:8000/api/showstudents");
    if (response.data.status === 200) {
      this.setState({
        student: response.data.student,
        loading: false,
      });
    }
  }

  render() {
    var student_table = "";
    if (this.state.loading) {
      student_table = (
        <tr>
          <td colSpan="6">
            <h3>Loading</h3>
          </td>
        </tr>
      );
    } else {
      student_table = this.state.user.map((items) => {
        return (
          <tr key={items.id}>
            <td>{items.id}</td>
            <td>{items.fullname}</td>
            <td>{items.email}</td>
            <td>{items.address}</td>
            <td>{items.iamge_data}</td>
            <td>
              <Link to="" className="btn btn-success btn-sm">
                Edit
              </Link>

              <button type="button" className="btn btn-danger btn-sm">
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
                  <Link to={"addstudents"}>
                    <button className="btn btn-primary btn-sm float-end">
                      Add Students
                    </button>
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <td>id</td>
                      <td>fullname</td>
                      <td>email</td>
                      <td>address</td>
                      <td>image_data</td>
                      <td>operations</td>
                    </tr>
                  </thead>
                  <tbody>{student_table}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Students;
