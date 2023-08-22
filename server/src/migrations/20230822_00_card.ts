import { DataTypes } from "sequelize";

export = {
  up: async ({ context: queryInterface }: any) => {
    await queryInterface.addColumn("cards", "content", {
      type: DataTypes.JSONB,
      default: false,
    });
    await queryInterface.removeColumn("cards", "type");
    await queryInterface.removeColumn("cards", "front");
    await queryInterface.removeColumn("cards", "back");
  },
  down: async ({ context: queryInterface }: any) => {
    await queryInterface.removeColumn("cards", "content");
    await queryInterface.addColumn("cards", "type", {
      type: DataTypes.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("cards", "front", {
      type: DataTypes.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("cards", "back", {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },
}
