export type SearchUser = {
    _id: string;
    username: string;
    profilePic?: string;
};

type SearchUsersResponse = {
    users: SearchUser[];
}

export async function searchUsersAPI(query: string): Promise<SearchUser[]> {

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
        return []
    }

    const res = await fetch(
        `/api/users/search?q=${encodeURIComponent(trimmedQuery)}`
    );

    const payload: SearchUsersResponse & { error?: string } = await res.json();

    if (!res.ok) {
        throw new Error(payload.error || "Failed to search users.");
    }

    return payload.users ?? [];
}
