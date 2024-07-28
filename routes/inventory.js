const admin = require("firebase-admin");

const credentials = require("./key.json");

const express = require("express");

const app = express(); 

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

app.get("/:q1/:q2", async (req, res) => {
    let { q1, q2 } = req.params;
    let data = {};
  
    try {
      const userRef = db.collection(q1).doc(q2);
      const response = await userRef.get();
      if (response.exists) {
        data = response.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting documents:", error);
    }
    res.render("newinventory", { q1, q2, data });
  });  

module.exports = app;
