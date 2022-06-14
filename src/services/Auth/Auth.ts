import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default class Auth {
    JWT_SECRET: string;

    constructor() {
        this.JWT_SECRET = process.env.JWT_SECRET || 'change_this_to_a_secure_secret';

        this.checkToken = this.checkToken.bind(this);
        this.createToken = this.createToken.bind(this);
        this.createPasswordHash = this.createPasswordHash.bind(this);
        this.comparePasswordHash = this.comparePasswordHash.bind(this);
    }

    checkToken(req: any, res: any, next: any) {
        let token = req.headers['x-access-token'] || req.headers['authorization'];

        if (!token) {
            res.send({ error: 'No token provided.' });
            return;
        }
        
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, this.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                res.send({ error: 'Token is not valid: ' + err });
                return;
            }

            if (req.clientIp !== decoded.ip) {
                res.send({ error: 'Token is not valid: different ip' });
                return;
            }

            res.locals.user = {
                id: decoded.id,
            };

            next();
        });
    }

    createToken(id: string, ip: string): string {
        return jwt.sign({ id, ip }, this.JWT_SECRET, { expiresIn: '6h' });
    }

    createPasswordHash(password: string): string {
        const salt = bcrypt.genSaltSync(16);
        return bcrypt.hashSync(password, salt);
    }

    comparePasswordHash(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
}