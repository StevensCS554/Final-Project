import React, { useContext } from 'react';
import Navigation from './utilities/Navigation';
import Map from './utilities/Map';
import Gallery from './utilities/Gallery';
import Footer from './utilities/Footer';
import { AuthContext } from '../firebase/Auth';
import { withGoogleMap, withScriptjs } from 'react-google-maps';

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function Explore() {

   const { currentUser } = useContext(AuthContext);
   // const [lat, setLat] = useState(null);
   // const [lng, setLng] = useState(null);

   return (
      <div>
         <Navigation />
         <div id='explore-heading'>
            <p>Check what your neighbors are up to</p>
         </div>
         <div className='energy-bar'></div>
         <div id='google-map' style={{ height: '70vh', width: '95%', margin: '1rem auto' }}>
            <WrappedMap
               googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCTJckDGDyHM8cZ9R-PKUIQGHgfhoXzzFA`}
               loadingElement={<div style={{ height: '100%' }} />}
               containerElement={<div style={{ height: '100%' }} />}
               mapElement={<div style={{ height: '100%' }} />}
            />
         </div>
         <div id='google-map-switches'>
            <div id='map-on'>
               <button onClick={() => {
                  const map = document.querySelector('#google-map');
                  const mapOn = document.querySelector('#map-on');
                  const mapOff = document.querySelector('#map-off');
                  map.style.height = '70vh';
                  mapOn.style.display = 'none';
                  mapOff.style.display = 'block';
               }}>OPEN GOOGLE MAP</button>
            </div>
            <div id='map-off'>
               <button onClick={() => {
                  const map = document.querySelector('#google-map');
                  const mapOn = document.querySelector('#map-on');
                  const mapOff = document.querySelector('#map-off');
                  map.style.height = '0.3vh';
                  mapOn.style.display = 'block';
                  mapOff.style.display = 'none';
               }}>CLOSE GOOGLE MAP</button>
            </div>
         </div>
         <Gallery user={currentUser} />
         <Footer />
      </div>
   )
}
