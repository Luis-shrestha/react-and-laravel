import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "/helllo/example3/test2/frontend/src/assets/css/style.css";

class Students extends Component {
  state = {
    students: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/showstudents"
      );
      if (response.data.status === 200) {
        this.setState({
          students: response.data.student,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }
  deleteUser = async (e, id) => {
    const clicked = e.currentTarget;
    clicked.innerText = "deleting";
    const res = await axios.delete(
      `http://127.0.0.1:8000/api/deletestudent/${id}`
    );
    if (res.data.status === 200) {
      clicked.closest("tr").remove();
      console.log(res.data.message);
    }
  };

  render() {
    const { students, loading } = this.state;

    let studentTable;

    if (loading) {
      studentTable = (
        <tr>
          <td colSpan="6">
            <h3>Loading</h3>
          </td>
        </tr>
      );
    } else if (students.length === 0) {
      studentTable = (
        <tr>
          <td colSpan="6">
            <h3>No data are stored</h3>
          </td>
        </tr>
      );
    } else {
      studentTable = students.map((student) => (
        // <tr key={student.id}>
        //   <td>{student.id}</td>
        //   <td>{student.fullname}</td>
        //   <td>{student.email}</td>
        //   <td>{student.address}</td>
        //   <td>
        //     <img
        //       src={`http://127.0.0.1:8000/images/${student.image_data}`}
        //       // alt={`Image of ${student.fullname}`}
        //       height="100"
        //     />
        //     {`image of ${student.fullname}`}
        //   </td>
        //   <td>
        //     <Link to="" className="btn btn-success btn-sm">
        //       Edit
        //     </Link>
        //     <button
        //       type="button"
        //       className="btn btn-danger btn-sm"
        //       onClick={(e) => this.deleteUser(e, student.id)}
        //     >
        //       Delete
        //     </button>
        //   </td>
        // </tr>
        <div className="students-details" key={student.id}>
          <img
            src={`http://127.0.0.1:8000/images/${student.image_data}`}
            alt={`Image of ${student.fullname}`}
            height="100"
          />
          <p>{student.fullname}</p>
          <p>{student.email}</p>
          <p>{student.contact}</p>
        </div>
      ));
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Students details
                  <Link to={"addstudents"}>
                    <button className="btn btn-primary btn-sm float-end">
                      Add Students
                    </button>
                  </Link>
                </h4>
              </div>
              {/* <div className="card-body">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <td>id</td>
                      <td>fullname</td>
                      <td>email</td>
                      <td>address</td>
                      <td>Image</td>
                      <td>Operations</td>
                    </tr>
                  </thead>
                  <tbody>{studentTable}</tbody>
                </table>
              </div> */}
              <div className="container-body">{studentTable}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Students;
