import maleDefaut from '../../images/male-default.jpg';
import femaleDefaut from '../../images/female-default.jpeg';
import axios from 'axios';

const getProfile = async (username) => {
   const { data } = await axios.get(`http://localhost:4000/users/profile/${username}`)
   const { result } = data;
   if (result === 'male')
      return maleDefaut;
   if (result === 'female')
      return femaleDefaut;
   return result;
}

export default getProfile;