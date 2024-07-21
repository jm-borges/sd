import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface CustomJwtPayload extends JwtPayload {
    username: string;
    role: string;
}

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    private readonly methodPermissions: { [method: string]: string[] } = {
        'GET': ['view', 'edit', 'admin'],
        'POST': ['edit', 'admin'],
        'PUT': ['edit', 'admin'],
        'DELETE': ['admin'],
    };

    use(req: Request, res: Response, next: NextFunction) {
        const user = req.user as CustomJwtPayload;

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        const requiredRoles = this.getRequiredRoles(req.method);

        if (requiredRoles.includes(user.role) || requiredRoles.includes('*')) {
            next();
        } else {
            throw new ForbiddenException('Insufficient permissions');
        }
    }

    private getRequiredRoles(method: string): string[] {
        return this.methodPermissions[method] || [];
    }
}
