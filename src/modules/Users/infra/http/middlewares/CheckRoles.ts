import { Request, Response, NextFunction } from "express";
import { GetAllRolesService } from "@modules/Users/services/GetAllRolesService";

export class CheckRoles {
  async isAdmin(request: Request, response: Response, next: NextFunction) {
    const { user } = request;

    try {
      const service = new GetAllRolesService();

      const roles = await service.execute();
      const userRole = user.info.role;

      if (userRole === "Admin") {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === userRole) {
            next();
          }
        }
      } else {
        return response.status(403).json("Need ADMIN Role!");
      }
    } catch (err) {
      return response.status(401).json(err);
    }
  }
}
