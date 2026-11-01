declare const process: {
    env: {
        API_URL: string;
        API_KEY: string;
    };
};

declare module '*.css';

declare module '*.svg' {
    const url: string;
    export default url;
}
