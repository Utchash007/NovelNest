import React, { useState } from "react";

const EditProfileLayout=()=>{
    return (

        <div>

            <div className="editProfilecontainer">
                <form>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name ="username" id="username"/>
                    
                    <label htmlFor="email">Email:</label>
                    <input type="text" name ="username" id="username"/>

                    <label htmlFor="oldpassword">Old Password:</label>
                    <input type="text" name ="oldpassword" id="oldpassword"/>

                    <label htmlFor="newpassword">Old Password:</label>
                    <input type="text" name ="newpassword" id="newpassword"/>
                    
                    <input type="submit" value="Update Profile"/>
                </form>
            </div>

        </div>

    )
};

export default EditProfileLayout;