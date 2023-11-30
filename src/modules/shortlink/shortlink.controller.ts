import axios from "axios";
import { Request, Response } from "express";
import shortid from "shortid";
import QRCode from "qrcode";
// import ShortLink from "../../models/shortLink.model";

export class ShortLink {
  static async short(req: Request, res: Response): Promise<Response> {
    try {
      const link = req.body.link;

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
      const qrCode = await QRCode.toDataURL(shortLink);

      return res.status(200).json({
        link: link,
        title: title,
        icon: icon,
        shortLink: shortLink,
        qrCode: qrCode,
      });
    } catch (error) {
      console.error("Error short link:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
