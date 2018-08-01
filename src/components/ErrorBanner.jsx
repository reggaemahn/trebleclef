import React from 'react';

const ErrorBanner = (props) => {
    return (
        <div className={`notification is-danger ${ props.isErrorState ? '' : 'is-hidden' }`}>
            <button className="delete" onClick={props.hideError}></button>
            <span>An error occurred. Please try again in a few minutes.</span>
        </div>
    );
}

export default ErrorBanner;