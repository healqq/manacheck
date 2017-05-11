(function () {
    'use strict';

    angular
        .module('results')
        .directive('landsInHandPlot', landsInHandPlotDirective);

    function landsInHandPlotDirective() {
        return {
            restrict: 'E',
            controller: landsInHandPlotController,
            controllerAs: 'landsInHandPlotCtrl',
            scope: {
                hands: '=',
                dimensions: '=',
            },
            link: function ($scope, element, attrs, ctrl) {
                ctrl.buildPlot(element[0]);
            },
            bindToController: true,
        };
    }

    landsInHandPlotController.$inject = [];
    /*globals d3 */
    function landsInHandPlotController() {
        /*jshint validthis:true */
        var vm = this;
        vm.buildPlot = buildlandsInHandPlot;

        function buildlandsInHandPlot(element) {
            var graphWidth = vm.dimensions.width;
            var graphHeight = vm.dimensions.height;
            var values = vm.hands;
            var dataArray = [];
            Object.keys(values)
                .forEach(function (key) {
                    dataArray.push({
                        key: key,
                        value: values[key],
                    });
                });

            var radius = Math.min(graphWidth, graphHeight) / 2;
            var formatCount = d3.format(",.1f");
            var colors = [
                '#E8EAF6',
                '#C5CAE9',
                '#9FA8DA',
                '#7986CB',
                '#5C6BC0',
                '#3F51B5',
                '#283593',
                '#1A237E'
            ];
            var svg = d3.select(element)
                .append('svg')
                .attr("viewBox", '0 0 ' + graphWidth + ' ' + graphHeight)
                .append('g')
                .attr('transform', 'translate(' + (graphWidth / 2) + ',' + (graphHeight / 2) + ')');
            var arc = d3.svg.arc()
                .outerRadius(radius)
                .innerRadius(radius / 2);
            var pie = d3.layout.pie()
                .value(function (d) {
                    return d.value;
                })
                .sort(null);
            var path = svg.selectAll('path')
                .data(pie(dataArray))
                .enter()
                .append('path')
                .attr('class', 'segment')
                .attr('fill', function (d, i) {
                    return colors[i];
                })
                .attr('stroke', 'none')
                .on('mouseover', onSectorMouseOver);
            path.transition()
                .duration(1000)
                .attrTween('d', tweenPie);
            // .on('mouseout', onSectorMouseOut);
            var textGroup = svg
                .attr("width", graphWidth / 2)
                .attr("height", graphHeight / 2)
                .attr("x", -graphWidth / 2)
                .attr("y", -graphHeight / 2 - 80);
            var textKey = textGroup
                .append("text")
                .attr("text-anchor", "middle")
                .attr("y", -20)
                .attr("class", 'lands-text')
                .attr("dy", ".4em");
            var textValues = textGroup
                .append("text")
                .attr("text-anchor", "middle")
                .attr("y", -5)
                .attr("class", 'lands-count')
                .attr("dy", ".8em");

            function tweenPie(finish) {
                var start = {
                    startAngle: 0,
                    endAngle: 0
                };
                var i = d3.interpolate(start, finish);
                return function (d) {
                    return arc(i(d));
                };
            }

            function onSectorMouseOver(d) {
                // applying active
                path.classed('active', false);
                d3.select(this)
                    .classed('active', true);
                // setting text	
                textKey.text(d.data.key + ' ' + ((parseInt(d.data.key, 10) === 1) ? 'land' : 'lands'));
                textValues.text(formatCount(d.data.value / 10) + '%');
            }

            var oneLandSegment = svg.selectAll('.segment')[0][1];
            onSectorMouseOver.call(oneLandSegment, {
                data: dataArray[1]
            });
        }
    }
})();
