const router = require("express").Router();
const moment = require("moment");
const mongoose = require("mongoose");

const Task = mongoose.model("task");

// Testing route
router.get("/", (req, res) => {
  try {
    res.send({
      working: true,
    });
  } catch (error) {
    res.send({
        'working': false
    });
  }
});

// Saving task route
router.post("/addTask", async (req, res) => {
    try {
        const date = new Date()
        const task = new Task()
        task.name = req.body.name
        task.email = req.body.email
        task.task = req.body.task
        task.isCompleted = req.body.isCompleted
        task.estimatedCompletionTime = req.body.estimatedCompletionTime
        task.estimatedTime = moment(req.body.estimatedCompletionTime, 'D/M/yyyy hh:mm a')
        task.updationTime = moment(date).format('D/M/yyyy hh:mm a')
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400)
    }
})

// Get tasks of a particular user
router.get("/getAllTasks/:email", async (req, res) => {
    try {
        var sort = { createdAt: -1, estimatedTime: 1 }
        const task = await Task.find({
            email: {
                $regex: req.params.email
            }
        }).sort(sort)
        res.send({'tasks': task})
    } catch (error) {
        res.status(400);
    }
})

// Update specific task
router.put("/updateTask/:id", async (req, res) => {
    try {
        const date = Date()
        const task = await Task.findOneAndUpdate({
            _id: req.params.id
        }, {$set: {isCompleted: true, updationTime: moment(date).format('D/M/yyyy hh:mm a')}})
        res.send(task)
    } catch (error) {
        res.send(400);
    }
})

// Delete specific task
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id
        })
        res.send({
            'deleted': true
        })
    } catch (error) {
        res.send(400);
    }
})

module.exports = router;
