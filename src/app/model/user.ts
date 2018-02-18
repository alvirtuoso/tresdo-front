export class User {

    constructor(public user_Id: string
                , public active: boolean
                , public email?: string
                , public address?: string
                , public city?: string
                , public zip?: string
                , public cell?: string
                , public phone?: string
                , public first_Name?: string
                , public last_Name?: string
                , public membership_Id?: string
                , public display_Name?: string) {

    }
}