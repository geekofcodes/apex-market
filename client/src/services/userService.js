// authService.js
const API_URL = '/api/users';

const userService = {

  updateUserDetails: async (userId, userDetails) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      if (!response.ok) {
        throw new Error(`Error updating user details: ${response.status} - ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating user details:', error);
      throw error;
    }
  },
};

export default userService;
