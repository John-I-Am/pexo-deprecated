import { DataTypes } from "sequelize";

export = {
  up: async ({ context: queryInterface }: any) => {
    await queryInterface.addColumn("decks", "description", {
      type: DataTypes.TEXT,
      default: false,
    });
  },
  down: async ({ context: queryInterface }: any) => {
    await queryInterface.removeColumn("decks", "description");
  },
}
