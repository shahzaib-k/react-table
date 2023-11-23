import React from "react";

let EditableRow = ({editFormData, handleEditFormChange, handleCancelClick}) => {
    return(
        <>
            <tr>
                <td><input type="text" name="fullName" required="required" placeholder="Enter Your name"
                 onChange={handleEditFormChange} value={editFormData.fullName}></input></td>

                <td><input type="text" name="address" required="required" placeholder="Enter Your address" 
                onChange={handleEditFormChange} value={editFormData.address}></input></td>

                <td><input type="number" name="phoneNumber" required="required" placeholder="Enter Your phone number"
                 onChange={handleEditFormChange} value={editFormData.phoneNumber}></input></td>

                <td><input type="email" name="email" required="required" placeholder="Enter Your email" 
                onChange={handleEditFormChange} value={editFormData.email}></input></td>

                <td>
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelClick}>Cancel</button>

                </td>
            </tr>
        </>
    )
}

export default EditableRow;