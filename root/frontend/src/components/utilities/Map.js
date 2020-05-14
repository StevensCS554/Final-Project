import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import data from './test.json';

export default function Map() {
   const [selectedGroup, setSelectedGroup] = useState(null);
   const [lat, setLat] = useState(null);
   const [lng, setLng] = useState(null);

   useEffect(() => {
      async function getUserLocation() {
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
               setLat(position.coords.latitude);
               setLng(position.coords.longitude);
            }, error => {
               alert(error);
            })
         }
      };
      getUserLocation();
   }, [])


   return (
      <GoogleMap
         defaultZoom={10}
         defaultCenter={{ lat: 40, lng: -75 }}
      >
         <Marker position={{
            lat: lat,
            lng: lng
         }} />
         {data.map((d) => (
            <Marker
               key={d.id}
               position={{
                  lat: d.lat,
                  lng: d.lng
               }}
               onClick={() => {
                  setSelectedGroup(d);
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
   )
}
