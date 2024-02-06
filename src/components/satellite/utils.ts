import getTLE from '../../services/ny20';
import satellites from '../satellites';

const STORAGE_KEY = 'satellite_info';
const MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// get all satellite data from local storage
const fromLocalStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    // parse data to Satellites type
    const satellites: Satellites = JSON.parse(data);
    return satellites;
  }
  return null;
};

// get only one satellite info from local storage by id
const getSatelliteInfoFromLocalStorage = (satelliteId: number) => {
  const data = fromLocalStorage();
  if (data) {
    // check if satelliteId exists in data
    if (!data[satelliteId]) {
      return null;
    }
    // convert data to SatelliteInfo type
    const satelliteInfo: SatelliteInfo = data[satelliteId];
    // check if data is expired
    if (
      !satelliteInfo.tleRecordTime ||
      Date.now() - satelliteInfo.tleRecordTime > MAX_AGE
    ) {
      // if expired, return null
      return null;
    } else {
      // if not expired, return data
      return satelliteInfo;
    }
  } else {
    return null;
  }
};

// get only one satellite info from n2yo API
const getSatelliteInfoFromAPI = async (satelliteId: number) => {
  // get from api
  const data = await getTLE(satelliteId);
  const satelliteInfo: SatelliteInfo = {
    satelliteId: satelliteId,
    name: data.info.satname ?? satellites[satelliteId].name,
    country: satellites[satelliteId].country,
    tleRecordTime: Date.now(),
    tle: data.tle,
  };
  // get data from local storage with either Satellies type or null
  const localData = fromLocalStorage();

  // if local data exists, merge with new data
  if (localData) {
    //update local data
    localData[satelliteId] = satelliteInfo;
    // set to local storage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(localData));
  } else {
    // set to local storage
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ [satelliteId]: satelliteInfo })
    );
  }
  // return data
  return satelliteInfo;
};

// get only one satellite
const getSatelliteInfo = async (satId: number) => {
  // check if local storage has info
  const data = getSatelliteInfoFromLocalStorage(satId);
  if (data) {
    return data;
  } else {
    // else, get data from API
    return getSatelliteInfoFromAPI(satId);
  }
};

// export all functions
export { getSatelliteInfo };
