import React from 'react';

const Pagination = (props) => {
    const isFirst = props.currentPageNum === 1;
    const isLast = props.pageCount <= 1 || props.currentPageNum === props.pageCount;

    return (
        <div className={`pagination search-pagination is-rounded is-centered ${props.pageCount > 0 ? '' : 'is-hidden'}`} role="navigation" aria-label="pagination">
            <ul className="pagination-list">
                <li onClick={() => { props.onPaginate(props.currentPageNum - 1) }} className={isFirst ? 'is-hidden' : ''}>
                    <a className="pagination-link" aria-label="Goto previous page">{`<`}</a>
                </li>

                <li>
                    <a className="pagination-link is-current" aria-label="Page 3" aria-current="page">{`${props.currentPageNum} of ${props.pageCount}`}</a>
                </li>

                <li onClick={() => { props.onPaginate(props.currentPageNum + 1) }} className={isLast ? 'is-hidden' : ''}>
                    <a className="pagination-link" aria-label="Goto previous page">{`>`}</a>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;
