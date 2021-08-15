import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import  getCenter  from 'geolib/es/getCenter';
import Image from 'next/image';

function Map({searchResults}) {
   
    const [selectedLocation, setSelectedLocation] = useState('');

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }))

    const center = getCenter(coordinates)

    const [viewPort, setViewPort] = useState({
        width: '100%',
        height: '100%',
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 11
    })

    return (
        <ReactMapGL
        mapStyle="mapbox://styles/emalindah/cksd5sr7z0l7917oc1q504cif"
        mapboxApiAccessToken={process.env.mapbox_key}
        {...viewPort}
        onViewportChange={(nextViewport) => setViewPort(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                    >
                        <p 
                        role="img"
                        onClick={() => setSelectedLocation(result)}
                        className="cursor-pointer text-xl animate-bounce"
                        aria-label="rounded push-pin">📍</p>
                    </Marker>
                     {selectedLocation.long === result.long ? (
                       <Popup
                        onClose={() => setSelectedLocation('')}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                        className="mapboxgl-popup-content  text-white"
                       >
                           <div className="flex h-36 w-48 z-50">
                            <Image src={result.img} layout="fill" className="rounded-2xl" objectFit="cover"/>
                            <p className="absolute text-xs z-50 text-white top-32 font-bold">{result.title}</p>

                           </div>
                          
                          
                              
                       </Popup>
                    ):( false)}
                   
                </div>
            ))}
        </ReactMapGL>   
         )
}

export default Map
