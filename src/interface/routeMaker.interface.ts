import { RequestHandler } from "express"

const Tmethod = {
    post:"post",
    get:"get",
    put:"put",
    patch:"patch",
    delete:"delete"

} as const
export type TRoutMaker = {
    method:  keyof typeof Tmethod,
    path:string
    controller: RequestHandler
}



