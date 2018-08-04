export default class PaginationHelper {

    paginate(nextPageNumber, items, paginationFactor) {
        if (nextPageNumber < 1
            || paginationFactor < 1
            || items.length < 1
            || (nextPageNumber - 1) * paginationFactor > items.length) {
                
            throw new Error('Invalid arguments');
        }

        const start = paginationFactor * (nextPageNumber - 1);
        let end = start + paginationFactor;

        // To ensure array index doesn't overflow
        if (end > items.length) {
            end = items.length;
        }

        const newCurrentPage = items.slice(start, end);

        return {
            currentPageNum: nextPageNumber,
            currentPage: newCurrentPage
        };
    }

}