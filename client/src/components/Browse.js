import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Locate from "@arcgis/core/widgets/Locate";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import styled from "styled-components";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FilterContext } from "./FilterContext";
import { useContext, useEffect, useState } from "react";
const { REACT_APP_ARCGIS_API } = process.env;

// Browse page which features a map with all campsites plotted.  Additionally, there is a filter where users can specify which province, park/place, and type of campsite that they are looking for.  There is a reset button to start the query over again.

const Browse = () => {
  const [coord, setCoord] = useState([-101.674656, 57.951146]);
  const [zoom, setZoom] = useState(3);
  const [provinceSelected, setProvinceSelected] = useState({
    prov: "",
    flag: false,
  });
  const [parkSelected, setParkSelected] = useState(null);
  const [allCampsiteTypes, setAllCampsiteTypes] = useState(null);
  const [allCampsiteTypesLoading, setAllCampsiteTypesLoading] =
    useState("loading");
  const [campsiteSelected, setCampsiteSelected] = useState(null);
  const [provinceSelectedLoading, setProvinceSelectedLoading] =
    useState("loading");
  let defEx =
    parkSelected !== null
      ? campsiteSelected !== null
        ? `Park_Name = '${parkSelected}' AND Accommodation_Type = '${campsiteSelected}'`
        : `Park_Name = '${parkSelected}'`
      : "1=1";

  const { provinces, provincesLoading } = useContext(FilterContext);

  const changeHandler = (e) => {
    setParkSelected(null);
    if (provincesLoading !== "loading") {
      const selectedProvince = provinces.filter((province) => {
        return province.name === e.target.value;
      });
      if (selectedProvince.length !== 0) {
        setProvinceSelected({ prov: selectedProvince[0], flag: true });
        setProvinceSelectedLoading("idle");
      }
      setCoord(selectedProvince[0].coord);
      setZoom(selectedProvince[0].zoom);
    }
  };

  const parkHandler = (e) => {
    e.stopPropagation();
    setParkSelected(e.target.value);
  };

  const campsiteHandler = (e) => {
    e.stopPropagation();
    setCampsiteSelected(e.target.value);
  };

  useEffect(() => {
    esriConfig.apiKey = REACT_APP_ARCGIS_API;

    const map = new Map({
      basemap: "arcgis-topographic",
    });

    const view = new MapView({
      container: "viewDiv",
      map: map,
      center: coord,
      zoom: zoom,
    });

    const locate = new Locate({
      view: view,
      useHeadingEnabled: false,
      goToOverride: (view, options) => {
        options.target.scale = 5000000;
        return view.goTo(options.target);
      },
    });
    view.ui.add(locate, "top-left");

    const popupCampsites = {
      title: "Campsites",
      content: `<h4>Province/Territory:</h4> {Province}<br>
                <h4>Park/Location:</h4> {Park_Name}<br>
                <h4>Campground/Site:</h4> {Name_e}<br>
                <h4>Accommodation Type:</h4> {Accommodation_Type}<br>
                <h4>Site Number:</h4> {Site_Num_Site}<br>
                <h4>Reviews:</h4> Highly rated (10 reviews) <br>
                <h4>Campsite Page:</h4><a href='https://looncamping.com/campsite/{URL_f}'> {URL_f}</a>`,
    };

    const campsites = new FeatureLayer({
      url: "https://services5.arcgis.com/07vUVKCTnBBHddyU/arcgis/rest/services/accommodation_hebergementgdb/FeatureServer/0",
      outFields: [
        // "Accommodation_Type",
        // "region_name",
        // "place_name",
        // "area_name",
        // "facility_name",
        // "unit_type_name",
        // "Unique_Site_ID",
        // "Site_Num_Site",
        "Name_e",
        "URL_f",
        "Site_Num_Site",
        "Accommodation_Type",
        "Park_Name",
        "Province",
      ],
      popupTemplate: popupCampsites,
      definitionExpression: defEx,
    });

    if (parkSelected !== null) {
      const query = campsites.createQuery();
      query.where = `Park_Name = '${parkSelected}'`;
      query.outFields = ["Accommodation_Type"];
      query.returnDistinctValues = true;
      campsites.queryFeatures(query).then((data) => {
        const allAttributes = data.features.map((entry) => {
          return entry.attributes.Accommodation_Type;
        });
        setAllCampsiteTypes([...new Set(allAttributes)]);
        setAllCampsiteTypesLoading("idle");
      });
    }

    map.add(campsites);
    console.log(provinceSelected.prov);
  }, [coord, zoom, provincesLoading, parkSelected, campsiteSelected]);

  return (
    <>
      {provincesLoading !== "loading" ? (
        <Wrapper>
          <TextHeader>
            Browse <Bold>all campsites</Bold> or filter by{" "}
            <Bold>place and province or territory</Bold>
          </TextHeader>
          <MapAndFilter>
            <MapContainer id="viewDiv"></MapContainer>
            <Filter>
              <StyledForm onChange={changeHandler}>
                <BothFilters>
                  {/* <FilterOptions>
                    <label>Province/Territory: </label>
                    <StyledSelect defaultValue={"blank"}>
                      <option disabled value="blank"></option>
                      {provinces.map((province, index) => {
                        return (
                          <option key={`${index}${province.name}`}>
                            {province.name}
                          </option>
                        );
                      })}
                    </StyledSelect>
                  </FilterOptions> */}
                  <FilterOptions>
                    <FormControl sx={{ minWidth: 260 }}>
                      <InputLabel id="demo-simple-select-label">
                        Province/Territory
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={provinceSelected.prov.name}
                        label="Province/Territory"
                        onChange={changeHandler}
                      >
                        {provinces.map((province, index) => {
                          return (
                            <MenuItem
                              value={province.name}
                              key={`${province.name}-${index}`}
                            >
                              {province.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </FilterOptions>
                  <FilterOptions>
                    <ParkSelector>
                      {provinceSelectedLoading !== "loading" ? (
                        <FormControl sx={{ minWidth: 260 }}>
                          <InputLabel id="demo-simple-select-label">
                            Place/Park
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={parkSelected}
                            label="Place/Park"
                            onChange={parkHandler}
                            disabled={!provinceSelected.flag}
                          >
                            {provinceSelected.prov.place.map((park, index) => {
                              return (
                                <MenuItem value={park} key={`${index}${park}`}>
                                  {park}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      ) : (
                        // <ParkSelector>
                        //   <label>Place/Park: </label>
                        //   <StyledSelect
                        //     defaultValue={"blank2"}
                        //     disabled={!provinceSelected.flag}
                        //     onChange={parkHandler}
                        //   >
                        //     <option disabled value="blank2"></option>
                        // {provinceSelected.prov.place.map((park, index) => {
                        //   return (
                        //     <option key={`${index}${park}`}>{park}</option>
                        //   );
                        // })}
                        //   </StyledSelect>
                        // </ParkSelector>
                        ""
                      )}
                    </ParkSelector>
                    <ParkSelector>
                      {allCampsiteTypesLoading !== "loading" ? (
                        <FormControl sx={{ minWidth: 260 }}>
                          <InputLabel id="demo-simple-select-label">
                            Campsite Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={parkSelected != null ? campsiteSelected : ""}
                            defaultValue=""
                            label="Campsite Type"
                            onChange={campsiteHandler}
                            disabled={!provinceSelected.flag}
                          >
                            {allCampsiteTypes.map((type, index) => {
                              return (
                                <MenuItem value={type} key={`${index}${type}`}>
                                  {type}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      ) : (
                        // <ParkSelector>
                        //   <label>Campsite Type: </label>
                        //   <StyledSelect
                        //     defaultValue={"blank2"}
                        //     disabled={!provinceSelected.flag}
                        //     onChange={campsiteHandler}
                        //   >
                        //     <option disabled value="blank2"></option>
                        // {allCampsiteTypes.map((type, index) => {
                        //   return (
                        //     <option key={`${index}${type}`}>{type}</option>
                        //   );
                        // })}
                        //   </StyledSelect>
                        // </ParkSelector>
                        " "
                      )}
                    </ParkSelector>
                  </FilterOptions>
                </BothFilters>

                <div>
                  <ResetButton type="submit">Reset</ResetButton>
                </div>
              </StyledForm>
            </Filter>
          </MapAndFilter>
        </Wrapper>
      ) : (
        " "
      )}
    </>
  );
};

export default Browse;

const Bold = styled.span`
  font-weight: bold;
`;

const BothFilters = styled.div`
  height: 250px;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  font-size: 1.5rem;
  margin: 0 40px;
  width: 300px;
`;

const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

const MapAndFilter = styled.div`
  align-items: flex-start;
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

const ParkSelector = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ResetButton = styled.button`
  background-color: var(--color-dark-green);
  border: none;
  border-radius: 5px;
  color: var(--color-light-beige);
  font-family: var(--font-body);
  font-size: 1rem;
  margin-top: 10px;
  padding: 10px;
  transition: 200ms;
  width: 100px;
  &:hover {
    background-color: var(--color-green);
    cursor: pointer;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledSelect = styled.select`
  font-family: var(--font-body);
  font-size: 1.25rem;
  margin-top: 5px;
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
  height: 100vh;
  justify-content: center;
`;
