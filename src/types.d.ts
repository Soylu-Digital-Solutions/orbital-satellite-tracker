// Define the Country interface
interface Country {
  name: string;
  flagIcon: string;
  color: string;
}

// Define the Countries type as a record where the key is a string (abbreviation) and the value is a Country
type Countries = Record<string, Country>;

interface SatelliteInfo {
  satelliteId: number; // satellite's NORAD ID
  name: string; // satellite's name
  country: string; // which country it belongs to, use abbreviation
  tleRecordTime?: number; // when TLE info is recorded to local storage
  tle?: string; // two line tle information with new line /r/n
}

// Define the Satellites type as a record where the key is a number (satelliteId) and the value is a SatelliteInfo
type Satellites = Record<number, SatelliteInfo>;
