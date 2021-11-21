const expressPort = 3001;

export function getURL(route) {
    return `http://localhost:${expressPort}/${route}`;
}