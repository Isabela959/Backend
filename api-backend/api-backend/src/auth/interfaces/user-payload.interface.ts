import { Role } from "src/common/enums/role.enum";

export interface UserPayload {
    userId: number;
    email: string;
    role: Role;
}