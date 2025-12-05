import Joi from 'joi';
import 'reflect-metadata';
import { AppRouter } from '../../config/appRouter';
import { Methods } from '../../utils/Method';
import { MetadataKey } from '../../utils/MetadataKey';







import { Request, Response, NextFunction } from 'express';

export const validateTask = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required().messages({
      'string.empty': 'Title is required',
      'string.max': 'Title must not exceed 255 characters'
    }),
    description: Joi.string().max(1000).optional().allow(''),
    status: Joi.string().valid('pending', 'in-progress', 'completed').required().messages({
      'any.only': 'Status must be one of: pending, in-progress, completed'
    }),
    due_date_time: Joi.date().iso().greater('now').required().messages({
      'date.greater': 'Due date must be in the future',
      'date.format': 'Due date must be a valid ISO 8601 date'
    })
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(detail => detail.message)
    });
  }

  
  next();
};


export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();
        
        for (const key of Object.getOwnPropertyNames(target.prototype)) {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKey.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKey.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKey.middleware, target.prototype, key) || [];
            const requiredBodyProps = Reflect.getMetadata(MetadataKey.validator, target.prototype, key) || [];
            
            if (!path || !method) continue;
            
            // Create all middleware array
            const allMiddlewares = [...middlewares];
            
            // Only add body validator for non-GET methods
            if (method !== Methods.get && requiredBodyProps.length > 0) {
                const validator =validateTask;
                allMiddlewares.push(validator);
            }
            
            // Add route handler at the end
            allMiddlewares.push(routeHandler);
            
            // Register the route
            router[method](`${routePrefix}${path}`, ...allMiddlewares);
        }
    };
}

