import React from "react";

const EditProfileLayout: React.FC = () => {
  return (
    <div>
      <div className="editProfilecontainer">
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" />

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" />

          <label htmlFor="oldpassword">Old Password:</label>
          <input type="password" name="oldpassword" id="oldpassword" />

          <label htmlFor="newpassword">New Password:</label>
          <input type="password" name="newpassword" id="newpassword" />

          <input type="submit" value="Update Profile" />
        </form>
      </div>
    </div>
  );
};

export default EditProfileLayout;
