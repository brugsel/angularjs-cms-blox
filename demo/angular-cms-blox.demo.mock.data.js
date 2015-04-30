var mockData = {};

mockData.contentType = {'Content-type': 'application/json'};

mockData.token = {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NTBjN2U2NDE1OGMxZDAzMDAwOTBkNGMiLCJpYXQiOjE0Mjc3NDEwOTgsImV4cCI6MTQyODk1MDY5OH0.XGvhBLarTUVLO1P5Ulb2tlopBXwIuojRbYt_75K5R3E"};

mockData.wwwHome =
{
  '_id': {
    '$oid': 'home.nl_NL'
  },
  'part': 'home',
  'lang': 'nl_NL',
  'home': {
    'title': 'Titel aanpasbaar na inlog',
    'title1': 'Titel 1',
    'title2': 'Titel 2',
    'title3': 'Titel 3',
    "intro": "Met de producten van DOON speel je praktisch en doeltreffend in op een snel veranderende wereld. Op weg naar een wendbare organisatie en om continue innovatie te realiseren."
  }
};

mockData.wwwAuth = {
  "_id": "auth.nl_NL",
  "part": "auth",
  "language": "nl_NL",
  "auth": {
    "title": "Aanmelden",
    "or": "of",
    "email": "e-mail",
    "password": "wachtwoord",
    "password-confirm": "wachtwoord bevestigen",
    "login": "log in",
    "logout": "log uit",
    "signup": "aanmelden",
    "to-signup": "of meld je aan",
    "to-login": "ga naar inloggen",
    "lost": "wachtwoord vergeten"
  }
};

mockData.wwwArray = [
  mockData.wwwHome
];

mockData.config = {
  "_id" : "development",
  "config" : {
    "environment" : "development",
    "disqusProvider" : "dooninnovation-test"
  }
};
