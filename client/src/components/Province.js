import ErrorPage from "./ErrorPage";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import styled from "styled-components";
import { FilterContext } from "./FilterContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const { REACT_APP_ARCGIS_API } = process.env;

const Province = () => {
  const { provinces, provincesLoading } = useContext(FilterContext);
  const [validProvince, setValidProvince] = useState({prov: "", valid: false});

  const params = useParams();

  useEffect(() => {
    if (provincesLoading !== "loading") {
      const provinceToDisplay = provinces.data.filter((province) => {
        return province.abbr === params.abbr;
      });
      if (provinceToDisplay.length !== 0) {
        setValidProvince({prov: provinceToDisplay[0], valid: true});
      }

      esriConfig.apiKey = REACT_APP_ARCGIS_API;

      const map = new Map({
        basemap: "arcgis-topographic",
      });

      if(validProvince.valid){
        const view = new MapView({
            container: "viewDiv",
            map: map,
            center: provinceToDisplay[0].coord,
            zoom: provinceToDisplay[0].zoom,
        });          
      }

      const campsites = new FeatureLayer({
        // url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Accommodation_Hebergement_V2_2/FeatureServer/0",
        url: "https://services2.arcgis.com/wCOMu5IS7YdSyPNx/ArcGIS/rest/services/Campsites_Join/FeatureServer/0",
      });

      map.add(campsites);
    }
  }, [provincesLoading, validProvince.valid]);

  return (
    <>
    {provincesLoading !== "loading" && validProvince.valid ? (
    <Wrapper>
      <TextHeader>Browse campsites in <Bold>{validProvince.prov.name}</Bold></TextHeader>
      <MapAndFilter>
        <MapContainer id="viewDiv"></MapContainer>
        <Filter>
          {/* <form onChange={changeHandler}>
            <label>Province: </label>
            <StyledSelect defaultValue={'blank'}>
              <option disabled value="blank"></option>
              {provinces.data.map((province, index) => {
                return (<option key={`${index}${province.name}`}>{province.name}</option>);
              })}
            </StyledSelect>
          </form> */}
        </Filter>
      </MapAndFilter>
    </Wrapper>      
    ) : <ErrorPage />}    
    </>
  );
};

export default Province;


const Bold = styled.span`
  font-weight: bold;
`;

const Filter = styled.div`
  font-family: var(--font-body);
  font-size: 1.5rem;
  margin: 40px;
`;

const MapAndFilter = styled.div`
  display: flex;
  justify-content: center;
`;

const MapContainer = styled.div`
  border: 3px solid var(--color-dark-green);
  border-radius: 4px;
  padding: 0;
  margin-bottom: 50px;
  height: 500px;
  width: 900px;
`;

const StyledSelect = styled.select`
  font-family: var(--font-body);
  font-size: 1.25rem;
`;

const TextHeader = styled.div`
  font-family: var(--font-body);
  font-size: 2rem;
  margin: 40px;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;