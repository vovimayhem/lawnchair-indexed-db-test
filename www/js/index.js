/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    alert("READY");
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);

    app.plainExample();
    // app.lawnchairExample();
  },

  generateSampleItem: function() {
    return {
      todo: "my todo item",
      added_on: new Date()
    };
  },

  plainExample: function() {
    var openReq = window.indexedDB.open("sampleDatabase");

    openReq.onupgradeneeded = function (event) {
      var db = event.target.result;
      db.createObjectStore("todo", {autoIncrement: true});
    };

    openReq.onsuccess = function (event) {
      var db = event.target.result;
      var sampleItem = app.generateSampleItem();

      var addReq = db.transaction("todo", "readwrite").objectStore("todo")
        .add(sampleItem);

      addReq.onsuccess = function (event) {
        var msg = "Operation completed successfully";
        alert(msg);
        console.log(msg);
      };

      addReq.onerror = function (event) {
        var msg = "Operation failed";
        console.log(msg);
      };
    }
    openReq.onerror = function (event) {
      var msg = "Operation failed";
      console.log(msg);
      console.log("Operation failed");
    }
  },

  lawnchairExample: function() {
    alert("About to connect to the DB");
    var store = new Lawnchair(
      { name: "lawnchair" },
      function(store) {
        var sampleItem = app.generateSampleItem();
        // sampleItem.key = sampleItem.added_on.valueOf();

        alert("About to save to the DB");
        store.save(sampleItem);
        alert("Successful save to the DB");
      }
    );
  }

};

app.initialize();
