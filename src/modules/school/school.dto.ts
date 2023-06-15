import { IsString } from 'class-validator'
export class SchoolDto {

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