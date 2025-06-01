// test-api.js
const axios = require('axios');
const emailValidation = require('./emailValidation');
const BASE_URL = 'http://localhost:3000/api/feedback';

(async () => {
  try {
    // === 1. POST: Create new feedback ===
    const postResponse = await axios.post(BASE_URL, {
      name: 'John Doe',
      email: 'june@example.com',
      age: 28,
      feedback: 'Great service!',
      rating: 5
    });

    console.log('✅ POST Success:', postResponse.data);
    console.log("VALID?", emailValidation(postResponse.data.email));

    const createdId = postResponse.data._id;

    // === 2. PUT: Update the feedback ===
    const putResponse = await axios.put(`${BASE_URL}/${createdId}`, {
      name: 'John Doe',
      email: 'juhnny@example.com', // changed email
      age: 29,
      feedback: 'Even better than before!',
      rating: 4
    });

    console.log('✅ PUT Success:', putResponse.data);

    // === 3. DELETE: Remove the feedback ===
    // const deleteResponse = await axios.delete(`${BASE_URL}/${createdId}`);

    // console.log('✅ DELETE Success:', deleteResponse.data);

  } catch (err) {
    console.error('❌ API Test Error:', err.response?.data || err.message);
  }
})();
