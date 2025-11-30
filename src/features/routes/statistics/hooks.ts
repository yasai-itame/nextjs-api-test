export const InboundFetchData = async (year: string, country: string[]) => {
  
  const inboundResponse = await fetch(`/api/inbound?year=${year}&country=${country}`);
  if (!inboundResponse.ok) {
    throw new Error(`Error: ${inboundResponse.status}`);
  }
  return await inboundResponse.json();
};