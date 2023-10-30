import { User } from "./user";

export interface PostResponse {
    id: number;
    date_time: Date;
    text: string;
    user: User
}