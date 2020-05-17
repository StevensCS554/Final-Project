import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';
import { AuthContext } from '../../firebase/Auth';
import { Link } from 'react-router-dom';

export default function Map() {
   const [selectedGroup, setSelectedGroup] = useState(null);
   const [lat, setLat] = useState(null);
   const [lng, setLng] = useState(null);
   const [zipCode, setZipCode] = useState(null);
   const [groupData, setGroupData] = useState(null);
   const { currentUser } = useContext(AuthContext);

   useEffect(() => {
      async function getUserLocation() {
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
               setLat(position.coords.latitude);
               setLng(position.coords.longitude);
            }, error => {
               alert(error);
            })
         }
      };
      getUserLocation();
      getUserZipCode();
      getAllLocalGroups();
   }, [zipCode])


   const getAllLocalGroups = async () => {
      try {
         if (zipCode) {
            const { data } = await axios.get(`http://localhost:4000/groups/local-groups/${zipCode}`);
            const { groups } = data;
            // setAllLocalGroups(groups);
            let res = [];
            for (let i = 0; i < groups.length; i++) {
               let group = {
                  groupId: undefined,
                  groupName: undefined,
                  lat: undefined,
                  lng: undefined
               };
               group.groupId = groups[i]._id;
               group.groupName = groups[i].groupName;
               group.lat = parseFloat(groups[i].lat);
               group.lng = parseFloat(groups[i].lng);
               res.push(group);
            }
            setGroupData(res);
         }
      } catch (e) {
         alert(e);
      }
   }

   async function getUserZipCode() {
      try {
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async position => {
               let username = null;
               if (currentUser) {
                  username = currentUser.displayName;
               }
               const { data } = await axios.get(`http://localhost:4000/zipcodeApi/${position.coords.latitude}/${position.coords.longitude}/${username}`);
               setZipCode(data);
            }, error => {
               throw error;
            })
         }
      } catch (e) {
         alert(e);
      }
   };

   return (
      <div>
         {lat && lng && (
            <GoogleMap
               defaultZoom={12}
               defaultCenter={{ lat: lat, lng: lng }}
            >
               <Marker position={{
                  lat: lat,
                  lng: lng
               }} />
               {groupData && groupData.map((group) => (
                  <Marker
                     key={group._id}
                     position={{
                        lat: group.lat,
                        lng: group.lng
                     }}
                     onClick={() => {
                        setSelectedGroup(group);
                     }}
                  />
               ))}
               {/* Why there are two pup ups ?!!! */}
               {(selectedGroup) && (
                  <InfoWindow
                     position={{
                        lat: selectedGroup.lat,
                        lng: selectedGroup.lng
                     }}
                     onCloseClick={() => {
                        setSelectedGroup(null);
                     }}
                  >
                  {selectedGroup &&(
                     <div>
                        {/* <Link to={`/group-profile/:${selectedGroup._id}`} ></Link> */}
                        <p>{selectedGroup.groupName}</p>
                        {/* <p>{selectedGroup.groupNotice}</p>
                        <img src={selectedGroup.groupProfileUrl} alt='group avatar'/> */}
                     </div>
                  )}

                  </InfoWindow>
               )}

            </GoogleMap>
         )}
      </div>
   )
}
