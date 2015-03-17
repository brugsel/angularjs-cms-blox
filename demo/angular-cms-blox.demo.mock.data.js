var mockData = {};

mockData.contentType = {'Content-type': 'application/json'};

mockData.token = {"token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NGU4NWI5OWE5YjIxZWJiNGQ5ZDM0MWUiLCJpYXQiOjE0MjQ1MTUyODYsImV4cCI6MTQyNTcyNDg4Nn0.QxXaaZHy7PkYv3PS3mqNIzkqDAvlyBK1Bs297n7AVvA"};

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
    'title4': 'Titel 4',
    "intro": "Welkom op de demo pagina van de angular-cms-blox. Op deze pagina is een voorbeeld te zien hoe de texten aangepast kunnen worden na inlog."
  }
};

mockData.wwwAuth = {
  "_id": "auth.nl_NL",
  "part": "auth",
  "language": "nl_NL",
  "auth": {
    "title": "Login met",
    "or": "of",
    "email": "e-mail",
    "password": "wachtwoord",
    "password-confirm": "wachtwoord bevestigen",
    "login": "log in",
    "logout": "log uit",
    "signup": "aanmelden",
    "lost": "wachtwoord vergeten"
  }
};

mockData.wwwArray = [
  mockData.wwwHome
];
