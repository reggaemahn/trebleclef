import * as AppSettings from '../AppSettings';

export default class PaginationHelper {

    paginate(nextPageNumber, items) {
        const start = AppSettings.SEARCH_PAGINATION_FACTOR * (nextPageNumber - 1);
        let end = start + AppSettings.SEARCH_PAGINATION_FACTOR;

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