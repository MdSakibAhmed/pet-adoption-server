export type IPetFilterRequest = {
    species?: string | undefined;
    breed?: string | undefined;
    age?: string | undefined;
    size?:string | undefined;
    location?:string | undefined;
    searchTerm?: string | undefined;
}