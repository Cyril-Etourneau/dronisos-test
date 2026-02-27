function getBackendUrl(): string {
    return location.origin.replace(/\d+/, "5000");
}

export { getBackendUrl };
