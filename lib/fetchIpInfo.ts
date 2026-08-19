import { IPInfo } from "./types";

function countryCodeToFlag(code: string): string {
  if (!code || code.length !== 2) return "🏳️";
  const codePoints = [...code.toUpperCase()].map(
    (c) => 127397 + c.charCodeAt(0)
  );
  return String.fromCodePoint(...codePoints);
}

async function fromIpwhois(): Promise<IPInfo> {
  const res = await fetch("https://ipwho.is/");
  const data = await res.json();
  if (!data || data.success === false) throw new Error("ipwho.is failed");

  return {
    ip: data.ip,
    city: data.city,
    region: data.region,
    country: data.country,
    countryCode: data.country_code,
    continent: data.continent,
    postal: data.postal ?? "—",
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone?.id ?? "—",
    isp: data.connection?.isp ?? data.connection?.org ?? "Unknown",
    asn: data.connection?.asn ? `AS${data.connection.asn}` : "—",
    flagEmoji: countryCodeToFlag(data.country_code),
  };
}

async function fromIpapiCo(): Promise<IPInfo> {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  if (!data || data.error) throw new Error("ipapi.co failed");

  return {
    ip: data.ip,
    city: data.city,
    region: data.region,
    country: data.country_name,
    countryCode: data.country_code,
    continent: data.continent_code ?? "—",
    postal: data.postal ?? "—",
    latitude: data.latitude,
    longitude: data.longitude,
    timezone: data.timezone ?? "—",
    isp: data.org ?? "Unknown",
    asn: data.asn ?? "—",
    flagEmoji: countryCodeToFlag(data.country_code),
  };
}

export async function fetchIpInfo(): Promise<IPInfo> {
  try {
    return await fromIpwhois();
  } catch {
    return await fromIpapiCo();
  }
}
