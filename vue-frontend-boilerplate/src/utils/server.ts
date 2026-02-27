/**
 * Builds the backend base URL by taking the current origin and forcing port 5000.
 *
 * @returns The origin with its port set to 5000 (e.g., "http://localhost:5000").
 *
 * @example
 * // If location.origin === "http://localhost:8080"
 * getBackendUrl(); // "http://localhost:5000"
 */
function getBackendUrl(port = 5000): string {
    const url = new URL(location.origin);
    url.port = port.toString();

    return url.origin;
}

export { getBackendUrl };
