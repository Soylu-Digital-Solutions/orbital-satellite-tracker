import React, { useState, useEffect } from 'react';
import countries from './countries';
import satellites from './satellites';
import { Heading, Text } from '@chakra-ui/react';
import './popup.css';

interface SatelliteGroup {
  [key: string]: SatelliteInfo[];
}

interface OpenCountries {
  [key: string]: boolean;
}

const groupedSatellites = Object.values(satellites).reduce<SatelliteGroup>(
  (acc, satellite) => {
    const { country } = satellite;
    acc[country] = acc[country] || [];
    acc[country].push(satellite);
    return acc;
  },
  {}
);

interface SatellitePopupProps {
  setSelectedSatellites: (satellites: number[]) => void;
  selectedSatellites: number[];
}

const SatellitePopup = ({
  setSelectedSatellites,
  selectedSatellites,
}: SatellitePopupProps) => {
  const [openCountries, setOpenCountries] = useState<OpenCountries>({});
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const parent = document.getElementById('viewer');
    setParentElement(parent);
  }, []);

  const toggleCountry = (country: string) => {
    setOpenCountries((prev) => ({ ...prev, [country]: !prev[country] }));
  };

  // Add some basic styles to ensure the popup is visible and positioned correctly
  const parentTop = parentElement?.offsetTop || 0;
  const parentLeft = parentElement?.offsetLeft || 0;

  const handleSatelliteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    // name is string so convert it to number
    const satelliteId = parseInt(name, 10);
    if (checked) {
      setSelectedSatellites([...selectedSatellites, satelliteId]);
    } else {
      setSelectedSatellites(
        selectedSatellites.filter((id: number) => id !== satelliteId)
      );
    }
  };

  return (
    <div
      id="toolbar"
      style={{ top: `${parentTop + 10}px`, left: `${parentLeft + 10}px` }}
    >
      <Heading as="h3" size="md" p={1}>
        Toggle Satellites
      </Heading>
      {Object.keys(groupedSatellites).map((country) => (
        <div key={country}>
          <button onClick={() => toggleCountry(country)}>
            <Text
              style={{ fontWeight: openCountries[country] ? 'bold' : 'normal' }}
            >
              {countries[country].name}
            </Text>
          </button>
          {openCountries[country] && (
            <ul>
              {groupedSatellites[country].map((satellite) => (
                <li
                  key={satellite.satelliteId}
                  style={{ marginLeft: '20px', listStyleType: 'none' }}
                >
                  <label>
                    <input
                      type="checkbox"
                      id={satellite.satelliteId.toString()}
                      name={satellite.satelliteId.toString()}
                      onChange={handleSatelliteChange}
                      defaultChecked={selectedSatellites.includes(
                        satellite.satelliteId
                      )}
                    />
                    {`\t${satellite.name}`}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SatellitePopup;
