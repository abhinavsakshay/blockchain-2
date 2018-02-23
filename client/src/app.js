'use strict'

const $ = require('jquery')
const {
  makeKeyPair,
  getState,
  submitUpdate
} = require('./state')
const {
  addOption,
} = require('./components')


// Application Object
const app = { user: null, keys: [], assets: [], transfers: [] }

app.update = function (action, asset, owner) {
  if (this.user) {
    submitUpdate(
      { action, asset, owner },
      this.user.private,
      success => success ? console.log("success") : null
    )
  }
}

// Select User
$('[name="keySelect"]').on('change', function () {
  if (this.value === 'new') {
    app.user = makeKeyPair()
    app.keys.push(app.user)
    addOption(this, app.user.public, true)
    addOption('[name="transferSelect"]', app.user.public)
  } else if (this.value === 'none') {
    app.user = null
  } else {
    app.user = app.keys.find(key => key.public === this.value)
  }
})

// Create Asset
$('#createSubmit').on('click', function () {
  const name = $('#createName').val()
  const age = $('#createAge').val()
  const asset = {
    'patientName':name,
    'patientAge':age
  }
  if (asset) app.update('createPatient', asset);
})

$('#getState').on('click', function () {
  getState(({ assets, transfers }) => {
    console.log(assets,transfers);
        this.assets = assets
        for (var I = 0; I < this.assets.length; I++)
        {
             var nameList = "<li>" +"Name:"+ this.assets[I].patientName +'Age:'+this.assets[I].patientAge + "</li>";
             document.getElementById("name").innerHTML += nameList;
        }
  });
})


// Initialize
app.keys.forEach(pair => addOption('[name="keySelect"]', pair.public))

