import { analytics } from "@/utils/analytics";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import { getDate } from "@/utils";

const page = async () => {
  const TRACKING_DAYS = 7;
  const pageviews = await analytics.retrieveDays("pageview", TRACKING_DAYS);
  const totalPageViews = pageviews.reduce((acc, current) => {
    return (
      acc +
      current.events.reduce((acc, current) => {
        return acc + Object.values(current)[0];
      }, 0)
    );
  }, 0);
  const avgVisitorsPerDay = (totalPageViews / TRACKING_DAYS).toFixed(1);
  const amtVisitorsPerDay = pageviews
    .filter((ev) => ev.date === getDate())
    .reduce((acc, curr) => {
      return (
        acc + curr.events.reduce((acc, curr) => acc + Object.values(curr)[0], 0)
      );
    }, 0);
  return (
    <div className="min-h-screen w-full py-12 flex justify-center items-center">
      <div className="relative -full max-w-6xl mx-auto text-white">
        <AnalyticsDashboard
          avgVisitorsPerDay={avgVisitorsPerDay}
          amtVisitorsPerDay={amtVisitorsPerDay}
          timeseriesPageViews={pageviews}
        />
      </div>
    </div>
  );
};

export default page;
