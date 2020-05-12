import axios from 'axios';

const getProfile = async (username) => {
   const { data } = await axios.get(`http://localhost:4000/users/profile/${username}`)
   const { url } = data;
   return url;
}

export default getProfile;