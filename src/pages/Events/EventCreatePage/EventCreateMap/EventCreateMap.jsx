import React, { useCallback, useMemo, useRef, useState } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import classes from "./EventCreateMap.module.scss";

const center = {
	lat: 45.815399,
	lng: 15.966568,
};

function EventCreateMap(props) {
	const draggable = true;
	const [position, setPosition] = useState(center);
	const { setEventLocation } = props;
	const markerRef = useRef(null);
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current;
				if (marker != null) {
					setPosition(marker.getLatLng());
					setEventLocation(marker.getLatLng());
				}
			},
		}),
		[]
	);

	return (
		<MapContainer
			center={center}
			zoom={13}
			scrollWheelZoom={false}
			style={{ height: 300, width: "100%", "z-index": 0 }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker
				draggable={draggable}
				eventHandlers={eventHandlers}
				position={position}
				ref={markerRef}
			>
				<Popup minWidth={90}>
					<span>This is the tooltip</span>
				</Popup>
			</Marker>
		</MapContainer>
	);
}

export default EventCreateMap;
