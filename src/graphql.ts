
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface User {
    id: string;
    email: string;
}

export interface IQuery {
    me(): User | Promise<User>;
}

export interface IMutation {
    login(email?: string): string | Promise<string>;
}
