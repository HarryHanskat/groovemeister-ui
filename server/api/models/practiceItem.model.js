module.exports = (sequelize, Sequelize) => {
    const practiceItem = sequelize.define("practiceItem", {
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
        },
        duration: {
            type: Sequelize.INTEGER
        }
    });

    return practiceItem;
};