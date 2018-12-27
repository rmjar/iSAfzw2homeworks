import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `50vh`, width: `50%` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }), withScriptjs, withGoogleMap)((props) =>
        <GoogleMap
            bootstrapURLKeys={{ key: 'AIzaSyAJYnHf9Pu44-hMsCyHAjedJGRPg1xDdeo' }}
            defaultCenter={props.center}
            defaultZoom={props.zoom}>
            <Marker position={props.center} />
        </GoogleMap>
    );

export default Map;