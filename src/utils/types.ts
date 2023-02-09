export type CreateUserDetails = {
     email: string;
     password: string;
     firstName: string;
     lastName: string;
};

export type ValidateUserDetails = {
     email: string;
     password: string;
};

export type findUserParams = Partial<{
     id: number;
     email: string;
     username: string;
}>;