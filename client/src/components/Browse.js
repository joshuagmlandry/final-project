import { useEffect } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from "@arcgis/core/config";
import styled from "styled-components";
const { REACT_APP_ARCGIS_API } = process.env;

const Browse = () => {

  useEffect(() => {

    esriConfig.apiKey = REACT_APP_ARCGIS_API;

    const map = new Map({
      basemap: "arcgis-topographic",
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-73.561668, 45.508888],
      zoom: 5,
    });

    const campsites = new FeatureLayer({
        url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Accommodation_Hebergement_V2_2/FeatureServer/0"
      });
    
      map.add(campsites);
  }, []);

  return <MapContainer id="viewDiv">map div</MapContainer>;
};

export default Browse;

const MapContainer = styled.div`
  padding: 0;
  margin: 0;
  height: 100vh;
  width: 100vw;
`;
