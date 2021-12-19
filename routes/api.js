const express = require('express');
const router = express.Router();
const cors = require('cors');
const { CredentialsServiceClient, Credentials } = require("@trinsic/service-clients");
const cache = require('../model');
require('dotenv').config();

const client = new CredentialsServiceClient(
    new Credentials(process.env.ACCESSTOK),
    { noRetryPolicy: true });

const getInvite = async () => {
  try {
    return await client.createConnection({});
  } catch (e) {
    console.log(e.message || e.toString());
  }
}

router.post('/issue', cors(), async function (req, res) {
    const invite = await getInvite();
    let params = {
        definitionId:process.env.CRED_DEF_ID,
        automaticIssuance: true,
        credentialValues: {
            DLNumber: req.body.DLNumber,
            Name: req.body.Name,
            Address: req.body.Address,
            Issuer_Address: req.body.Issuer_Address,
            DOB: req.body.DOB,
            FName:req.body.FName,
            Contact: req.body.Contact,
            Residence_Number: req.body.Residence_Number
        }
    }
    console.log('\x1b[36m%s\x1b[0m', 'I am cyan', params);
    let result = await client.createCredential(params);
    console.log("This is the result",result);
    res.status(200).send({ offerData: result.offerData, offerUrl: result.offerUrl });
});


/*router.post('/issue', cors(), async function (req, res) {
  console.log("this is request body in api routes",req.body)

  const invite = await getInvite();
  const attribs = JSON.stringify(req.body);

  cache.add(invite.connectionId, attribs);
  res.status(200).send({ invitation: invite.invitationUrl,offerData: result.offerData, });
});*/

module.exports = router;
