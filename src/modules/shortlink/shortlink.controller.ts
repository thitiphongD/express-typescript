import axios from "axios";
import { Request, Response } from "express";
import shortid from "shortid";
// import QRCode from "qrcode";
import ShortLink from "../../models/shortLink.model";
import { v4 as uuidv4 } from "uuid";

export class CreateShortLink {
  static async short(req: Request, res: Response): Promise<Response> {
    try {
      const link = req.body.link;
      const user = req.user;
      const id = uuidv4();
      let userID;
      if (user && user.dataValues && user.dataValues.id) {
        const userId = user.dataValues.id;
        userID = userId;
      } else {
        console.error("User ID not found in the user object.");
      }
      const response = await axios.get(link);
      const html = response.data;
      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      const title = titleMatch ? titleMatch[1] : "No title found";

      // Extract icon using a regular expression
      const iconMatch = html.match(
        /<link.*?rel=["']icon["'].*?href=["'](.*?)["']/i
      );
      const icon = iconMatch ? iconMatch[1] : "No icon found";

      const shortLink = shortid.generate();
      // const qrCode = await QRCode.toDataURL(shortLink);

      const newShortLink = await ShortLink.create({
        id: id,
        originalLink: link,
        short_link: shortLink,
        // qr_code: qrCode,
        icon: icon,
        title: title,
        userId: userID,
      });

      return res.status(200).json({
        message: "Short link success",
        data: newShortLink,
      });
    } catch (error) {
      console.error("Error short link:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export class GetAllLinks {
  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const allLinks = await ShortLink.findAll();

      return res.status(200).json({ data: allLinks });
    } catch (error) {
      console.error("Error retrieving links:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

export class GetLink {
  static async show(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const link = await ShortLink.findByPk(id);
      if (!link) {
        return res.status(404).json({
          message: "link not found!",
        });
      }
      return res.status(200).json({
        link: link,
      });
    } catch (error) {
      console.error("Error retrieving link:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
