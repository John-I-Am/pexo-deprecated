import { DataTypes } from "sequelize";

export = {
  up: async ({ context: queryInterface }: any) => {
    await queryInterface.addColumn("cards", "notes", {
      type: DataTypes.STRING,
      default: false,
    });
    await queryInterface.removeColumn("cards", "examples");
  },
  down: async ({ context: queryInterface }: any) => {
    await queryInterface.removeColumn("cards", "notes");
    await queryInterface.addColumn("cards", "examples", {
      type: DataTypes.ARRAY(DataTypes.STRING),
    });
  },
}
