'use client'

import L from 'leaflet';
import { MapContainer, Marker, TileLayer, Circle } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useMemo, useRef, useState } from 'react';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl; 
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

interface MapProps {
  value?: number[];
  onChange: (value: any) => void;
}

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const Map: React.FC<MapProps> = ({
    value,
    onChange
}) => {

    const markerRef = useRef(null);
    const mapRef = useRef(null);
  
    const [position, setPosition] = useState(value as L.LatLngExpression)

    const circleEventHandler = useMemo(
      () => ({
        click: function () {
          const map = mapRef.current
        }
        
      }),
      [value, onChange],
    )

    const eventHandlers = useMemo(
        () => ({
          dragend() {
            const marker = markerRef.current
            if (marker != null) {
                if (value) {
                    const latLng = marker.getLatLng() || [6.2442034, -75.5812115];
                    value = [latLng.lat, latLng.lng];
                    onChange(value);
                }
            }
          },
        }),
        [value, onChange],
    )

    return (
        <div>
            <MapContainer
                center={position as L.LatLngExpression || [6.2442034, -75.5812115]} 
                zoom={13} 
                scrollWheelZoom={false} 
                className="h-[60vh] rounded-lg"
                ref={mapRef}
                
            >
                <TileLayer
                    url={url}
                    attribution={attribution}
                    />
                    {value && (
                    <Marker 
                        position={position}
                        draggable={true}
                        eventHandlers={eventHandlers}
                        ref={markerRef}
                        
                    />
                    )}
            </MapContainer>
        </div> 
    )
    ;
}
 
export default Map;