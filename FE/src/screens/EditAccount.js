import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserTemplate from "../templates/UserTemplate";
import { toast } from "react-toastify";

export default function EditAccount() {
  const param = useParams();

  const [editedAccountInfo, setEditedAccountInfo] = useState(null);
  const [roles, setRole] = useState([]);
  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/ccg1/users/" + param.id
      ); // Thay 'URL_API' bằng URL API thực tế
      setEditedAccountInfo(response.data);
    } catch (error) {
      console.error("Error fetching data user: ", error);
    }
    try {
      const responseRole = await axios.get(
        "http://localhost:8080/api/ccg1/roles"
      ); // Thay 'URL_API' bằng URL API thực tế
      setRole(responseRole.data);
    } catch (error) {
      console.error("Error fetching data role: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAccountInfo({
      ...editedAccountInfo,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      console.log(editedAccountInfo);
      await axios.put(
        "http://localhost:8080/api/ccg1/users/update",
        editedAccountInfo
      );
      // console.log("Thông tin tài khoản đã được cập nhật.");
      toast.success("Update success");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <UserTemplate>
      <div>
        {editedAccountInfo ? (
          <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
              <div className="col-md-3  "></div>
              <div className="col-md-5 ">
                <div className="p-3 py-5">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">Profile Update</h4>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="name"
                        name="name"
                        value={editedAccountInfo.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <label className="labels">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter email"
                        name="email"
                        value={editedAccountInfo.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <label className="labels">PhoneNumber</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter phone number"
                        value={editedAccountInfo.phone}
                        name="phone"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter address"
                        value={editedAccountInfo.address}
                        name="address"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="labels">Gender</label>
                      <input
                        style={{ margin: "10px" }}
                        id="genderMale"
                        type="radio"
                        value="1"
                        name="gender"
                        checked={editedAccountInfo.gender == 1}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="genderMale">Male</label>
                      <input
                        id="genderFemale"
                        style={{ margin: "0 0 0 10px" }}
                        type="radio"
                        name="gender"
                        value="0"
                        onChange={handleInputChange}
                        checked={editedAccountInfo.gender == 0}
                      />
                      <label htmlFor="genderFemale">FeMale</label>
                    </div>

                    <div className="col-md-12">
                      <label className="labels">Role</label>
                      <select
                        className="form-control"
                        name="roleID"
                        value={editedAccountInfo.roleID}
                        onChange={handleInputChange}
                      >
                        {roles.map((role) => (
                          <option key={role.roleID} value={role.roleID}>
                            {role.roleName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <button
                      className="btn btn-primary profile-button"
                      type="button"
                      onClick={handleSave}
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </UserTemplate>
  );
}
