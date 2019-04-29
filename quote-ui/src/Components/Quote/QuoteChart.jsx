import React from 'react';
import Highcharts from 'highcharts';
import { 
    HighchartsChart,
    Chart,
    withHighcharts,
    XAxis,
    YAxis,
    Title,
    Subtitle,
    LineSeries,
    Tooltip,
} from 'react-jsx-highcharts';

/* This could be a functional component, as we are not using any lifecycle hooks.
 * But, any advaced interactive functionality with Highcharts may require
 * additional class methods ( or custom React hooks ), so I have left is as a class to avoid a refactor.
 * 
 * It is a Pure Component to avoid a rerender if the data prop has not been changed.
 */
class QuoteChart extends React.PureComponent {
    render() {
        /* We could optimize this a bit and calculate the Date values and Y values in 1 loop
         */
        let priceSeries = makeSeriesData(this.props.data, 'Close Price', 'close', 'label');
        let xSeries = makeCategories(this.props.data, 'label');

        return <div id="quote-chart">
            <HighchartsChart plotOptions={{}} >
                <Chart />
                <Title>Price Chart (30 days)</Title>

                <Subtitle>Source: iextrading.com</Subtitle>

                <Tooltip 
                    pointFormat={
                        `Close: <b>{point.y}</b><br/>
                        Change %: <b>{point.changePercent}</b><br/>
                        High: <b>{point.high}</b><br/>
                        Low: <b>{point.low}</b><br/>
                        Volume: <b>{point.volume}</b><br/>`
                    }
                />

                <XAxis
                    categories={xSeries}
                    crosshair={{}}
                />

                <YAxis>
                    <YAxis.Title>Price</YAxis.Title>
                    <LineSeries  { ...priceSeries } />
                </YAxis>

            </HighchartsChart>
        </div>
    }
}

function makeSeriesData(data, name, yValue, xValue) {
    return {
        name,
        data: data.map( (row) => ({ y: row[yValue], ...row })),
        color: 'rgb(144, 237, 125)'
    };
}

function makeCategories(data, xValue = 'label') {
    return data.map( (row) => row[xValue] );
}

export default withHighcharts(QuoteChart, Highcharts);