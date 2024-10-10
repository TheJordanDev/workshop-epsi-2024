import Chart, { RadialLinearScale } from "chart.js/auto";
import { createRef, useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";

Chart.register(RadialLinearScale);

function StatsGraph({ data }) {
	const chartRef = createRef();
	const [chartOptions, setChartOptions] = useState({
        responsive: true,
        maintainAspectRatio: false,
		title: { display: false, },
        plugins: {
            legend: {
                display: false
            },
        },
        tooltips: {
           enabled: false
        },
		scales: {
            r: {
                grid: { 
                    display: true, 
                    color: "#ffffff",
                },
                angleLines: {
                    display: true, 
                    color: "#ffffff",
                },
                pointLabels: {
                    display: false, 
                    color: "#ffffff",
                },
                ticks: { 
                    display: false, 
                },
                min: 0,
                max: 28,
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 28,
            },
		},
        elements: {
            line: {
                borderWidth: 3,
            },
            point: {
                hitRadius: 5,
                radius: 5,
            },
        },
        hover: {
            mode: 'new mode'
        },
	});

	return (
		<div className="graph">
			<Radar ref={chartRef} data={data} options={chartOptions} />
		</div>
	);
}

export default StatsGraph;
