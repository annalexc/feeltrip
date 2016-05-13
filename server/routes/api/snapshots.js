var express = require('express');
var router = express.Router();

var Snapshot = require('../../models/snapshot');

//router.use( passport.authenticate("jwt", {session: false}) );

// GET SINGLE RESOURCE
// router.get('/:id', function(req, res, next){
//   var id = req.params.id;
//   Snapshot.findById(id, function(err, response){
//     if (err) {
//       res.status(404).end();
//     }else {
//       res.json(response);
//     }
//   })
// });

// GET ALL SNAPSHOTS
router.get('/', function(req, res, next){
  Snapshot.find({}).sort({createdAt: -1}).exec(function(err, snapshotData){
    console.log(snapshotData);
    if (err) {
      res.status(404).end();
    }else {
      res.json( snapshotData );
    }
  });
});


// GET ALL SNAPSHOTS for a given userID
router.get('/:userID', function(req, res, next){
  var id = req.params.userID;
  Snapshot.find({userID: id}).sort({createdAt: -1}).exec(function(err, snapshotData){
    console.log(snapshotData);
    if (err) {
      res.status(404).end();
    }else {
      res.json( snapshotData );
    }
  });
});


// POST NEW SNAPSHOT
router.post('/', function(req, res, next){
  console.log(req.body);
  if (!req.body.snapshot) {
    res.status(422).end();
  }else {
    Snapshot.create(req.body.snapshot, function(err, snapshotData){
      res.json(snapshotData);
    });
  };
});


// PUT
router.put('/:id', function(req, res, next){
  console.log('Updating!!!!!!!');
  var id = req.params.id;
  Snapshot.findByIdAndUpdate(id, req.body.snapshot, function(err, snapshot){
    if (!req.body.snapshot) {
      res.status(422).end();
    } else {
      res.status(204).end();
    };
  });
});


// DELETE
router.delete('/:id', function(req, res, next){
  var id = req.params.id;
  Snapshot.findByIdAndRemove(id, function(err){
    if (err) {
      res.status(500).end();
    }else {
      res.status(204).end();
    }
  })
});



module.exports = router;
