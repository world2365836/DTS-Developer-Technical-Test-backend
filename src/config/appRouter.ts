import express from 'express';



export class AppRouter{
    private static instances: express.Router;

    static getInstance(): express.Router{

        if (!AppRouter.instances){
            AppRouter.instances= express.Router();
        }
        return AppRouter.instances;
    }
}