import React, { useState, useEffect } from 'react';
import countries from './countries';
import satellites from './satellites';
import { Heading, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
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
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [resized, setResized] = useState<boolean>(false);

  // Get current language
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const parent = document.getElementById('viewer');
    if (!parent) return;
    setTop(parent.offsetTop + 10);
    setLeft(parent.offsetLeft + 10);

    // Add event listener to handle window resize
    window.addEventListener('resize', toggleResized);

    return () => {
      window.removeEventListener('resize', toggleResized);
    };
  }, [resized, currentLanguage]);

  const toggleResized = () => {
    setResized((prev: boolean) => !prev);
  };

  const toggleCountry = (country: string) => {
    setOpenCountries((prev) => ({ ...prev, [country]: !prev[country] }));
  };

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
      style={{
        top: `${top}px`,
        left: `${left}px`,
      }}
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
