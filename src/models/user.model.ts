import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/sequelize-config";
import { v4 as uuidv4 } from "uuid";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
