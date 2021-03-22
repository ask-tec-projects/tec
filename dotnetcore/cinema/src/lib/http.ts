export async function post_json<RequestBodyType, ResponseBodyType>(
    url: string,
    body: RequestBodyType,
): Promise<ResponseBodyType> {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }).then((response) => {
        return response.json();
    });
}

export async function get_json<ResponseBodyType>(url: string): Promise<ResponseBodyType> {
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    }).then((response) => {
        return response.json();
    });
}
