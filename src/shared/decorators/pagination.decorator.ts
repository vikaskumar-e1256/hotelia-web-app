import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PaginationParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const page = parseInt(request.query.page, 10) || 1;
    const limit = parseInt(request.query.limit, 10) || 10;

    return { page, limit };
  },
);
