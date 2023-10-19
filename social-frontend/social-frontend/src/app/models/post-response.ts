import { User } from "./user";

export interface PostResponse {
    date_time: Date;
    text: string;
    user: User
}