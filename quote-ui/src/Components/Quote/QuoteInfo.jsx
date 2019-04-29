import React from 'react';

/* Theres a lot here that could be improved.
 * As we may frequently change which stats to render, it would be better to have a config
 * of that stats, how to access them, how to format them. And then dynamically iterate over the
 * config  to create the Stat Rows, rather than having all of the markup hardcoded.
 * 
 * This would allow us to also have the user quickly toggle their preferred stats on and off.
 * 
 * Lastly, the presentation could be cleaner if we did some value formatting.
 */
export default function QuoteInfo({ quote }) {
    let { symbol, latestPrice, week52High, high, low,
          week52Low, primaryExchange, changePercent } = quote;
    return (
        <div id="quote-info">
            <div className="quote-row">
                <h2>{ symbol }</h2>
                <div className="quote-price-row">
                    <h2>${ latestPrice }</h2>
                    <span>
                        &nbsp;(
                            <span style={{ 'color': changePercent >= 0 ? 'green' : 'red' }}>
                                {` ${ changePercent}% `}
                            </span>
                        )&nbsp;
                    </span>
                </div>
            </div>
            <div className="quote-row">
                <QuoteStat label="52 Week High" val={ `$${week52High}` } />
                <QuoteStat label="52 Week Low"  val={ `$${week52Low}` } />
            </div>
            <div className="quote-row">
                <QuoteStat label="Session High" val={ `$${high}` } />
                <QuoteStat label="Session Low"  val={ `$${low}` } />
            </div>
            <div className="quote-row">
                <QuoteStat label="Exchange" val={ primaryExchange } />
            </div>
        </div>
    );
}

function QuoteStat({ label, val }) {
    return <span className="quote-stat">
        <i className="quote-stat-label">{ label }:</i>
        <span className="quote-stat-value">{ val }</span>
    </span>;
}