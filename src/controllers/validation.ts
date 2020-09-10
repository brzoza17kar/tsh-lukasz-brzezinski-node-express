import { RequestValidationField } from '../enums/RequestValidationField';
import { validate, ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";
import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from 'express';
import { Database } from './db';

export function validateRequest(dtoClass: any, validationField = RequestValidationField.BODY) {
    return function (req: Request, res: Response, next: NextFunction) {
        const output: any = plainToClass(dtoClass, req[validationField]);
        validate(output, { skipMissingProperties: true }).then(errors => {
            // errors is an array of validation errors
            if (errors.length > 0) {
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                res.status(400).send(errorTexts);
                return;
            } else {
                res.locals.input = output;
                next();
            }
        });
    };
};

export function AreValidGenres(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "areValidGenres",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(requestGenres: String[], args: ValidationArguments) {
                    const validGenres = Database.getGenres();

                    const validRequestGenresCount = requestGenres.filter(
                        requestGenre => validGenres.indexOf(requestGenre) > -1
                    ).length;

                    return validRequestGenresCount === requestGenres.length;
                }
            }
        });
    };
}
