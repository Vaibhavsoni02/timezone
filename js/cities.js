// Places database — matches FIO's own API response shape ({ cities: [...] })
// so the rest of the app can work with the same fields FIO itself uses:
// _id, name, timezone, district, districtCode, _country { _id, name, iso3 }.
const FIO_CITIES_RESPONSE = {
  "cities": [
    {
      "_id": "64a000000000000000000001",
      "name": "London",
      "timezone": "Europe/London",
      "district": "England",
      "districtCode": "ENG",
      "_country": { "_id": "gbr000000000000000000000", "name": "United Kingdom", "iso3": "GBR" }
    },
    {
      "_id": "64a000000000000000000002",
      "name": "New York",
      "timezone": "America/New_York",
      "district": "New York",
      "districtCode": "NY",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a000000000000000000003",
      "name": "Los Angeles",
      "timezone": "America/Los_Angeles",
      "district": "California",
      "districtCode": "CA",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a000000000000000000004",
      "name": "Chicago",
      "timezone": "America/Chicago",
      "district": "Illinois",
      "districtCode": "IL",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a000000000000000000005",
      "name": "Denver",
      "timezone": "America/Denver",
      "district": "Colorado",
      "districtCode": "CO",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a000000000000000000006",
      "name": "Toronto",
      "timezone": "America/Toronto",
      "district": "Ontario",
      "districtCode": "ON",
      "_country": { "_id": "can000000000000000000000", "name": "Canada", "iso3": "CAN" }
    },
    {
      "_id": "64a000000000000000000007",
      "name": "Vancouver",
      "timezone": "America/Vancouver",
      "district": "British Columbia",
      "districtCode": "BC",
      "_country": { "_id": "can000000000000000000000", "name": "Canada", "iso3": "CAN" }
    },
    {
      "_id": "64a000000000000000000008",
      "name": "Mexico City",
      "timezone": "America/Mexico_City",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "mex000000000000000000000", "name": "Mexico", "iso3": "MEX" }
    },
    {
      "_id": "64a000000000000000000009",
      "name": "São Paulo",
      "timezone": "America/Sao_Paulo",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "bra000000000000000000000", "name": "Brazil", "iso3": "BRA" }
    },
    {
      "_id": "64a00000000000000000000a",
      "name": "Buenos Aires",
      "timezone": "America/Argentina/Buenos_Aires",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "arg000000000000000000000", "name": "Argentina", "iso3": "ARG" }
    },
    {
      "_id": "64a00000000000000000000b",
      "name": "Paris",
      "timezone": "Europe/Paris",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "fra000000000000000000000", "name": "France", "iso3": "FRA" }
    },
    {
      "_id": "64a00000000000000000000c",
      "name": "Berlin",
      "timezone": "Europe/Berlin",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "deu000000000000000000000", "name": "Germany", "iso3": "DEU" }
    },
    {
      "_id": "64a00000000000000000000d",
      "name": "Madrid",
      "timezone": "Europe/Madrid",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "esp000000000000000000000", "name": "Spain", "iso3": "ESP" }
    },
    {
      "_id": "64a00000000000000000000e",
      "name": "Rome",
      "timezone": "Europe/Rome",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "ita000000000000000000000", "name": "Italy", "iso3": "ITA" }
    },
    {
      "_id": "64a00000000000000000000f",
      "name": "Amsterdam",
      "timezone": "Europe/Amsterdam",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "nld000000000000000000000", "name": "Netherlands", "iso3": "NLD" }
    },
    {
      "_id": "64a000000000000000000010",
      "name": "Stockholm",
      "timezone": "Europe/Stockholm",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "swe000000000000000000000", "name": "Sweden", "iso3": "SWE" }
    },
    {
      "_id": "64a000000000000000000011",
      "name": "Zurich",
      "timezone": "Europe/Zurich",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "che000000000000000000000", "name": "Switzerland", "iso3": "CHE" }
    },
    {
      "_id": "64a000000000000000000012",
      "name": "Vienna",
      "timezone": "Europe/Vienna",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "aut000000000000000000000", "name": "Austria", "iso3": "AUT" }
    },
    {
      "_id": "64a000000000000000000013",
      "name": "Warsaw",
      "timezone": "Europe/Warsaw",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "pol000000000000000000000", "name": "Poland", "iso3": "POL" }
    },
    {
      "_id": "64a000000000000000000014",
      "name": "Moscow",
      "timezone": "Europe/Moscow",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "rus000000000000000000000", "name": "Russia", "iso3": "RUS" }
    },
    {
      "_id": "64a000000000000000000015",
      "name": "Istanbul",
      "timezone": "Europe/Istanbul",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "tur000000000000000000000", "name": "Turkey", "iso3": "TUR" }
    },
    {
      "_id": "64a000000000000000000016",
      "name": "Cairo",
      "timezone": "Africa/Cairo",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "egy000000000000000000000", "name": "Egypt", "iso3": "EGY" }
    },
    {
      "_id": "64a000000000000000000017",
      "name": "Lagos",
      "timezone": "Africa/Lagos",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "nga000000000000000000000", "name": "Nigeria", "iso3": "NGA" }
    },
    {
      "_id": "64a000000000000000000018",
      "name": "Johannesburg",
      "timezone": "Africa/Johannesburg",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "zaf000000000000000000000", "name": "South Africa", "iso3": "ZAF" }
    },
    {
      "_id": "64a000000000000000000019",
      "name": "Dubai",
      "timezone": "Asia/Dubai",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "are000000000000000000000", "name": "United Arab Emirates", "iso3": "ARE" }
    },
    {
      "_id": "64a00000000000000000001a",
      "name": "Tel Aviv",
      "timezone": "Asia/Jerusalem",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "isr000000000000000000000", "name": "Israel", "iso3": "ISR" }
    },
    {
      "_id": "64a00000000000000000001b",
      "name": "Mumbai",
      "timezone": "Asia/Kolkata",
      "district": "Maharashtra",
      "districtCode": "MH",
      "_country": { "_id": "ind000000000000000000000", "name": "India", "iso3": "IND" }
    },
    {
      "_id": "64a00000000000000000001c",
      "name": "Bengaluru",
      "timezone": "Asia/Kolkata",
      "district": "Karnataka",
      "districtCode": "KA",
      "_country": { "_id": "ind000000000000000000000", "name": "India", "iso3": "IND" }
    },
    {
      "_id": "64a00000000000000000001d",
      "name": "New Delhi",
      "timezone": "Asia/Kolkata",
      "district": "Delhi",
      "districtCode": "DL",
      "_country": { "_id": "ind000000000000000000000", "name": "India", "iso3": "IND" }
    },
    {
      "_id": "64a00000000000000000001e",
      "name": "Singapore",
      "timezone": "Asia/Singapore",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "sgp000000000000000000000", "name": "Singapore", "iso3": "SGP" }
    },
    {
      "_id": "64a00000000000000000001f",
      "name": "Hong Kong",
      "timezone": "Asia/Hong_Kong",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "hkg000000000000000000000", "name": "Hong Kong", "iso3": "HKG" }
    },
    {
      "_id": "64a000000000000000000020",
      "name": "Shanghai",
      "timezone": "Asia/Shanghai",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "chn000000000000000000000", "name": "China", "iso3": "CHN" }
    },
    {
      "_id": "64a000000000000000000021",
      "name": "Beijing",
      "timezone": "Asia/Shanghai",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "chn000000000000000000000", "name": "China", "iso3": "CHN" }
    },
    {
      "_id": "64a000000000000000000022",
      "name": "Tokyo",
      "timezone": "Asia/Tokyo",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "jpn000000000000000000000", "name": "Japan", "iso3": "JPN" }
    },
    {
      "_id": "64a000000000000000000023",
      "name": "Seoul",
      "timezone": "Asia/Seoul",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "kor000000000000000000000", "name": "South Korea", "iso3": "KOR" }
    },
    {
      "_id": "64a000000000000000000024",
      "name": "Sydney",
      "timezone": "Australia/Sydney",
      "district": "New South Wales",
      "districtCode": "NSW",
      "_country": { "_id": "aus000000000000000000000", "name": "Australia", "iso3": "AUS" }
    },
    {
      "_id": "64a000000000000000000025",
      "name": "Melbourne",
      "timezone": "Australia/Melbourne",
      "district": "Victoria",
      "districtCode": "VIC",
      "_country": { "_id": "aus000000000000000000000", "name": "Australia", "iso3": "AUS" }
    },
    {
      "_id": "64a000000000000000000026",
      "name": "Auckland",
      "timezone": "Pacific/Auckland",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "nzl000000000000000000000", "name": "New Zealand", "iso3": "NZL" }
    },
    {
      "_id": "64a000000000000000000027",
      "name": "Honolulu",
      "timezone": "Pacific/Honolulu",
      "district": "Hawaii",
      "districtCode": "HI",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a000000000000000000028",
      "name": "Anchorage",
      "timezone": "America/Anchorage",
      "district": "Alaska",
      "districtCode": "AK",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a000000000000000000029",
      "name": "San Francisco",
      "timezone": "America/Los_Angeles",
      "district": "California",
      "districtCode": "CA",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a00000000000000000002a",
      "name": "Seattle",
      "timezone": "America/Los_Angeles",
      "district": "Washington",
      "districtCode": "WA",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a00000000000000000002b",
      "name": "Boston",
      "timezone": "America/New_York",
      "district": "Massachusetts",
      "districtCode": "MA",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a00000000000000000002c",
      "name": "Miami",
      "timezone": "America/New_York",
      "district": "Florida",
      "districtCode": "FL",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a00000000000000000002d",
      "name": "Austin",
      "timezone": "America/Chicago",
      "district": "Texas",
      "districtCode": "TX",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a00000000000000000002e",
      "name": "Dublin",
      "timezone": "Europe/Dublin",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "irl000000000000000000000", "name": "Ireland", "iso3": "IRL" }
    },
    {
      "_id": "64a00000000000000000002f",
      "name": "Lisbon",
      "timezone": "Europe/Lisbon",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "prt000000000000000000000", "name": "Portugal", "iso3": "PRT" }
    },
    {
      "_id": "64a000000000000000000030",
      "name": "Athens",
      "timezone": "Europe/Athens",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "grc000000000000000000000", "name": "Greece", "iso3": "GRC" }
    },
    {
      "_id": "64a000000000000000000031",
      "name": "Helsinki",
      "timezone": "Europe/Helsinki",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "fin000000000000000000000", "name": "Finland", "iso3": "FIN" }
    },
    {
      "_id": "64a000000000000000000032",
      "name": "Oslo",
      "timezone": "Europe/Oslo",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "nor000000000000000000000", "name": "Norway", "iso3": "NOR" }
    },
    {
      "_id": "64a000000000000000000033",
      "name": "Copenhagen",
      "timezone": "Europe/Copenhagen",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "dnk000000000000000000000", "name": "Denmark", "iso3": "DNK" }
    },
    {
      "_id": "64a000000000000000000034",
      "name": "Prague",
      "timezone": "Europe/Prague",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "cze000000000000000000000", "name": "Czechia", "iso3": "CZE" }
    },
    {
      "_id": "64a000000000000000000035",
      "name": "Budapest",
      "timezone": "Europe/Budapest",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "hun000000000000000000000", "name": "Hungary", "iso3": "HUN" }
    },
    {
      "_id": "64a000000000000000000036",
      "name": "Bucharest",
      "timezone": "Europe/Bucharest",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "rou000000000000000000000", "name": "Romania", "iso3": "ROU" }
    },
    {
      "_id": "64a000000000000000000037",
      "name": "Kyiv",
      "timezone": "Europe/Kyiv",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "ukr000000000000000000000", "name": "Ukraine", "iso3": "UKR" }
    },
    {
      "_id": "64a000000000000000000038",
      "name": "Bangkok",
      "timezone": "Asia/Bangkok",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "tha000000000000000000000", "name": "Thailand", "iso3": "THA" }
    },
    {
      "_id": "64a000000000000000000039",
      "name": "Jakarta",
      "timezone": "Asia/Jakarta",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "idn000000000000000000000", "name": "Indonesia", "iso3": "IDN" }
    },
    {
      "_id": "64a00000000000000000003a",
      "name": "Manila",
      "timezone": "Asia/Manila",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "phl000000000000000000000", "name": "Philippines", "iso3": "PHL" }
    },
    {
      "_id": "64a00000000000000000003b",
      "name": "Kuala Lumpur",
      "timezone": "Asia/Kuala_Lumpur",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "mys000000000000000000000", "name": "Malaysia", "iso3": "MYS" }
    },
    {
      "_id": "64a00000000000000000003c",
      "name": "Ho Chi Minh City",
      "timezone": "Asia/Ho_Chi_Minh",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "vnm000000000000000000000", "name": "Vietnam", "iso3": "VNM" }
    },
    {
      "_id": "64a00000000000000000003d",
      "name": "Taipei",
      "timezone": "Asia/Taipei",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "twn000000000000000000000", "name": "Taiwan", "iso3": "TWN" }
    },
    {
      "_id": "64a00000000000000000003e",
      "name": "Riyadh",
      "timezone": "Asia/Riyadh",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "sau000000000000000000000", "name": "Saudi Arabia", "iso3": "SAU" }
    },
    {
      "_id": "64a00000000000000000003f",
      "name": "Nairobi",
      "timezone": "Africa/Nairobi",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "ken000000000000000000000", "name": "Kenya", "iso3": "KEN" }
    },
    {
      "_id": "64a000000000000000000040",
      "name": "Casablanca",
      "timezone": "Africa/Casablanca",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "mar000000000000000000000", "name": "Morocco", "iso3": "MAR" }
    },
    {
      "_id": "64a000000000000000000041",
      "name": "Santiago",
      "timezone": "America/Santiago",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "chl000000000000000000000", "name": "Chile", "iso3": "CHL" }
    },
    {
      "_id": "64a000000000000000000042",
      "name": "Lima",
      "timezone": "America/Lima",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "per000000000000000000000", "name": "Peru", "iso3": "PER" }
    },
    {
      "_id": "64a000000000000000000043",
      "name": "Bogotá",
      "timezone": "America/Bogota",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "col000000000000000000000", "name": "Colombia", "iso3": "COL" }
    },
    {
      "_id": "64a000000000000000000044",
      "name": "Montreal",
      "timezone": "America/Toronto",
      "district": "Quebec",
      "districtCode": "QC",
      "_country": { "_id": "can000000000000000000000", "name": "Canada", "iso3": "CAN" }
    },
    {
      "_id": "64a000000000000000000045",
      "name": "Calgary",
      "timezone": "America/Edmonton",
      "district": "Alberta",
      "districtCode": "AB",
      "_country": { "_id": "can000000000000000000000", "name": "Canada", "iso3": "CAN" }
    },
    {
      "_id": "64a000000000000000000046",
      "name": "Phoenix",
      "timezone": "America/Phoenix",
      "district": "Arizona",
      "districtCode": "AZ",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a000000000000000000047",
      "name": "Portland",
      "timezone": "America/Los_Angeles",
      "district": "Oregon",
      "districtCode": "OR",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a000000000000000000048",
      "name": "Atlanta",
      "timezone": "America/New_York",
      "district": "Georgia",
      "districtCode": "GA",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a000000000000000000049",
      "name": "Washington",
      "timezone": "America/New_York",
      "district": "District of Columbia",
      "districtCode": "DC",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    },
    {
      "_id": "64a00000000000000000004a",
      "name": "Edinburgh",
      "timezone": "Europe/London",
      "district": "Scotland",
      "districtCode": "SCT",
      "_country": { "_id": "gbr000000000000000000000", "name": "United Kingdom", "iso3": "GBR" }
    },
    {
      "_id": "64a00000000000000000004b",
      "name": "Manchester",
      "timezone": "Europe/London",
      "district": "England",
      "districtCode": "ENG",
      "_country": { "_id": "gbr000000000000000000000", "name": "United Kingdom", "iso3": "GBR" }
    },
    {
      "_id": "64a00000000000000000004c",
      "name": "Brussels",
      "timezone": "Europe/Brussels",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "bel000000000000000000000", "name": "Belgium", "iso3": "BEL" }
    },
    {
      "_id": "64a00000000000000000004d",
      "name": "Munich",
      "timezone": "Europe/Berlin",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "deu000000000000000000000", "name": "Germany", "iso3": "DEU" }
    },
    {
      "_id": "64a00000000000000000004e",
      "name": "Barcelona",
      "timezone": "Europe/Madrid",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "esp000000000000000000000", "name": "Spain", "iso3": "ESP" }
    },
    {
      "_id": "64a00000000000000000004f",
      "name": "Milan",
      "timezone": "Europe/Rome",
      "district": "",
      "districtCode": "",
      "_country": { "_id": "ita000000000000000000000", "name": "Italy", "iso3": "ITA" }
    },
    {
      "_id": "64a000000000000000000050",
      "name": "Perth",
      "timezone": "Australia/Perth",
      "district": "Western Australia",
      "districtCode": "WA",
      "_country": { "_id": "aus000000000000000000000", "name": "Australia", "iso3": "AUS" }
    },
    {
      "_id": "64a000000000000000000051",
      "name": "San Francisco",
      "timezone": "America/Los_Angeles",
      "district": "California",
      "districtCode": "CA",
      "_country": { "_id": "usa000000000000000000000", "name": "United States", "iso3": "USA" }
    }
  ]
};

const FIO_CITIES = FIO_CITIES_RESPONSE.cities;

// iso3 -> flag emoji, covering every country present in FIO_CITIES.
const ISO3_FLAGS = {
  GBR: "🇬🇧", USA: "🇺🇸", CAN: "🇨🇦", MEX: "🇲🇽", BRA: "🇧🇷", ARG: "🇦🇷",
  FRA: "🇫🇷", DEU: "🇩🇪", ESP: "🇪🇸", ITA: "🇮🇹", NLD: "🇳🇱", SWE: "🇸🇪",
  CHE: "🇨🇭", AUT: "🇦🇹", POL: "🇵🇱", RUS: "🇷🇺", TUR: "🇹🇷", EGY: "🇪🇬",
  NGA: "🇳🇬", ZAF: "🇿🇦", ARE: "🇦🇪", ISR: "🇮🇱", IND: "🇮🇳", SGP: "🇸🇬",
  HKG: "🇭🇰", CHN: "🇨🇳", JPN: "🇯🇵", KOR: "🇰🇷", AUS: "🇦🇺", NZL: "🇳🇿",
  IRL: "🇮🇪", PRT: "🇵🇹", GRC: "🇬🇷", FIN: "🇫🇮", NOR: "🇳🇴", DNK: "🇩🇰",
  CZE: "🇨🇿", HUN: "🇭🇺", ROU: "🇷🇴", UKR: "🇺🇦", THA: "🇹🇭", IDN: "🇮🇩",
  PHL: "🇵🇭", MYS: "🇲🇾", VNM: "🇻🇳", TWN: "🇹🇼", SAU: "🇸🇦", KEN: "🇰🇪",
  MAR: "🇲🇦", CHL: "🇨🇱", PER: "🇵🇪", COL: "🇨🇴", BEL: "🇧🇪",
};

function cityFlag(city) {
  return (city && city._country && ISO3_FLAGS[city._country.iso3]) || "🌐";
}
