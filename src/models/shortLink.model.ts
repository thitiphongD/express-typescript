import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/sequelize-config";
import { v4 as uuidv4 } from "uuid";
import User from "./user.model";

class ShortLink extends Model {}

ShortLink.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },

    originalLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    qr_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ShortLink",
  }
);

// Define the association between ShortLink and User
ShortLink.belongsTo(User, { foreignKey: "userId" });

export default ShortLink;
