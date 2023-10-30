import { User } from "./user";

export interface FollowerResponse {
    content: Array<User>;
    followerCount: number;
}