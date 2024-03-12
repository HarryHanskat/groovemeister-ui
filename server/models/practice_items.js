const Sequelize = require("sequelize");
module.exports = function createPracticeItemModel(sequelize) {
  const PracticeItem = sequelize.define(
    "Practice Item",
    {
        frequency: { type: Sequelize.STRING, allowNull: false },
        description: { type: Sequelize.STRING, allowNull: false },
        source_link: { type: Sequelize.STRING, allowNull: true },
        topic: { type: Sequelize.STRING, allowNull: false },
        type: { type: Sequelize.STRING, allowNull: false },
        hash: { type: Sequelize.STRING, allowNull: false },
    },
    {}
  );
  return PracticeItem;
};