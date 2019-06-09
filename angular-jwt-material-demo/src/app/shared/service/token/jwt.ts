export class Jwt {

    constructor(public userId: number,
                public iat: Date,
                public exp: Date) {
    }
}