import "reflect-metadata";
import { RequestHandler } from "express";
import { Methods } from "../../utils/Method";
import { MetadataKey } from "../../utils/MetadataKey";
interface routeHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}


function RouteBinder(method: string) {
  return function get(path: string) {
    return function (target: any, key: string, desc: routeHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKey.path, path, target, key);
      Reflect.defineMetadata(MetadataKey.method, method, target, key);
    };
  };
}

export const post = RouteBinder(Methods.post);
export const get = RouteBinder(Methods.get);

