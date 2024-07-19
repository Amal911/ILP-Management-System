import {
    LogLevel,
    Configuration,
    BrowserCacheLocation,
} from '@azure/msal-browser';

export const msalConfig: Configuration = {
    auth: {
        clientId: 'd85e6ad5-324d-41e5-9666-b9fb9a1a4aa3', // This is the ONLY mandatory field that you need to supply.
        authority: 'https://login.microsoftonline.com/5b751804-232f-410d-bb2f-714e3bb466eb', // Replace the placeholder with your tenant subdomain
        redirectUri: '/', // Points to window.location.origin by default. You must register this URI on Microsoft Entra admin center/App Registration.
        postLogoutRedirectUri: '/', // Points to window.location.origin by default.
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false,
        },
    },
};

export const loginRequest = {
    scopes: [],
};

export const apiConfig = {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
};