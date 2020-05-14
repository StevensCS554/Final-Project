import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';

export default function Map() {
   const [selectedGroup, setSelectedGroup] = useState(null);
   const [lat, setLat] = useState(null);
   const [lng, setLng] = useState(null);
   const [zipCode, setZipCode] = useState(null);
   const [groupData, setGroupData] = useState(null);

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
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(async position => {
            const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyCTJckDGDyHM8cZ9R-PKUIQGHgfhoXzzFA`);
            const { results } = data;
            const z = results[0].address_components[6].short_name;
            setZipCode(z);
         }, error => {
            alert(error);
         })
      }
   };

   return (
      <div>
         {lat && lng && (
            <GoogleMap
               defaultZoom={10}
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
               {selectedGroup && (
                  <InfoWindow
                     position={{
                        lat: selectedGroup.lat,
                        lng: selectedGroup.lng
                     }}
                     onCloseClick={() => {
                        setSelectedGroup(null);
                     }}
                  >
                     <div>Some Details</div>
                  </InfoWindow>
               )}

            </GoogleMap>
         )}
      </div>
   )
}
