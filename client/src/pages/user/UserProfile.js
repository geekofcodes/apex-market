// UserProfile.js
import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';

const UserProfile = ({ user }) => {
  const [address, setAddress] = useState(user.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    // If address or phoneNumber is not present, it's the first time update
    const isFirstTimeUpdate = !user.address || !user.phoneNumber;
    try {
      await userService.updateUserDetails(user._id, { address, phoneNumber });

      // If successful, you might want to update the user state or fetch the user again
      console.log('Updated Address:', address);
      console.log('Updated Phone Number:', phoneNumber);
      // For simplicity, let's just log a success message
      console.log('User details updated successfully');
    } catch (error) {
      // Handle errors, show a message, etc.
      console.error('Error updating user details:', error);
    }

    // Set isEditing to false after saving
    setIsEditing(false);
  };

  useEffect(() => {
    // Check if user details already include address and phoneNumber
    if (!user.address || !user.phoneNumber) {
      // If not, set isEditing to true to enable editing
      setIsEditing(true);
    }
  }, [user]);

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {user.name}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Address:</strong>{' '}
        {isEditing ? (
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        ) : (
          <span>{address}</span>
        )}
      </div>
      <div>
        <strong>Phone Number:</strong>{' '}
        {isEditing ? (
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        ) : (
          <span>{phoneNumber}</span>
        )}
      </div>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit Details'}
      </button>
      {isEditing && (
        <button onClick={handleSave} style={{ marginLeft: '10px' }}>
          Save
        </button>
      )}
    </div>
  );
};

export default UserProfile;
