import React, { useState } from 'react';

const UserProfile = ({ user }) => {
  const [address, setAddress] = useState(user.address || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    // You can perform API calls or state updates to save the changes
    // For simplicity, let's just log the updated values
    console.log('Updated Address:', address);
    console.log('Updated Phone Number:', phoneNumber);

    // If you're making an API call to update user data, you can handle success and error states accordingly

    // Set isEditing to false after saving
    setIsEditing(false);
  };

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
