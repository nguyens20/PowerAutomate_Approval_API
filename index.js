const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.delete('/api/approvals/:id', async (req, res) => {
  const id = req.params.id;

  const response = await axios({
    method: 'post',
    url: `https://prod-00.westus.logic.azure.com:443/workflows/WORKFLOW_ID/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WORKFLOW_TRIGGER_KEY`,
    data: {
      "actionName": "Cancel",
      "id": id
    }
  });

  if (response.status === 200) {
    res.sendStatus(204);
  } else {
    console.error(response.data);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});