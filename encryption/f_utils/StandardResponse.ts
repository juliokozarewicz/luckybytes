export interface StandardResponse {
    "status": string,
    "code": number,
    "message": string,
    "idCreated"?: string,
    "urlCreated"?: string,
    "idUpdated"?: string,
    "data"?: any[],
    "meta"?: {
        "total"?: number,
        "page"?: number,
        "per_page"?: number,
        "last_page"?: number
    },
    "links"?: {
        "self"?: string,
        "next"?: string,
        "prev"?: string
    }
}