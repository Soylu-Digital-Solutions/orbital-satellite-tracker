import React, { useState, useEffect } from 'react';
import { Entity, ModelGraphics } from 'resium';
import { Cartesian3, Color } from 'cesium';
import {
  twoline2satrec,
  propagate,
  gstime,
  eciToGeodetic,
  degreesLong,
  degreesLat,
} from 'satellite.js';
import { getSatelliteInfo } from './utils';
import countries from '../countries';

const Satellite: React.FC<{ satId: number }> = ({ satId }) => {
  const [position, setPosition] = useState<Cartesian3 | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [satelliteData, setSatelliteData] = useState<SatelliteInfo | null>(
    null
  );
  const [country, setCountry] = useState<Country | null>(null);

  // Assuming your .glb file is served from the public folder
  const modelUrl = '/satellite3.glb';

  useEffect(() => {
    setLoading(true);
    // get tle information
    getSatelliteInfo(satId).then((data) => {
      setSatelliteData(data);
      setCountry(countries[data.country]);
      // update satellite position every 1 seconds
      const intervalId = setInterval(() => {
        const newPosition = calculatePosition(data);
        setPosition(newPosition);
      }, 1000);
      setLoading(false);

      return () => clearInterval(intervalId); // Cleanup interval
    });
  }, [satId]);

  const calculatePosition = (satInfo: SatelliteInfo) => {
    const tleLines = satInfo.tle?.split('\r\n');
    if (!tleLines) {
      throw new Error('Invalid TLE');
    } else if (tleLines.length !== 2) {
      throw new Error('Invalid TLE');
    }
    // Parse TLE
    const satrec = twoline2satrec(tleLines[0], tleLines[1]);
    // Get current time
    const now = new Date();

    // Compute position
    const positionAndVelocity = propagate(satrec, now);
    // if positionAndVelocity.position is boolen then it is error
    if (typeof positionAndVelocity.position === 'boolean') {
      throw new Error('Error calculating position');
    }

    // Convert the position to geographic coordinates (latitude, longitude)
    const gmst = gstime(now);
    const positionGd = eciToGeodetic(positionAndVelocity.position, gmst);

    // Convert radians to degrees for Cesium
    const longitude = degreesLong(positionGd.longitude);
    const latitude = degreesLat(positionGd.latitude);
    const altitude = positionGd.height * 1000;
    return Cartesian3.fromDegrees(longitude, latitude, altitude);
  };

  // Generate description content for the InfoBox
  const generateDescription = () => {
    if (!satelliteData || !satelliteData.tleRecordTime) return '';
    const date = new Date(satelliteData.tleRecordTime);
    return `
      <h1>${satelliteData?.name}</h1>
      <p><strong>Country:</strong> <img src="${country?.flagIcon}" alt="${
      country?.name
    }" style="width: 20px; height: 13px;"> ${country?.name}</p>
      <p><strong>Last TLE Data retrieval:</strong> ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</p>
    `;
  };

  return (
    <div>
      {!loading && position && (
        <Entity
          position={position}
          name={satelliteData?.name}
          description={generateDescription()}
        >
          <ModelGraphics
            uri={modelUrl}
            minimumPixelSize={100}
            maximumScale={20000}
            color={Color.fromCssColorString(country?.color || '#ffffff')}
          />
        </Entity>
      )}
    </div>
  );
};

export default Satellite;
