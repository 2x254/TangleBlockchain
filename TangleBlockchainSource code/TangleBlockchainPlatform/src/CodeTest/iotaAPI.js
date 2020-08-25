const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');

// Connect to a node
const iota = Iota.composeAPI({
  provider: 'http://localhost:14265'
});

// Define the tail transaction hash of the bundle whose messages you want to read
const tailTransactionHash =
    'LJBJNIQHDABDF9WWWOGXLFLMMS9HOGYZBQK9VYHQHNVTKFUITXSLRGSCV9CD9SKHTRYIZYPIKSHMZ999';

// Get the transaction objects in the bundle
iota.getBundle(tailTransactionHash)
  .then(bundle => {
    // Extract and parse the JSON messages from the transactions' `signatureMessageFragment` fields
    console.log(JSON.parse(Extract.extractJson(bundle)));
  })
  .catch(err => {
    console.error(err);
  });