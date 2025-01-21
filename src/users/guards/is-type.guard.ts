import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserType } from '../enums/user-types.enum';
import { UsersService } from '../users.service';

@Injectable()
export class IsTypeGuard implements CanActivate {
  constructor(
    private type: UserType,
    private readonly userService: UsersService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = +request.user.id;
    return this.userService.isType(userId, this.type);
  }
}
