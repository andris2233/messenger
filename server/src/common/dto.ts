import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PageDto {
  @ApiProperty({ default: 0, required: false })
  page: number;
}

export class SizeDto {
  @ApiProperty({ default: 5, required: true })
  size: number;
}

export class SearchDto {
  @ApiProperty({ default: '', required: false })
  search: string;
}

export class IdDto {
  @ApiProperty({ default: 1, required: true })
  id: number;
}

export class PaginationDto<ItemType> {
  @ApiProperty({ default: 1 })
  count: number;

  @ApiProperty()
  rows: ItemType[];
}

export const ApiPaginatedDto = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              count: { type: 'number', default: 10 },
              rows: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
