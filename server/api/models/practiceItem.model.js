// Here we're defining the structure of a 'Practice Item' creating a variable for it that will allow us to structure future practice items following the same pattern.

module.exports = (sequelize, Sequelize) => {
    const practiceItem = sequelize.define("practiceItem", {
        duration: {
            type: Sequelize.INTEGER
        },
        frequency: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        source_link: {
            type: Sequelize.STRING
        },
        topic: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }  
    });

    return practiceItem;
};