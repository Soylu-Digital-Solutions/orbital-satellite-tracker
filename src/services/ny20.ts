const getTLE = async (satId: number) => {
  const response = await fetch(
    `/api/rest/v1/satellite/tle/${satId}&apiKey=${
      import.meta.env.VITE_N2YO_API_KEY
    }`
  );
  const data = await response.json();
  return data;
};

export default getTLE;
