import AppRouter, { SubDomainRouter } from "../AppRouter/AppRouter";


export const subDomainList = [
    {subdomain:"www", app: AppRouter, main: true},
    {subdomain:"url", app: SubDomainRouter, main: false}
];