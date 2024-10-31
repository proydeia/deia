const bcrypt = require('bcryptjs');

export async function hash(data:string) {
    return bcrypt.hash(data, 10).then(function(hash:string) {
        return hash;
    });
}

export async function compare(data:string, hash:string): Promise<boolean> {
    return bcrypt.compare(data, hash).then(function(result:boolean): boolean {
        return result;
    });
}