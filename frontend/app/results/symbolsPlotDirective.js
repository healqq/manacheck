(function () {
    'use strict';

    angular
        .module('results')
        .directive('symbolsPlot', symbolsPlotDirective);

    function symbolsPlotDirective() {
        return {
            restrict: 'E',
            controller: symbolsPlotController,
            controllerAs: 'symbPlotCtrl',
            scope: {
                symbols: '=',
                dimensions: '='
            },
            link: function ($scope, element, attrs, ctrl) {
                ctrl.buildPlot(element[0]);
            },
            bindToController: true,
        };
    }

    symbolsPlotController.$inject = ['colorsSymbolsHelper'];
    /*globals d3 */
    function symbolsPlotController(colorsSymbolsHelper) {
        /*jshint validthis:true */
        var vm = this;
        vm.buildPlot = buildSymbolsPlot;

        function buildSymbolsPlot(element) {
            var values = vm.symbols;
            var graphWidth = vm.dimensions.width;
            var graphHeight = vm.dimensions.height;
            var margin = {
                    top: 10,
                    right: 30,
                    bottom: 30,
                    left: 30
                },
                width = graphWidth - margin.left - margin.right,
                height = graphHeight - margin.top - margin.bottom;
            var valuesArray = [];
            var ticksRange = [];
            var colorsArray = Object.keys(values);
            var resultColorsArray = [];
            colorsArray.forEach(function (color) {
                // remove 0's
                if (values[color] !== 0) {
                    resultColorsArray.push(color);
                    valuesArray.push(values[color]);
                    ticksRange.push(width / colorsArray.length * (valuesArray.length - 1));
                }
            });

            var marginLeft = margin.left + 0.5 * (width / colorsArray.length) * (colorsArray.length - resultColorsArray.length);
            var plot = d3.select(element);

            var formatCount = d3.format(",.f");
            var x = d3.scale.ordinal()
                .domain(resultColorsArray)
                .range(ticksRange);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var y = d3.scale.linear()
                .domain([0, d3.max(valuesArray, function (d) {
                    return d;
                })])
                .range([height, 0]);
            var svg = plot
                .append("svg")
                .attr("viewBox", '0 0 ' + graphWidth + ' ' + graphHeight)
                .append("g")
                .attr("transform", "translate(" + marginLeft + "," + margin.top + ")");
            var bar = svg.selectAll(".bar")
                .data(valuesArray)
                .enter().append("g")
                .attr("class", "bar")
                .attr("fill",
                    function (d, i) {
                        return colorsSymbolsHelper.getSymbolColor(resultColorsArray[i]);
                    })
                .attr("transform", function (d, i) {
                    return "translate(" + (ticksRange[i] - 0.5 * ticksRange[1]) +
                        "," + (height) + ")";
                });

            bar.append("rect")
                .attr("x", 1)
                .attr("width", ticksRange[1] - 1)
                .transition()
                .delay(function (d, i) {
                    return i * 50;
                })
                .style("height", function (d, i) {
                    return (height - y(valuesArray[i])) + 'px';
                });

            bar.append("text")
                .attr("dy", ".75em")
                .attr("x", ticksRange[0] + ticksRange[1] / 2)
                .attr("y",
                    function (d, i) {
                        var currHeight = y(valuesArray[i]);
                        var diff = height - currHeight;
                        return -diff + ((diff < 20) ? (-20) : 6);
                    }
                )
                .attr("text-anchor", "middle")
                .text(function (d, i) {
                    return formatCount(valuesArray[i]);
                })
                .transition()
                .style("opacity", 1);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(-7," + (height + 5) + ")")
                .call(xAxis);
            // remove text
            svg.select(".axis").selectAll("text").remove();

            svg.select(".x.axis").selectAll(".tick")
                .data(resultColorsArray)
                .append("svg:use")
                .attr("xlink:href", function (d) {
                    return colorsSymbolsHelper.getSymbolUrl(d);
                })
                .attr("width", 15)
                .attr("height", 15);
        }
    }
})();
