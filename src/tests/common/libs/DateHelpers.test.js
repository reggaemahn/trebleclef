import UrlHelpers from '../../../common/libs/DateHelpers';

it('returns empty string when input is null', () => {
    var expected = '';

    var actual = new UrlHelpers()
        .getFriendlyItunesDate(null);

    expect(actual).toBe(expected);
});

it('returns empty string when input length is less than 16', () => {
    var expected = '';

    var actual = new UrlHelpers()
        .getFriendlyItunesDate('test');

    expect(actual).toBe(expected);
});

it('returns correct date when input length is 16', () => {
    var expected = 'Mon, 25 Jun 2018';

    var actual = new UrlHelpers()
        .getFriendlyItunesDate('Mon, 25 Jun 2018');

    expect(actual).toBe(expected);
});

it('returns correct date when input length is greater than 16', () => {
    var expected = 'Mon, 25 Jun 2018';

    var actual = new UrlHelpers()
        .getFriendlyItunesDate('Mon, 25 Jun 2018 03:01:19 -0000');

    expect(actual).toBe(expected);
});