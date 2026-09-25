import { msalInstance } from '../index';

export const getUserRoles = () => {
    const account = msalInstance.getAllAccounts()[0];
    if (account && account.idTokenClaims && account.idTokenClaims.roles) {
        return account.idTokenClaims.roles;
    }
    return [];
};

export const hasRole = (roleName) => {
    const roles = getUserRoles();
    return roles.includes(roleName);
};