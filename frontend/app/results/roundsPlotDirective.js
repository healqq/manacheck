(function () {
    'use strict';

    angular
        .module('results')
        .directive('roundsPlot', roundsPlotDirective);

    function roundsPlotDirective() {
        return {
            restrict: 'E',
            controller: roundsPlotController,
            controllerAs: 'roundsPlotCtrl',
            scope: {
                rounds: '=',
                dimensions: '=',
            },
            link: function ($scope, element, attrs, ctrl) {
                ctrl.buildPlot(element[0]);
            },
            bindToController: true,
        };
    }

    roundsPlotController.$inject = ['colorsRangeFactory'];
    /*globals d3 */
    function roundsPlotController(ColorsRange) {
        /*jshint validthis:true */
        var vm = this;
        vm.buildPlot = buildRoundsPlot;

        function buildRoundsPlot(element) {
            var colorsRange = new ColorsRange(
                [232, 234, 246], [63, 81, 181], {
                    min: 0,
                    max: 100
                }
            );
            var values = vm.rounds;
            var graphWidth = vm.dimensions.width;
            var graphHeight = vm.dimensions.height;
            // getting plot container
            var plot = d3.select(element);

            var successValues = values.filter(function (value) {
                return (value > 0);
            });
            var min = d3.min(successValues) - 1;
            var max = d3.max(values);
            var ticks = max - min + 1;
            // A formatter for counts.
            var formatCount = d3.format(",.1f");

            var margin = {
                    top: 10,
                    right: 30,
                    bottom: 30,
                    left: 30
                },
                width = graphWidth * 2 - margin.left - margin.right,
                height = graphHeight - margin.top - margin.bottom;

            var x = d3.scale.linear()
                .domain([min, max])
                .range([0, width]);


            // Generate a histogram 
            var data = d3.layout.histogram()
                .bins(x.ticks(ticks))
                (values);
            // we need copy of initial data to compute comulative stuff
            var dataCopy = d3.layout.histogram()
                .bins(x.ticks(ticks))
                (values);
            // making our gist cummulative

            data.forEach(function (item, index) {
                for (var i = 1; i < index; i++) {
                    item.y += dataCopy[i].y;
                }
                item.y = item.y / 10;
            });
            // split last 5% to one bin
            var lastIndex = data.length - 1;
            for (var i = 0;
                (i < data.length); i++) {
                if (data[i].y > 95) {
                    lastIndex = i;
                    break;
                }
            }
            data.splice(lastIndex + 1, data.length - lastIndex);
            // minus fails column
            data[lastIndex].y = 100 - data[0].y;
            max = data[lastIndex].x;
            ticks = max - min + 1;

            // recount x
            x = d3.scale.linear()
                .domain([min, max])
                .range([0, width]);

            var y = d3.scale.linear()
                .domain([0, 100])
                .range([height, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .ticks(ticks)
                .tickFormat(function (d, i) {
                    var tickLabel;
                    switch (i) {
                    case (data.length - 1):
                        tickLabel = d - 1 + '+';
                        break;
                    case 0:
                        tickLabel = 'fail';
                        break;
                    default:
                        tickLabel = d;
                    }
                    return tickLabel;
                });

            var svg = plot
                .append("svg")
                .attr("viewBox", '0 0 ' + graphWidth * 2 + ' ' + graphHeight)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var bar = svg.selectAll(".bar")
                .data(data)
                .enter().append("g")
                .attr("class", "bar")
                .attr('fill', function (d, i) {
                    return (i === 0) ? "#E91E63" : colorsRange.getColorString(d.y);
                })
                .attr("transform", function (d) {
                    return "translate(" + (x(d.x) - x(min + 1) * 0.5) + "," + (height) + ")";
                });


            bar.append("rect")
                .attr("x", 1)
                .attr("width", x(min + 1) - 1)
                .transition()
                .delay(function (d, i) {
                    return i * 50;
                })
                .style("height",
                    function (d) {
                        return (height - y(d.y)) + 'px';
                    });
            bar.append("text")
                .attr("dy", ".75em")
                .attr("x", x(min) + x(min + 1) / 2)
                .attr("y",
                    function (d) {
                        var currHeight = y(d.y);
                        var diff = height - currHeight;
                        return -diff + ((diff < 20) ? (-20) : 6);
                    }
                )
                .attr("text-anchor", "middle")
                .text(function (d) {
                    return formatCount(d.y);
                })
                .transition()
                .style("opacity", 1);
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            return data;
        }
    }
})();
