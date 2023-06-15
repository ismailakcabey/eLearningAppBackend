
    export class QueryDto {
          query: {
              where?: object
              take: number
              skip: number
              relations: []
              select: []
              loadRelationIds: boolean
          }
    }