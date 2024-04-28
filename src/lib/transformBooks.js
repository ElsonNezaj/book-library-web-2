export function transformBooks(docs) {
    return docs.slice(0, 20).map((bookSingle) => {
        const { key, author_name, cover_i, edition_count, first_publish_year, title } = bookSingle;
        let olid = "";
        if (bookSingle.isbn && bookSingle.isbn.length > 0) {
            olid = `ISBN:${bookSingle.isbn[0]}`;
        }
        return {
            id: key,
            author: author_name ? author_name : ["Unknown"], // Added a check for authors
            cover_id: cover_i,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title,
            olid: olid // Including OLID in the book object
        }
    });
}

export function transformBooks2(docs) {
    return docs.slice(0, 20).map((bookSingle) => {
        const { key, author_name, cover_id, edition_count, first_publish_year, title } = bookSingle;
        let olid = "";
        if (bookSingle.isbn && bookSingle.isbn.length > 0) {
            olid = `ISBN:${bookSingle.isbn[0]}`;
        }
        return {
            id: key,
            author: author_name ? author_name : ["Unknown"], // Added a check for authors
            cover_id: cover_id,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title,
            olid: olid // Including OLID in the book object
        }
    });
}