import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { TestAppoimentsService } from "../test-appoiments.service";

@Injectable()
export class AppoimentInSchoolGuard implements CanActivate {
  constructor(
    private readonly testAppoimentsService: TestAppoimentsService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = +request.user.id;
    const appoimentId = +request.params.id;
    return this.testAppoimentsService.doesAppoimentBelongToUser(appoimentId, userId);
  }
}