import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { TestsService } from "../tests.service";

@Injectable()
export class TestInSchoolGuard implements CanActivate {
  constructor(
    private readonly testsService: TestsService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = +request.user.id;
    const testId = +request.params.id;
    return this.testsService.doesTestBelongToUser(testId, userId);
  }
}