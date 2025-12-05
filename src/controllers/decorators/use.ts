import 'reflect-metadata';
import { MetadataKey } from "../../utils/MetadataKey"




export function use(middleware: Function) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
        const middlewares = Reflect.getMetadata(MetadataKey.middleware, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(MetadataKey.middleware, middlewares, target, key);
    }
}