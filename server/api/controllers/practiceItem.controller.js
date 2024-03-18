const db = require("../models");
const practiceItem = db.practiceItem;
const Op = db.sequelize.Op;

// Create new practice item
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
        console.log(req)
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const newPracticeItem = {
        frequency: req.body.frequency,
        description: req.body.description,
        source_link: req.body.source_link,
        topic: req.body.topic,
        type: req.body.type,
        duration: req.body.duration
    };

    practiceItem.create(newPracticeItem)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Practice Item"
            });
        });
};

// Retrieve all Practice Items from the database with specific type
exports.findAll = (req, res) => {
    practiceItem.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Practice Item."
            });
        });
};  

// Find a single Practice Item with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    practiceItem.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Practice Item with id=" + id
            });
        });
};

// Update a Practice Item by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    practiceItem.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Practice Item updated successfully"
                });
            } else {
                res.send({
                    message: 'Cannot update Practice Item with id=${id}. Maybe Practice Item was not found or req.body is empty!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "error updating Tutorial with id=" + id
            });
        });
};

// Delete a Practice Item with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    practiceItem.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Practice Item was deleted successfully!"
                });
            } else {
                res.send({
                    message: 'Cannot delete Practice Item with id=${id}. Maybe Practice Item was not found or req.body is empty!'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Practice Item with id=" + id
            });
        });
};

// Delete all Practice Items from the database.
exports.deleteAll = (req, res) => {
    practiceItem.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: '${nums} Practice Items were deleted successfully!'})
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Practice Items"
            });
        });
};
