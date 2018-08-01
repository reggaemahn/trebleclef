import UrlHelpers from '../../../common/libs/UrlHelpers';

it('parses the query string correctly', () => {
    var expected = 'randomQuery';

    var actual = new UrlHelpers()
        .getUrlParameter('query');

    expect(actual).toBe(expected);
});