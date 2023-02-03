import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CompareIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const body = request.body;
    if (body._id !== user.id) {
      return false;
    }
    return true;
  }
}