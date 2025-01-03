import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
      if (!token) {
        setError("Unauthorized access.");
        return navigate("/login"); // Redirect to login if no token
      }

      try {
        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  // Save profile changes
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "http://localhost:3000/profile",
        { ...profile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    }
  };

  // Cancel and go back to the previous page
  const handleCancel = () => {
    navigate(-1); // Navigates back to the previous route
  };

  return (
    <div className="flex flex-col w-full min-w-screen h-full min-h-screen bg-[#D9D9D9] font-poppins">
      <h1 className="approval text-2xl font-500 text-[#133517] mt-4 mr-4 p-4">
        User Profile
      </h1>
      <div className="requestTable">
        <div className="reqbox">
          <h2 className="reqform">Edit Profile</h2>
          <div className="form-container">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname" className="fname">
                  Firstname
                </label>
                <input
                  type="text"
                  id="firstname"
                  className="form-input"
                  value={profile.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname" className="lname">
                  Lastname
                </label>
                <input
                  type="text"
                  id="lastname"
                  className="form-input"
                  value={profile.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username" className="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  value={profile.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={profile.password}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {error && <p className="error-message text-red-500">{error}</p>}
          <div className="buttonContainer">
            <button className="button1" onClick={handleCancel}>
              Cancel
            </button>
            <button className="savebtn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
