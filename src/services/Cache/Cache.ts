import mcache from "memory-cache";
import { Response, Request, NextFunction } from "express"

export const useCache = (req: Request, res: Response, next: NextFunction) => {
    const key = '__express__' + req.originalUrl || req.url
    const cachedBody = mcache.get(key)

    if (cachedBody) {
        res.send({ ...cachedBody, cached: true })
        return
    } else {
        next()
    }
}

export const setCache = (key: string, response: any, duration: any = 3600000) => {
    mcache.put(key, response, duration);
}

export const clearCache = () => {
    mcache.clear();
}

export const getCacheStatus = () => {
    return {
        memsize: mcache.memsize(),
        size: mcache.size()
    };
}