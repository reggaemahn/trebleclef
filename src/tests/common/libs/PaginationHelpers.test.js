import PaginationHelper from '../../../common/libs/PaginationHelper';

it('returns correct page from middle of array', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const nextPageNum = 2;
    const paginationFactor = 2;

    var expectedPage = [2, 3];
    var expectedPageNum = 2;

    var actual = new PaginationHelper()
        .paginate(nextPageNum, items, paginationFactor);

    expect(actual.currentPage).toEqual(expectedPage);
    expect(actual.currentPageNum).toBe(expectedPageNum);
});

it('returns correct page from beginning of array', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const nextPageNum = 1;
    const paginationFactor = 2;

    var expectedPage = [0, 1];
    var expectedPageNum = 1;

    var actual = new PaginationHelper()
        .paginate(nextPageNum, items, paginationFactor);

    expect(actual.currentPage).toEqual(expectedPage);
    expect(actual.currentPageNum).toBe(expectedPageNum);
});

it('throws when nextPageNum is 0', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const nextPageNum = 0;
    const paginationFactor = 2;

    expect(() => {
        new PaginationHelper()
            .paginate(nextPageNum, items, paginationFactor)
    }).toThrow(Error);
});

it('throws when paginationFactor is 0', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const nextPageNum = 2;
    const paginationFactor = 0;

    expect(() => {
        new PaginationHelper()
            .paginate(nextPageNum, items, paginationFactor)
    }).toThrow(Error);
});

it('throws when nextPageNum is outside array bounds', () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const nextPageNum = 50;
    const paginationFactor = 0;

    expect(() => {
        new PaginationHelper()
            .paginate(nextPageNum, items, paginationFactor)
    }).toThrow(Error);
});