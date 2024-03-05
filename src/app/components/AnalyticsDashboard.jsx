"use client";

import { Card } from "@tremor/react";
import { BarChart } from "@tremor/react";

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amtVisitorsPerDay,
  timeseriesPageViews,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid -full mx-auto grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Average visitors per day
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {avgVisitorsPerDay}
          </p>
        </Card>
        <Card className="w-full mx-auto max-w-xs">
          <p className="text-tremor-default text-dark-tremor-content">
            Average visitors today
          </p>
          <p className="text-3xl text-dark-tremor-content-strong font-semibold">
            {amtVisitorsPerDay}
          </p>
        </Card>
      </div>
      <Card>
        {timeseriesPageViews ? (
          <BarChart
            allowDecimals={false}
            showAnimation
            data={timeseriesPageViews.map((day) => ({
              name: day.date,
              Visitors: day.events.reduce((acc, curr) => {
                return acc + Object.values(curr)[0];
              }, 0),
            }))}
            categories={["Visitors"]}
            index="name"
          />
        ) : null}
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
