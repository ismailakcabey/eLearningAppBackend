import { UserDto, UserQueryDto } from "./user.dto"
import { UserTable } from "./user.entity"

export interface UserServiceInterface{
    createUser(userDto:UserDto):Promise<UserTable>
    findUser(userDto:UserQueryDto):Promise<{
        data:UserTable[],
        count:number
    }>
    findUserById(id:number):Promise<UserTable>
    getEmailByUser(email:string):Promise<UserTable>
    updateUser(id:number,userDto:UserDto):Promise<UserTable>
    deleteUser(id:number):Promise<boolean>
    excelExportUser(query:UserQueryDto)
}