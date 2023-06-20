import { IsString, ValidateIf } from 'class-validator'
export class SchoolDto {

    @ValidateIf((object, value) => value !== undefined)
    @IsString()
    name?: string

}

export class SchoolQueryDto {
    query: string
    //  query: {
    //      where?: SchoolDto
    //      take: number
    //      skip: number
    //      relations: []
    //      select: []
    //      loadRelationIds: boolean
    //  }
}