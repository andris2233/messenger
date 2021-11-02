export const parseJwt = (jwt: string): any => JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString('ascii'));
