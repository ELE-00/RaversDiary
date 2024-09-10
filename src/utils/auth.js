export const loginUser = async (username, password) => {
    // Replace this with your actual database query
    // For example, using Firebase Auth or your SQL database
    if (username === 'testuser' && password === 'testpass') {
      return true; // Simulate a successful login
    } else {
      return false; // Simulate a failed login
    }
  };
  