const { onRequest } = require('firebase-functions/v2/https');
  const server = import('firebase-frameworks');
  exports.ssrabtalksd8283 = onRequest({"region":"us-central1"}, (req, res) => server.then(it => it.handle(req, res)));
  