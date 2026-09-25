export const msalConfig = {
    auth: {
        clientId: "77ce56ff-4e84-445e-8365-de58c98c3010",
        authority: "https://login.microsoftonline.com/75e32c1a-860e-4c9c-93b4-b1ab76c0a4d8",
        redirectUri: "https://mesatech-frontend.vercel.app",
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    }
};

export const loginRequest = {
    scopes: ["api://68933a20-7ee7-45b7-9fc5-bc5cec21c01c/access_as_user"]
};
