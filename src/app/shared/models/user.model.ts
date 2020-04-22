import { RoleType, GenderType } from 'src/app/shared/models';

export class UserModel {
    id: string;
    role: RoleType;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthday?: Date;
    gender: GenderType;
    passwordChangeRequired: boolean;
    profileImageUrl: string;
}
