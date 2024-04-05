import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const AddStudents = () => {
  const [state, setState] = useState({
    fullname: "",
    email: "",
    address: "",
    image_data: null, // Store file object, not value
  });

  const handleInput = (e) => {
    const { name, value, files } = e.target; // Destructure name, value, and files from event target
    setState((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value, // If files exist, set file object; otherwise, set value
    }));
  };

  const saveStudents = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", state.fullname);
    formData.append("email", state.email);
    formData.append("address", state.address);
    formData.append("image_data", state.image_data); // Append file to FormData

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/addstudents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );
      if (res.data.status === 200) {
        console.log(res.data.message);
        setState({
          fullname: "",
          email: "",
          address: "",
          image_data: null, // Reset file object
        });
      }
    } catch (error) {
      console.error("Error adding student:", error);
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
              <form onSubmit={saveStudents} method="post">
                <div className="form-group mb-3">
                  <label>FullName</label>
                  <input
                    type="text"
                    name="fullname"
                    value={state.fullname}
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
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={state.address}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Image</label>
                  <input
                    type="file"
                    name="image_data"
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

export default AddStudents;
